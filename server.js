const express = require('express');
const path = require('path');
require('dotenv').config();
const { cryptoAssistantRaw } = require('./index');

const app = express();
const PORT = 4000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {
  const { symbol, id, name } = req.query;

  // Always send these to the view to avoid ReferenceError
  const values = {
    symbol: symbol || '',
    id: id || '',
    name: name || ''
  };

  if (!symbol || !id || !name) {
    return res.render('index', { result: null, error: null, ...values });
  }

  try {
    const result = await cryptoAssistantRaw(symbol, id, name);
    res.render('index', { result, error: null, ...values }); // include symbol, id, name
  } catch (err) {
    res.render('index', { result: null, error: err.message, ...values });
  }
});


app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
