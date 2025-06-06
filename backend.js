import "dotenv/config";
import http from "http";
import { Client } from "pg";
import bcrypt from "bcrypt";

const { DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const client = new Client({
  host: "localhost",
  port: 5432,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

await client.connect();

http
  .createServer(async function (req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      return res.end();
    }

    let body = "";

    if (req.method !== "GET") {
      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", async () => {
          let rawData;

          try {
            rawData = JSON.parse(body);
          } catch (err) {
            res.statusCode = 400;
            return res.end("JSON inválido");
          }

          const { username, password, route, email, age } = rawData;

          switch (route) {
            case "/register": {
              // Verifica si el email ya está registrado
              const { rows } = await client.query(
                `SELECT email FROM usuario WHERE email = $1`,
                [email]
              );

              if (rows.length === 1) {
                res.statusCode = 409;
                return res.end("El correo ya está registrado");
              }

              // Hashea la contraseña
              const hashedPassword = await bcrypt.hash(password, 10);

              // Inserta el nuevo usuario
              await client.query(
                `INSERT INTO usuario (username, email, password, age) VALUES ($1, $2, $3, $4)`,
                [username, email, hashedPassword, age]
              );

              res.write(email);
              return res.end();
            }

            case "/guardar-preferencias": {
              const { username, preferencias } = rawData;
              // Verifica que username y preferencias estén presentes
              if (!username || !Array.isArray(preferencias)) {
                res.statusCode = 400;
                return res.end("Datos incompletos");
              }

              try {
                const { rows } = await client.query(
                  `SELECT username FROM usuario WHERE username = $1`,
                  [username]
                );
                if (rows.length === 0) {
                  res.statusCode = 404;
                  return res.end("Usuario no encontrado");
                }

                const idUsuario = rows[0].username;

                await client.query(
                  `DELETE FROM usuario_preferencia WHERE id_usuario = $1`,
                  [idUsuario]
                );

                for (const idPreferencia of preferencias) {
                  await client.query(
                    `INSERT INTO usuario_preferencia (id_usuario, id_preferencia) VALUES ($1, $2)`,
                    [idUsuario, idPreferencia]
                  );
                }

                res.statusCode = 200;
                return res.end("Preferencias guardadas");
              } catch (error) {
                console.error("Error guardando preferencias:", error);
                res.statusCode = 500;
                return res.end("Error interno del servidor");
              }
            }

            case "/obtener-preferencias-usuario": {
              const { username } = rawData;

              if (!username) {
                res.statusCode = 400;
                return res.end("Falta username");
              }

              const { rows } = await client.query(
                `SELECT id_preferencia FROM usuario_preferencia WHERE id_usuario = $1`,
                [username]
              );

              res.setHeader("Content-Type", "application/json");
              return res.end(JSON.stringify(rows));
            }

            case "/login": {
              const { rows } = await client.query(
                `SELECT username, password FROM usuario WHERE email = $1`,
                [email]
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

            case "/preferencias-usuario": {
              const { username } = rawData;

              if (!username) {
                res.statusCode = 400;
                return res.end("Falta el nombre de usuario");
              }

              try {
                const { rows } = await client.query(
                  `SELECT p.id_preferencia, p.nombre 
                  FROM usuario_preferencia up JOIN preferencias p ON up.id_preferencia = p.id_preferencia
                  WHERE up.id_usuario = $1`,
                  [username]
                );

                res.setHeader("Content-Type", "application/json");
                return res.end(JSON.stringify(rows));
              } catch (error) {
                console.error(
                  "Error al obtener preferencias del usuario:",
                  error
                );
                res.statusCode = 500;
                return res.end("Error interno del servidor");
              }
            }

            default:
              res.statusCode = 404;
              res.write("Ruta no válida");
              return res.end();
          }
        });
    } else {
      switch (req.url) {
        case "/preferencias": {
          try {
            const { rows } = await client.query(
              `SELECT id_preferencia, nombre FROM preferencias`
            );

            if (rows.length === 0) {
              res.statusCode = 404;
              return res.end("No hay preferencias disponibles");
            }

            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            return res.end(JSON.stringify(rows));
          } catch (error) {
            res.statusCode = 500;
            return res.end("Error al obtener preferencias");
          }
        }
        default:
          res.statusCode = 404;
          res.write("Ruta no válida");
          return res.end();
      }
    }
  })
  .listen(8000);
