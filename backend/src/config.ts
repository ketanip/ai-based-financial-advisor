import dotenv from "dotenv";
dotenv.config()

const CONFIG = {

    SERVER: {
        PORT: 3001,
    },

    LLM: {
        MODEL_NAME: "gemini-1.0-pro",
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || " ",
    },

    JWT: {
        JWT_SECRET: "JWT_SECRET_KEY",
        JWT_EXPIRY_TIME: "1d",
        JWT_ALGORITHM: "HS256"
    },

};

export default CONFIG;