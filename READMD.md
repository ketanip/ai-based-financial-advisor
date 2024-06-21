# AI Financial Advisor

This is a AI based financial advisor which helps people make informed decisions and helps with any financial education they may need.

This is a chat-bot powered Google's Gemini LLM.

![Dashboard screenshot](/images/1.png)
*Dashboard screenshot*

<details>
<summary>View more screenshots</summary>

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

### Run Locally

1. Open three command prompt windows and navigate to this project's root directory, or open this directory in file system and do right click and do open in terminal.

2. Update `.env` with proper environment variables, see `.example.env`.

3. Clone repo.

```
git clone https://github.com/ketanip/ai-financial-advisor
cd ai-financial-advisor
```

4. Open 3 terminal windows.

5. Type the following in terminal windows,

```bash
# Windows 1
docker-compose up

# Windows 2
cd backend
yarn dev

# Window 3
cd frontend
yarn dev
```

6. Open <http://localhost:3000> in browser.
