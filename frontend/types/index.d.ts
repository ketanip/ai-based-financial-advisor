export type Chat = {
    id: number;
    title: string;
    user_id: number;
};

export type Message = {
    id: number;
    chat_id: number;
    message: string;
    source: string; //"llm" | "system" | "user";
    created_at: string;
};