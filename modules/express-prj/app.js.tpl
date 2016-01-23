/* --- <%= data.applicationName %> --- */
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';

import config from './app.config';

let app = express(), httpPort = config().httpPort;

app
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json());

app.use('/api/hello', (req, res) => {
  res.json({message:"Hello World!"});
});


app.listen(httpPort);

console.log(" Listening on: " + httpPort);



