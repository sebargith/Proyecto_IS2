import 'dotenv/config';
import http from 'http';
import { Client } from 'pg';
import bcrypt from 'bcrypt';

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

await client.connect();

http.createServer(async function (req, res) {
  let rawData;

  req
    .on('data', chunk => { rawData = JSON.parse(chunk); })
    .on('end', async () => {
      const { username, password, route } = rawData;

      switch (route) {
        case '/register': {
          const { rows } = await client.query(
            `SELECT email FROM usuario WHERE email = $1`,
            [username]
          );

          if (rows.length === 1) {
            res.statusCode = 409;
            return res.end();
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          await client.query(
            `INSERT INTO usuario (username, email, password, age)
             VALUES ($1, $2, $3, 0)`,
            [username, username, hashedPassword]
          );

          res.write(username);
          return res.end();
        }

        case '/login': {
          const { rows } = await client.query(
            `SELECT username, password FROM usuario WHERE email = $1`,
            [username]
          );

          if (rows.length === 0) {
            res.statusCode = 401;
            return res.end(); 
          }

          const valid = await bcrypt.compare(password, rows[0].password);
          if (!valid) {
            res.statusCode = 401;
            return res.end(); 
          }

          res.write(rows[0].username);
          return res.end();
        }

        default:
          res.statusCode = 404;
          res.write('Ruta no válida');
          return res.end();
      }
    });
}).listen(8000);
