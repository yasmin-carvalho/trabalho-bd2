const pgConn = require('./database')
const crawler = require('./crawler')

const start = async () => {
  await pgConn.connectToDb()

  const aerodromos = await crawler.crawlAerodromos();
  for(let aerodromo of aerodromos) {
    await pgConn.insertAerodromo(aerodromo)

    console.log("Coletando o METAR de", aerodromo.cod)
    const metar = await crawler.crawlMETAR(aerodromo.cod)
    if(metar) {
      await pgConn.insertMETAR(metar)
    }

    console.log("Coletando o TAF de", aerodromo.cod)
    const taf = await crawler.crawlTAF(aerodromo.cod)
    console.log(taf)
    if(taf) {
      await pgConn.insertTAF(taf)
    }
  }

  const listSigmets = await crawler.crawlSIGMET()
  if (listSigmets) {
    for(let [index, value] of listSigmets.entries()) {
      console.log('Inserindo sigmet', index+1)
      await pgConn.insertSIGMET(value)
    }
  } else {
    console.log('Lista Sigmet Vazia');
  }
}

start();