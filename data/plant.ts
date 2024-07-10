import { DayLogSchema } from "@/schemas";

export const hours = [0, 1, 2, 3, 4, 5, 6, 7
  , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function getRandomNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1) + min) * 10) / 10;
}

export const randomDaylogs = Array.from({ length: 24 }, () => ({
  // Random number from 20 to 38
  id: Math.floor(Math.random() * 100_000).toString(),
  time: getRandomNumber(0, 23) + ":00 08-06-2024",
  temperature: getRandomNumber(28.0, 34.9),
  humidity: getRandomNumber(20.0, 50.0),
  moisture: getRandomNumber(30.0, 60.0),
  light: getRandomNumber(100.0, 150.0),
})) as DayLogSchema[];

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
]

export const activity_logs: 
{
  [key: string]: ActivityLog;
} = {
  "123456": {
    id: "256189",
    plant_id: "0",
    device_mac: "00:00:00:00:00:00",
    type: "SUCCESS",
    message: "Kích hoạt bơm nước",
    time: "15:54 02-06-2024"
  },
  "798456": {
    id: "564852",
    plant_id: "0",
    device_mac: "00:00:00:00:00:00",
    type: "ERROR",
    message: "Đã tưới nước",
    time: "15:59 02-06-2024"
  }
}