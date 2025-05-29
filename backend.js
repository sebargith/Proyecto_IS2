import 'dotenv/config';
import http from 'http';

import { Client } from 'pg';


const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});


await client.connect();

http.createServer(function(req, res) {
  let rawData;

  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000/');

  req
    .on('data', chunk => {
      rawData = JSON.parse(chunk);
    })
    .on('end',  () => {
      const { email, password } = rawData;
      client.query(`SELECT username, password FROM usuario WHERE email = '${email}'`)
        .then(({ rows }) => {
          if (rows.length == 1) {
            res.write(`${rows[0].password == password}`);
          } else {
            res.write('false')
          }
          res.end();
        });
    });
})
.listen(8000);

