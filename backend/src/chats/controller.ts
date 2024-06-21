import { z } from "zod";
import db from "@/db/prisma";
import validators from "./validators";
import { Request, Response } from "express";
import { fromZodError } from "zod-validation-error";

const getChats = async (req: Request, res: Response) => {

    try {

        const user = res.locals.user;

        const chats = await db.chats.findMany({
            where: {
                user_id: user.id,
            }
        });

        res.json({ chats });

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };

};

const createChat = async (req: Request, res: Response) => {

    try {

        const data = validators.createChat.parse(req.body);

        const user = res.locals.user;

        const new_chat = await db.chats.create({
            data: {
                title: data.title,
                user_id: user.id
            }
        });

        res.json(new_chat);

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };
};

const getChat = async (req: Request, res: Response) => {

    try {

        const data = validators.getChatID.parse(req.params);
        const user = res.locals.user;

        const chat = await db.chats.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        if (chat.user_id != user.id) {
            res.status(401).json({ error: "You are unauthorized to access this resource." });
            return;
        }

        // const messages = await db.messages.findMany({
        //     where: { chat_id: chat.id },
        //     orderBy: { id: "asc" }
        // });

        res.json(chat);

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };

};

const updateChat = async (req: Request, res: Response) => {

    try {

        const { id: chat_id } = validators.getChatID.parse(req.params);
        const data = validators.updateChat.parse(req.body);

        const user = res.locals.user;

        const chat = await db.chats.findUnique({
            where: {
                id: chat_id,
            }
        });

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        if (chat.user_id != user.id) {
            res.status(401).json({ error: "You are unauthorized to access this resource." });
            return;
        }

        const updated_chat = await db.chats.update({
            where: { id: chat_id },
            data: { ...data },
        });

        res.json(updated_chat);

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };

};

const deleteChat = async (req: Request, res: Response) => {

    try {

        const data = validators.getChatID.parse(req.params);
        const user = res.locals.user;

        const chat = await db.chats.findUnique({
            where: {
                id: data.id,
            }
        });

        if (!chat) {
            res.status(404).json({ error: "Chat not found." });
            return;
        }

        if (chat.user_id != user.id) {
            res.status(401).json({ error: "You are unauthorized to access this resource." });
            return;
        }

        await db.chats.delete({
            where: {
                id: chat.id,
            }
        });

        await db.messages.deleteMany({
            where: { chat_id: chat.id },
        });

        res.json({ message: "Chat and all its messages deleted successfully" });

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({ error: validationError.toString() });
            return;
        }

        res.json({ error: "Internal server error." });
    };

};

export default {
    getChats,
    createChat,
    getChat,
    updateChat,
    deleteChat,
};