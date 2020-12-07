const express = require('express');
const app = express();

//app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Heellloooo');
});

app.listen(1235, () => {
    console.log('started on PORT 1235');
});

module.exports = app;
