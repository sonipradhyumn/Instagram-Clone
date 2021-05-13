const express = require ('express');
const app = express ();
const PORT = 5000;
const mongoose = require ('mongoose');
const {MONGOURI} = require ('./keys');

mongoose.connect (MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
mongoose.connection.on ('connected', () => {
  console.log ('connected to Mongoose');
});
mongoose.connection.on ('error', () => {
  console.log ('Mongoose not connected ', error);
});

require ('./models/user');
require ('./models/post');
app.use (express.json ());
app.use (require ('./routes/auth'));
app.use (require ('./routes/post'));

// const customMiddleware = (res, req, next) => {
//   console.log ('middleware executed');
//   next ();
// };
// app.use (customMiddleware);
// app.get ('/', (req, res) => {
//   res.send ('Hello World');
// });

app.listen (PORT, () => {
  console.log ('Server is Running on Port ', PORT);
});
