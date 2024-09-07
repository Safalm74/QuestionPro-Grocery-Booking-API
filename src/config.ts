import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
  port: process.env.PORT || 8000,
  database: {
    DB_CLIENT: process.env.DB_CLIENT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PW: process.env.DB_PW,
    DB_PORT: process.env.DB_PORT || 5432,
    DB_NAME: process.env.DB_NAME,
  },
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    accessTokenExpiry: 600,
    refreshTokenExpiry: 3000,
  },
};

export default config;
