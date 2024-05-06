export const hours =       [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
export const data = [
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
export const temperature = [21, 20, 55, 20, 85, 15, 50, 32, 40, 29, 0, 0];
