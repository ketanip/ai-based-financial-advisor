export interface GeminiMessage {
    role: "user" | "model",
    parts: { text: string }[]
};