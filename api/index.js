// https://developers.themoviedb.org/3/search/search-movies

const axios = require("axios");

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.send("url is compulsory").status(400);
  }

  try {
    await axios.head(url);
    res.send("ok");
  } catch (error) {
    res.status(400).send("not ok");
  }
};

module.exports = allowCors(handler)
