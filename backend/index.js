const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const fetch = require("node-fetch");
const cheerio = require("cheerio");

app.get("/search-products", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Query obrigatória" });
  }

  try {
    const targetUrl = `https://www.google.com/search?tbm=shop&hl=pt-BR&gl=BR&q=${encodeURIComponent(query)}`;

    // ⚠️ URL SEM QUEBRA DE LINHA
    const scrapeUrl = `http://api.scrape.do?token=c822f79b1dc6404a8f3d41244600fa04c67997abffa&render=true&super=true&geoCode=br&wait=5000&customHeaders=true&url=${encodeURIComponent(targetUrl)}`;

    let html = "";

    // 🔁 RETRY AUTOMÁTICO
    for (let i = 0; i < 2; i++) {
      try {
        const response = await fetch(scrapeUrl);
        html = await response.text();

        if (html && html.length > 1000) break;
      } catch (err) {
        console.log("retry...");
        await new Promise((r) => setTimeout(r, 2000));
      }
    }

    // ⚠️ fallback se HTML vier ruim
    if (!html || html.length < 1000) {
      return res.json({
        fallback: true,
        url: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`,
      });
    }

    const cheerio = require("cheerio");
    const $ = cheerio.load(html);

    const products = [];

    // 🔍 parsing via script (mais confiável)
    $("script").each((i, el) => {
      if (products.length >= 6) return;

      const content = $(el).html();

      if (content && content.includes("price")) {
        const matches = content.match(/"title":"(.*?)".*?"price":"(.*?)"/g);

        if (matches) {
          matches.forEach((match) => {
            if (products.length >= 6) return;

            const title = match.match(/"title":"(.*?)"/)?.[1];
            const price = match.match(/"price":"(.*?)"/)?.[1];

            if (title && price) {
              products.push({
                title,
                price,
              });
            }
          });
        }
      }
    });

    // ⚠️ fallback se não achou nada
    if (products.length === 0) {
      return res.json({
        fallback: true,
        url: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`,
      });
    }

    res.json({
      fallback: false,
      products,
    });

  } catch (error) {
    console.error("ERRO:", error);

    res.json({
      fallback: true,
      url: `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(query)}`,
    });
  }
});
app.listen(3001, () => {
  console.log("🚀 Backend rodando em http://localhost:3001");
});