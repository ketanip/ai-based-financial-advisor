# FINAL Product
1. User logs in.
2. [Authenticated] Sees all the chats.
3. [Authenticated] Creates a new chat.
4. [Authenticated] Send a message to server.
                    a.  Prisma saves message with chat_id in database.
                    b. Searches for relevant terms in vector database.
                    c. Send that message along with previous message retrieved from DB to LLM for d. d.inference, generate entire response in one go.
                    e. send that response as result.

# Tools to use [FINAL]
1. REST API: Express.js
2. Database: Postgres
3. ORM: Prisma
4. LLM: LM Studio
5. No langchain.
6. Authentication: Simple JWT Tokens in header.
7. Auth: Username password.
8. Vector Database: ChromaDB.
9. Validation: zod

# Build process.
1. Setup typescript.
2. Setup prisma.
3. Setup 