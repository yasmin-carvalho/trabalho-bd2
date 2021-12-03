const axios = require('axios')

const client = axios.create({
  baseURL: 'https://api-redemet.decea.mil.br/',
  timeout: 5000,
  headers: {'X-Api-Key': 'rGQZOWtDeSq2Kg1TyuCQNBm0cRG2Bg5BBNsE0SYL'}
});

const trackAerodromos = async () => {
  try {
    const response = await client.get('/aerodromos/')
    const data = response.data.data
    return data.map(item => ({
      ...item,
      latitude: +item.lat_dec,
      longitude: +item.lon_dec
    }))
  } catch(e) {
    return null
  }
}

const trackMETAR = async (local) => {
  try {
    const response = await client.get('/mensagens/metar/' + local)
    const data = response.data.data.data[0]
    if(!data) return null
    return {
      ...data,
      validade_inicial: new Date(data.validade_inicial),
      recebimento: new Date(data.recebimento)
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

const trackTAF = async (local) => {
  try {
    const response = await client.get('/mensagens/taf/' + local)
    const data = response.data.data.data[0]
    if(!data) return null
    return {
      ...data,
      validade_inicial: new Date(data.validade_inicial),
      recebimento: new Date(data.recebimento)
    }
  } catch(e) {
    console.log(e)
    return null
  }
}

const trackSIGMET = async () => {
  try {
    const response = await client.get('/mensagens/sigmet/')
    const data = response.data.data.data
    if(!data) return null
    return data.map(item => ({
      ...item,
      validade_inicial: new Date(item.validade_inicial),
      recebimento: new Date(item.recebimento)
    }))
  } catch(e) {
    console.log(e)
    return null
  }
}

module.exports = {
  trackAerodromos,
  trackMETAR,
  trackTAF,
  trackSIGMET
}