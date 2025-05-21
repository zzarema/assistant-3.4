# AI Crypto Assistant – Gemini
##Bazarova Zarema, Zhalgassova Saniya,Seisekeyeva Dariga - SE-2321


![image](https://github.com/user-attachments/assets/40368e12-87da-4d9e-9719-a98e575c3b3b)

![image](https://github.com/user-attachments/assets/382a78d8-c369-4c6e-84c2-b081a15371b2)


##  Project Overview

**AI Crypto Assistant – Gemini** is a Node.js web app that allows users to get detailed information about cryptocurrencies using natural language. It integrates the **Gemini Pro AI** model and the **CoinGecko API** to deliver real-time coin summaries and market data.

Users can enter prompts like:
- "Tell me about Ethereum"
- "What is the market cap of Bitcoin?"
- "Who created Solana?"

The app intelligently parses your prompt, identifies the cryptocurrency, fetches data from CoinGecko, and returns a helpful response.

---

##  Features

-  Natural language prompt support with Gemini Pro AI
-  Real-time market data from CoinGecko API
-  Clean UI with EJS and Express
-  Error handling when data is not available
-  Image support for better UI demonstration

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **Gemini Pro (Google AI)**
- **CoinGecko API**
- **EJS for templating**
- **CSS for styling**

---

##  Installation & Setup
1. Clone the repository:
```bash
   git clone https://github.com/kozqarashigi/AI-Crypto-Assistant-Gemini.git
   cd AI-Crypto-Assistant-Gemini
```
   
2. Install dependencies:
```bash
npm install
```
3. Set up your .env file:
Create a .env file in the root directory and add:
```bash
GEMINI_API_KEY=google_gemini_api_key_here
CRYPTOPANIC_API_KEY=cryptopanic_api_key_here
```

5. Run the app:
```bash
node server.js
```

6. Open your browser and go to:
```bash
http://localhost:3000
```


##  Conclusion

AI Crypto Assistant – Gemini combines the power of AI and real-time crypto data to deliver an intuitive and helpful user experience. Whether you're a crypto enthusiast or just getting started, this tool allows you to interact with cryptocurrencies through simple natural language prompts.


