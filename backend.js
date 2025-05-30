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

http.createServer(async function(req, res) {
  let rawData;

  req
    .on('data', chunk => { rawData = JSON.parse(chunk); })
    .on('end',  async () => {
      const { username, password, route } = rawData;

      switch (route) {
        case '/register': {
          const { rows } = await client.query(
            `
            SELECT email
              FROM usuario
              WHERE email = '${username}'`
          );
          if (rows.length == 1) {
              res.statusCode = 409;
              res.end();
              break;
          }

          await client.query(
            `
            INSERT INTO usuario (username, email, password, age)
              VALUES    ('${username}', '${username}', '${password}', 0)`
          );

          res.write(username);
          res.end();
          break;
        }
        case '/login': {
          const { rows } = await client.query(
            `
            SELECT username, email, password
              FROM usuario
              WHERE email = '${username}' AND password = '${password}';`
          );
          switch (rows.length) {
            case 0:
              res.statusCode = 401;
              res.end();
              break;
            case 1:
              res.write(username);
              res.end();
              break;
          }
          break;
        }
        default:
          res.write('Error!');
          res.end();
          break;
      }
    });
})
.listen(8000);

