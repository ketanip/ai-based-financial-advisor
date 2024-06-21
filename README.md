# 💼 AI Financial Advisor

Welcome to the **AI Financial Advisor**—an intelligent financial guide designed to help you make informed decisions and enhance your financial education. Powered by Google's Gemini LLM, this chatbot provides tailored financial advice in a user-friendly interface.

![Dashboard screenshot](/images/1.png)
*Dashboard screenshot*

<details>
<summary>🔍 View more screenshots</summary>

![Landing page screenshot](/images/2.png)
*Landing page screenshot*

---

![Authentication page screenshot](/images/3.png)
*Authentication page screenshot*

---

![Authentication page screenshot](/images/4.png)
*Authentication page screenshot*

---

![Calculators page screenshot](/images/5.png)
*Calculators page screenshot*

</details>

## 🌟 Key Features

1. **AI-Powered Chat Interface**: Engage with an AI chatbot tailored for financial advice.
2. **Domain-Specific AI Tuning**: Specialized for accurate financial recommendations.
3. **Lightweight Web Interface**: Easy-to-navigate and user-friendly.
4. **Secure Authentication**: Ensures your data is protected.
5. **Intuitive Design**: Inspired by ChatGPT for a familiar experience.

## 🛠️ Technologies Used

1. **Backend**: Node.js, PrismaORM, TypeScript, Zod, REST API.
2. **Frontend**: React.js, Next.js, TailwindCSS, TypeScript, Axios.
3. **External Services**: LLM (Gemini API)
4. **Other**: REST API, JWT tokens.

## 🏃‍♂️ Run Locally

Follow these steps to get the AI Financial Advisor running on your local machine:

1. Open three command prompt windows and navigate to the project's root directory, or open this directory in your file system and right-click to open in terminal.
2. Update `.env` with the proper environment variables (see `.example.env` for reference).
3. Clone the repository:

    ```bash
    git clone https://github.com/ketanip/ai-financial-advisor
    cd ai-financial-advisor
    ```

4. Open three terminal windows.
5. Run the following commands in each terminal window:

    ```bash
    # Window 1
    docker-compose up

    # Window 2
    cd backend
    yarn dev

    # Window 3
    cd frontend
    yarn dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

Enjoy your enhanced financial advisory experience! 🚀
