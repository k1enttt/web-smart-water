export const hours =       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const olddata = [
  {
    temperature: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    humidity: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    moisture: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    light: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
  },
  {
    temperature: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    humidity: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    moisture: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
    light: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100))
  }
]

export const newdata = Array.from({ length: 24 }, () => ({
  id: Math.floor(Math.random() * 100_000),
  temperature: Math.floor(Math.random() * 100),
  humidity: Math.floor(Math.random() * 100),
  moisture: Math.floor(Math.random() * 100),
}));
