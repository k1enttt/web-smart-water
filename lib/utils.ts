import { DayLogSchema, HourLogSchema } from "@/schemas"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Hàm chuyển số 1 thành chuỗi "01"
 * @param num number
 * @returns string
 */
function padZero(num: number): string {
  return num.toString().padStart(2, "0");
}

/**
 * Hàm lấy ngày hiện tại dưới dạng chuỗi từ ngày kiểu Date
 * Ví dụ: new Date() => "01/06/2024"
 * @param date Date
 * @returns string
 */
function getDateStringFromDate(date: Date): string {
  return `${padZero(date.getDate())}${padZero(date.getMonth() + 1)}${date.getFullYear()}`;
}

/**
 * Hàm chuyển ngày tháng từ chuỗi "ddMMyyyy" thành kiểu Date
 * Ví dụ: "01062024" => new Date(2024, 5, 1)
 * @param dateString string
 * @returns Date
 */
function getDateFromDateString(dateString: string): Date {
  const day = parseInt(dateString.slice(0, 2), 10);
  const month = parseInt(dateString.slice(2, 4), 10);
  const year = parseInt(dateString.slice(4, 8), 10);
  return new Date(year, month - 1, day);
}
/**
 * Hàm lấy dữ liệu từ danh sách các Daylog, chỉ trả về những daylog của ngày hiện tại
 * Ví dụ: daylog.id = "01062024" => new Date(2024, 5, 1) == new Date() => true
 * @param daylogs DayLogSchema[]
 * @returns DayLogSchema | undefined
 */
export function getTodayDaylogs(daylogs: DayLogSchema[]): DayLogSchema | undefined {
  const today = new Date();
  const todayString = getDateStringFromDate(today);
  return daylogs.find((daylog) => daylog.id === todayString);
}
/**
 * Hàm tạo danh sách hoàn chỉnh gồm 24 thành phần từ danh sách còn thiếu ban đầu.
 * Ví dụ 1: [5] =>    [null, null, null, null, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * Ví dụ 2: [5, 9] => [null, null, null, null, null, 5, null, null, null, 9, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * @param values DayLogSchema[]
 * @returns (DayLogSchema | null)[]
 */
export function fillHourlogs(hourlogs: HourLogSchema[]): (HourLogSchema | null)[] {
  if (!hourlogs || hourlogs.length === 0) {
    return [];
  }
  const filled: (HourLogSchema | null)[] = Array.from({ length: 24 }, () => null);
  hourlogs.forEach((value) => {
    filled[parseInt(value.id, 10)] = value;
  });
  return filled;
}