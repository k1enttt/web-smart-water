import { DayLog } from "@/schemas"
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
export function getDateStringFromDate(date: Date): string {
  return `${padZero(date.getDate())}/${padZero(date.getMonth() + 1)}/${date.getFullYear()}`;
}
/**
 * Hàm lấy dữ liệu từ danh sách các Daylog, chỉ trả về những daylog của ngày hiện tại
 * @param daylogs Daylog[]
 * @returns Daylog[]
 */
export function getTodayDaylogs(daylogs: DayLog[]): DayLog[] {
  const today = getDateStringFromDate(new Date());
  return daylogs.filter((daylog) => daylog.date == today);
}

// Hàm chuyển đổi string thành số
function toNumber(value: string): number {
  return parseInt(value, 10);
}


/**
 * Hàm tạo danh sách hoàn chỉnh gồm 24 thành phần từ danh sách còn thiếu ban đầu
 * Ví dụ 1: [5] =>    [null, null, null, null, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * Ví dụ 2: [5, 9] => [null, null, null, null, null, 5, null, null, null, 9, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
 * @param values DayLog[]
 * @returns (DayLog | null)[]
 */
export function fillDaylogs(values: DayLog[]): (DayLog | null)[] {
  const filled: (DayLog | null)[] = Array.from({ length: 24 }, () => null);
  values.forEach((value, index) => {
    filled[parseInt(value.id, 10)] = value;
  });
  return filled;
}