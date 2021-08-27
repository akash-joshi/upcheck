// https://developers.themoviedb.org/3/search/search-movies

const axios = require("axios");

module.exports = async (req, res) => {
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
