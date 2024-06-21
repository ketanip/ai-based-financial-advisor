import ai from "@/ai";
import { z } from "zod";
import db from "@/db/prisma";
import validators from "./validators";
import { Request, Response } from "express";
import { generateChatName } from "@/ai/gemini";
import { fromZodError } from "zod-validation-error";

const getMessages = async (req: Request, res: Response) => {

    try {

        const data = validators.getChatID.parse(req.params);
        const user = res.locals.user;

        const chat = await db.chats.findUnique({
            where: { id: data.chat_id }
        });

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        if (chat.user_id != user.id) {
            res.status(401).json({ message: "You are unauthorized to access this resource." });
            return;
        };

        const messages = await db.messages.findMany({
            where: {
                chat_id: data.chat_id,
            }
        });

        res.json({ messages });


    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };
};

const sentNewMessage = async (req: Request, res: Response) => {

    try {

        const { chat_id } = validators.getChatID.parse(req.params);
        const data = validators.sendNewMessage.parse(req.body);
        const user = res.locals.user;

        const chat = await db.chats.findUnique({
            where: { id: chat_id }
        });

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        if (chat.user_id != user.id) {
            res.status(401).json({ message: "You are unauthorized to access this resource." });
            return;
        };

        // Loading previous conversation.
        const messages = await db.messages.findMany({
            where: {
                chat_id: chat_id,
            }
        });

        // Generate Chat Name
        if (messages.length === 0 || chat.title.toLocaleLowerCase() === "new chat") {
            const chat_title = await generateChatName(data.message);
            await db.chats.update({
                where: {id: chat_id},
                data: {title: chat_title}
            });
        }

        // LLM Response.
        const llm_generated_message_reply = await ai.gemini.getMessageReply(messages, data.message) || "Some error occurred.";

        // Storing chats in database.
        const user_message = await db.messages.create({
            data: {
                chat_id: chat_id,
                message: data.message,
                source: "user",
            }
        });

        const llm_message = await db.messages.create({
            data:  {
                chat_id: chat_id,
                message: llm_generated_message_reply,
                source: "llm",
            },
        })

        res.json({ user_message, llm_message });

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }
        console.error(error);
        res.json({ error: "Internal server error." });
    };

};

export default {
    getMessages,
    sentNewMessage,
};