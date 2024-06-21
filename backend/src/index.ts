import cors from "cors";
import auth from "./auth";
import chats from "./chats";
import CONFIG from "@/config";
import messages from "./messages";
import Express, { json } from "express";

const main = async () => {

    const app = Express();

    app.use(cors());
    app.use(json());

    app.use("/auth", auth.routes);
    app.use("/chats", chats.routes);
    app.use("/messages", messages.routes);

    app.listen(CONFIG.SERVER.PORT, () => {
        console.log(`Server active on http://localhost:${CONFIG.SERVER.PORT}`);
    });

}

main();