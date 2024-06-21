import z from "zod";

const createChat = z.object({
    title: z.string(),
});



const getChatID = z.object({
    id: z.coerce.number(),
});

const updateChat = z.object({
    title: z.string(),
});

export default {
     getChatID,
     createChat,
     updateChat,
};