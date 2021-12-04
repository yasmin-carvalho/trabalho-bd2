const express = require("express");

const app = express();
var cors = require("cors");

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "trabalhoBD",
  password: "root",
  dialect: "postgres",
  port: 5432,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});

app.get("/aerodromos", (req, res, next) => {
  pool
    .query(
      `SELECT aerodromos.code, aerodromos.latitude, aerodromos.longitude, aerodromos.name,
                       metar.validade_inicial AS metar_validade_inicial, metar.recebimento AS metar_recebimento, metar.message AS metar_message, 
                       taf.validade_inicial AS taf_validade_inicial, taf.recebimento AS taf_recebimento, taf.message AS taf_message
                FROM public.aerodromos
                INNER JOIN public.metar ON metar.code_aerodromo=aerodromos.code
                INNER JOIN public.taf ON taf.code_aerodromo=aerodromos.code
                ORDER BY metar.validade_inicial DESC`
    )

    .then((testData) => {
      res.send(testData.rows);
    });
});

app.get("/sigmet", (req, res, next) => {
  pool
    .query(
      `SELECT sigmet.id_fir, sigmet.lat_lon, sigmet.validate_inicial, sigmet.validate_final, sigmet.message, sigmet.fenomeno, sigmet.fenomeno_comp, sigmet.fenomeno_cor, sigmet.fenomeno_transparencia FROM public.sigmet`
    )

    .then((testData) => {
      res.send(testData.rows);
    });
});

const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
});
