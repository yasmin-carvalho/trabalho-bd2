const Pool = require('pg').Pool;

const pool = new Pool({
    user: "root",
    host: "localhost",
    database: "trabalhoBD",
    password: "root",
    dialect: "postgres",
    port: 5432,
});

const connectToDb = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, release) => {
            if (err) {
                reject('Error acquiring client', err.stack);                
            }
            
            client.query('SELECT NOW()', (err, result) => {
                release();

                if (err) {
                    reject('Error executing query', err.stack);
                }
                
                resolve();
            });
        });
    });
}

const insertAerodromo = async (aerodromo) => {
    try {
        await pool.query('INSERT INTO aerodromos(code, latitude, longitude, name) VALUES($1, $2, $3, $4)',
                    [aerodromo.cod, aerodromo.latitude, aerodromo.longitude, aerodromo.nome])
        return true
    } catch(e) {
        console.log(e)
        return null
    }
}

const insertMETAR = async (metar) => {
    try {
        await pool.query('INSERT INTO metar(code_aerodromo, validade_inicial, recebimento, message) VALUES($1, $2, $3, $4)',
                    [metar.id_localidade, metar.validade_inicial, metar.recebimento, metar.mens])
        return true
    } catch(e) {
        console.log(e)
        return null
    }
}

const insertTAF = async (taf) => {
    try {
        await pool.query('INSERT INTO taf(code_aerodromo, validade_inicial, recebimento, message) VALUES($1, $2, $3, $4)',
                    [taf.id_localidade, taf.validade_inicial, taf.recebimento, taf.mens])
        return true
    } catch(e) {
        console.log(e)
        return null
    }
}

const insertSIGMET = async (sigmet) => {
    try {
        await pool.query('INSERT INTO sigmet(id_fir, lat_lon, validate_inicial, validate_final, message, fenomeno, fenomeno_comp, fenomeno_cor, fenomeno_transparencia) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                        [sigmet.id_fir, { lat_lon: sigmet.lat_lon }, sigmet.validade_inicial, sigmet.validade_final, sigmet.mens, sigmet.fenomeno, sigmet.fenomeno_comp, sigmet.fenomeno_cor, sigmet.fenomeno_transparencia])
        return true
    } catch(e) {
        console.log(e)
        return null
    }
}

module.exports = {
    connectToDb,
    insertAerodromo,
    insertMETAR,
    insertTAF,
    insertSIGMET
}