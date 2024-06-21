import z from "zod";

const getMessages = z.object({
    chat_id: z.coerce.number(),
});

const sendNewMessage = z.object({
    message: z.string(),
});

const getChatID = z.object({
    chat_id: z.coerce.number(),
});


export default {
    getMessages,
    getChatID,
    sendNewMessage,
};