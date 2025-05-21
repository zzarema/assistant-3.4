const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generates AI response
async function generateResponseWithGemini(data) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

  const prompt = `
You are a helpful crypto assistant. Here is the data:
- Price: $${data.price}
- Market Cap: $${data.marketCap}
- Rank: ${data.rank}
- News Headlines: ${data.news.join(" | ")}

Summarize the current status of this cryptocurrency for a beginner.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// Fetch live price from Binance
async function getPrice(symbol) {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`);
    return parseFloat(response.data.price).toFixed(2);
  } catch (error) {
    throw new Error("Price not found on Binance.");
  }
}

// Fetch market cap and rank from Coingecko
async function getMarketData(coinId) {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    const data = response.data.market_data;
    return {
      marketCap: data.market_cap.usd.toLocaleString(),
      rank: response.data.market_cap_rank
    };
  } catch (error) {
    console.error("🛑 Coingecko Error:", error.response?.data || error.message);
    throw new Error("Market data not found on Coingecko.");
  }
}


// Fetch latest news from CryptoPanic
async function getNews(coinName) {
  try {
    const response = await axios.get(`https://cryptopanic.com/api/v1/posts/`, {
      params: {
        auth_token: process.env.CRYPTOPANIC_API_KEY,
        currencies: coinName,
        kind: 'news',
        public: true
      }
    });
    const headlines = response.data.results.map(n => n.title).slice(0, 3);
    return headlines.length ? headlines : ["No recent news found."];
  } catch (error) {
    return ["Failed to fetch news."];
  }
}

// Main assistant logic
async function cryptoAssistant(symbol, coinId, coinName) {
  try {
    console.log(`\n🔍 Fetching data for ${coinName}...\n`);
    const price = await getPrice(symbol);
    const marketData = await getMarketData(coinId);
    const news = await getNews(coinName);

    const data = {
      price,
      marketCap: marketData.marketCap,
      rank: marketData.rank,
      news
    };

    const answer = await generateResponseWithGemini(data);
    console.log("\n Gemini AI Crypto Assistant:\n", answer);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Command line input: node index.js BTC bitcoin bitcoin
const args = process.argv.slice(2);
if (args.length !== 3) {
  console.log(" Usage: node index.js <symbol> <coingecko-id> <news-id>");
  console.log(" Example: node index.js BTC bitcoin bitcoin");
} else {
  const [symbol, coinId, coinName] = args;
  cryptoAssistant(symbol.toUpperCase(), coinId.toLowerCase(), coinName.toLowerCase());
}


async function cryptoAssistantRaw(coinSymbol, coinId, coinName) {
  const price = await getPrice(coinSymbol);
  const marketData = await getMarketData(coinId);
  const news = await getNews(coinName);

  const data = {
    price,
    marketCap: marketData.marketCap,
    rank: marketData.rank,
    news
  };

  return await generateResponseWithGemini(data);
}

module.exports = { cryptoAssistantRaw };
