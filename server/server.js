import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('./server/static'));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
