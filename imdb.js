const { response } = require("express");

const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const https = require("https");
const { title } = require("process");

app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.movie;
  console.log(req.body.movie);
  const url = `https://api.themoviedb.org/3/search/movie?api_key=009e1d6b25badc532cdae89db7239424&query=${query}`;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const moviedata = JSON.parse(data);
      console.log(moviedata);

      const poster = moviedata.results[0].poster_path;
      const tittle = moviedata.results[0].original_title;
      const release = moviedata.results[0].release_date;
      console.log(tittle);
      const overview = moviedata.results[0].overview;
      const rating = moviedata.results[0].vote_average;

      res.write(`<h1>The tittle of the movie is ${tittle}</h1>`);
      res.write(
        `<img style="border-radius:30px  " width="400px" height="500px" src= "https://image.tmdb.org/t/p/w1280${poster}  " >`
      );
      res.write(`<h2>Description: ${overview}</h2>`);
      res.write(`<h2>Realease Date: ${release}</h2>`);
      res.write(`<h1>Rating: <b>${rating}</h1>`);
      res.write(`<h1><a href="http://localhost:3000/">Search Again</a></h1>`);

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is started and running on port 3000");
});
