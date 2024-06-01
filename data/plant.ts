export const hours = [0, 1, 2, 3, 4, 5, 6, 7
  , 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

function getRandomNumber(min: number, max: number) {
  return Math.floor((Math.random() * (max - min + 1) + min) * 10) / 10;
}

// export const randomDaylogs = Array.from({ length: 24 }, () => ({
//   id: Math.floor(Math.random() * 100_000),
//   temperature: Math.floor(Math.random() * 100),
//   humidity: Math.floor(Math.random() * 100),
//   moisture: Math.floor(Math.random() * 100),
// }));

export const randomDaylogs = Array.from({ length: 24 }, () => ({
  // Random number from 20 to 38
  id: Math.floor(Math.random() * 100_000),
  temperature: getRandomNumber(28.0, 34.9),
  humidity: getRandomNumber(20.0, 80.0),
  moisture: getRandomNumber(30.0, 90.0),
}));
