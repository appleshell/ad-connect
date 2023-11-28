const IS_DEV = process.env.NODE_ENV === "development";

console.log(process.env.NODE_ENV);

export const BASE_URL: string = IS_DEV
  ? "http://localhost:3002/connect"
  : "https://linmo.info/connect";
