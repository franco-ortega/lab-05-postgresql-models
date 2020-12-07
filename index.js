const express = require('express');
const app = express();

//app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Heellloooo');
});

// app.listen(5432, () => {
//     console.log('started on PORT 5432');
// });

module.exports = app;
