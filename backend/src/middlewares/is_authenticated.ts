import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import CONFIG from "@/config";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    try {

        const header = req.headers['authorization'];
        if (!header) {
            res.status(401).json({error: "JWT token missing."});
            return;
        }

        const jwt_token = header.split(" ")[1];
        
        // Parsing jwt token.
        const data: any = jwt.verify(jwt_token, CONFIG.JWT.JWT_SECRET, {
            algorithms: ["HS256"],
        });

        const user = data.user;
        res.locals.user = user;
        next();
        
    } catch (error) {
        res.status(401).json({error: "Invalid JWT token."});
        return;
    }

};

export default isAuthenticated;