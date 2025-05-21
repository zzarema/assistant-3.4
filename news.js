// news.js
const axios = require("axios");
require("dotenv").config();

const CRYPTOPANIC_API_KEY = process.env.CRYPTOPANIC_API_KEY;

async function getCryptoNews(coin) {
  try {
    const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API_KEY}&currencies=${coin}&public=true`;
    const response = await axios.get(url);
    
    const posts = response.data.results;

    const headlines = posts
      .slice(0, 5) // берем только 5 новостей
      .map(post => post.title);

    return headlines;
  } catch (error) {
    console.error("❌ Ошибка при получении новостей:", error.message);
    return ["Нет свежих новостей."];
  }
}

module.exports = { getCryptoNews };
