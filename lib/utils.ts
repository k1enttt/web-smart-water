import { DayLogSchema } from "@/schemas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hàm chuyển kiểu Date thành chuỗi "hh:mm:ss dd-MM-yyyy"
 * Ví dụ: new Date() => "15:37:27 6-6-2024"
 * @param date Date
 * @returns string
 */
export function getTodayString(): string {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${hours}:${minutes}:${seconds} ${day}-${month}-${year}`;
}
/**
 * Hàm chuyển ngày tháng từ chuỗi "ddMMyyyy" thành kiểu Date
 * Ví dụ: "09:00:00 06-06-2024" => new Date(2024, 5, 6); "10:00:00 07-06-2024" => new Date(2024, 5, 7)
 * @param dateString string
 * @returns Date
 */
function getDateStringFromString(dateString: string): string {
  const [day, month, year] = dateString.split(" ")[1].split("-").map((value) => parseInt(value, 10));
  return `${day}/${month}/${year}`;
}

/**
 * Hàm lấy giờ từ chuỗi "hh:mm:ss dd-MM-yyyy"
 * Ví dụ: "09:00:00 06-06-2024" => 9; "10:00:00 07-06-2024" => 10
 * @param dateString string
 * @returns number
 */
function getHourFromString(dateString: string): number {
  return parseInt(dateString.split(" ")[0].split(":")[0], 10);
}

/**
 * Hàm lấy dữ liệu từ danh sách các Daylog, chỉ trả về những daylog của ngày hiện tại
 * Ví dụ: daylog.id = "01062024" => new Date(2024, 5, 1) == new Date() => true
 * @param daylogs DayLogSchema[]
 * @returns DayLogSchema | undefined
 */
export function getTodayDaylogs(daylogs: DayLogSchema[]): DayLogSchema[] | undefined {
  if (!daylogs || Object.entries(daylogs).length === 0) {
    console.error("Daylogs JSON is empty");
    return undefined;
  }
  const today = new Date().toLocaleDateString();
  const daylogsArray = Object.entries(daylogs).map((daylog) => daylog[1]);
  return daylogsArray.filter((daylog) => getDateStringFromString(daylog.time) == today);
}
/**
 * Hàm tạo danh sách hoàn chỉnh gồm 24 thành phần từ danh sách còn thiếu ban đầu.
 * Ví dụ 1: [5] =>    [null, null, null, null, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * Ví dụ 2: [5, 9] => [null, null, null, null, null, 5, null, null, null, 9, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * @param values DayLogSchema[]
 * @returns (DayLogSchema | null)[]
 */
export function fillHourlogs(daylogs: DayLogSchema[]): (DayLogSchema | null)[] {
  if (!daylogs || daylogs.length === 0) {
    return [];
  }
  const filled: (DayLogSchema | null)[] = Array.from({ length: 24 }, () => null);
  daylogs.forEach((value) => {
    const logHour: number = getHourFromString(value.time);
    filled[logHour] = value;
  });
  return filled;
}

/**
 * Hàm trả về thời gian theo định dạng đầy đủ từ Date()
 * Ví dụ 1: "15:37:27 6/6/2024" => "Thứ Năm, 6 Tháng 6, 2024 lúc 3:37 CH"
 * Ví dụ 2: "15:37:27 7/6/2024" => "Thứ Sáu, 7 Tháng 6, 2024 lúc 3:37 CH"
 * Ví dụ 3: "15:37:27 8/6/2024" => "Thứ Bảy, 8 Tháng 6, 2024 lúc 3:37 CH"
 * @param dateString string
 * @returns string
 */
export function getFullDateString(dateString: string): string {
  const date = new Date(dateString);
  const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  const day = days[date.getDay()];
  const month = date.toLocaleString("default", { month: "long" });
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "CH" : "SA";
  return `${day}, ${date.getDate()} ${month}, ${date.getFullYear()} lúc ${hours}:${minutes} ${ampm}`;
}

export async function waitForEnoughWater({
  moisture, 
  threshold, 
  checkInterval = 100, 
  timeout = 10000
}: {
  moisture: number, 
  threshold: number, 
  checkInterval?: number, 
  timeout?: number
}): Promise<0 | 1> {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    if (moisture >= threshold) {
      return 1;
    }
    await new Promise(resolve => setTimeout(resolve, checkInterval));
  }
  return 0;
}