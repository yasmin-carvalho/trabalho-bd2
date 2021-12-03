const pgConn = require('./database')
const trackBack = require('./track-back')

const start = async () => {
  await pgConn.connectToDb()

  const aerodromos = await trackBack.trackAerodromos();
  for(let aerodromo of aerodromos) {
    await pgConn.insertAerodromo(aerodromo)

    const metar = await trackBack.trackMETAR(aerodromo.cod)
    if(metar) {
      await pgConn.insertMETAR(metar)
    }

    const taf = await trackBack.trackTAF(aerodromo.cod)
    if(taf) {
      await pgConn.insertTAF(taf)
    }
  }

  const listSigmets = await trackBack.trackSIGMET()
  if (listSigmets) {
    for(let [index, value] of listSigmets.entries()) {
      await pgConn.insertSIGMET(value)
    }
  } else {
    console.warn('Lista Sigmet Vazia');
  }
}

start();