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

app.get("/aerodromes_list", (req, res, next) => {
  pool
    .query(
      `SELECT aerodromos.code, aerodromos.name, aerodromos.latitude, aerodromos.longitude FROM aerodromos ORDER BY aerodromos.code`
    )

    .then((testData) => {
      res.send(testData.rows);
    });
});

app.get("/adhoc", (req, res, next) => {
  const codes = req.query?.codes?.split(",") ?? null;
  const region =
    req.query?.region
      ?.split(";")
      ?.map((item) => item.split(",").map((number) => parseFloat(number))) ??
    null;
  let fields =
    req.query?.fields?.split(",")?.map((item) => "aerodromos." + item) ?? [];
  const order =
    req.query?.order?.split(";")?.map((item) => item.split(",")) ?? [];
  const metar = req.query?.metar === "true" ? true : false;
  const taf = req.query?.taf === "true" ? true : false;
  const limit = parseInt(req.query?.limit ?? 100, 10);

  if(metar) {
    fields = fields.concat(["metar.validade_inicial AS metar_validade_inicial ", "metar.message AS metar_message"]);
  }

  if (taf) {
    fields = fields.concat(["taf.validade_inicial  AS taf_validade_inicial ", "taf.message AS taf_message"]);
  }

  let query = `SELECT ${fields.join(", ")} FROM aerodromos`;

  if (metar) {
    query += ` LEFT JOIN metar ON metar.code_aerodromo=aerodromos.code`;
  }

  if (taf) {
    query += ` LEFT JOIN taf ON taf.code_aerodromo=aerodromos.code`;
  }

  query += ` WHERE `;

  if (codes) {
    const conditions = [];
    for (let i = 0; i < codes.length; i++) {
      conditions.push(`aerodromos.code = '${codes[i]}'`);
    }
    query += conditions.join(" OR ");
  }

  if (region) {
    const conditions = [];

    const minorLat = region[0][0] < region[1][0] ? region[0][0] : region[1][0];
    const minorLng = region[0][1] < region[1][1] ? region[0][1] : region[1][1];
    const majorLat = region[0][0] > region[1][0] ? region[0][0] : region[1][0];
    const majorLng = region[0][1] > region[1][1] ? region[0][1] : region[1][1];

    conditions.push(
      `aerodromos.latitude BETWEEN ${minorLat} AND ${majorLat}`
    );
    conditions.push(
      `aerodromos.longitude BETWEEN ${minorLng} AND ${majorLng}`
    );
    query += conditions.join(" AND ");
  }

  if(order.length > 0) {
    query += ` ORDER BY ${order.map(item => item.join(" ")).join(", ")}`;
  }

  query += ` LIMIT ${limit}`;

  console.log(query);

  pool.query(query).then((testData) => {
    res.send(testData.rows);
  });
});

const server = app.listen(3001, function () {
  let host = server.address().address;
  let port = server.address().port;
});
