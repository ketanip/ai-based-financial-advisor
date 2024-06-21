import { z } from "zod";
import argon2 from "argon2";
import db from "@/db/prisma";
import CONFIG from "@/config";
import jwt from "jsonwebtoken";
import validators from "./validators";
import { Request, Response } from "express";
import { fromZodError } from "zod-validation-error";

const SignIn = async (req: Request, res: Response) => {

    try {

        const data = await validators.SignIn.parseAsync(req.body);

        const existing_user = await db.users.findUnique({
            where: { email: data.email },
        });

        if (!existing_user) {
            res.status(401).json({ error: "Invalid email id or password." });
            return;
        }

        const correct_password = await argon2.verify(existing_user.password, data.password);
        if (!correct_password) {
            res.status(401).json({ error: "Invalid email id or password." });
            return;
        }

        const payload = {
            user: {
                id: existing_user.id,
                name: existing_user.name,
                email: existing_user.email,
            }
        };

        const token = jwt.sign(payload, CONFIG.JWT.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: CONFIG.JWT.JWT_EXPIRY_TIME
        });

        res.json({ user: payload.user, jwt_token: token });

    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({error: validationError.toString()});
            return;
        }

        res.json({ error: "Internal server error." });
    };

};

const SignUp = async (req: Request, res: Response) => {

    try {

        const data = await validators.SignUp.parseAsync(req.body);

        const existing_user = await db.users.findUnique({
            where: { email: data.email },
        });

        if (existing_user) {
            res.status(401).json({ error: "User with this email already exists, please login." });
            return;
        }

        // Hashing the password.
        data.password = await argon2.hash(data.password);

        const user = await db.users.create({
            data,
        });

        res.json({ message: "Account created successfully." });


    } catch (error) {

        if (error instanceof z.ZodError) {
            const validationError = fromZodError(error);
            res.status(422).json({error: validationError.toString()});
            return;
        }
        
        res.json({ error: "Internal server error." });
    };

};

export default {
    SignIn,
    SignUp,
};