import axios, { AxiosResponse } from 'axios'
import { getCoinFromMsg } from '../utils/getCoinsFromMessage'
import { getLevel } from '../utils/getLevel'
import logger from '../utils/logger.js'
import { trickers } from '../utils/tickers.js'
import { SanitizeResponse, Ticker } from '../types/types.js'

type Params = {
  vs_currencies: 'usd'
  include_last_updated_at: boolean
  contract_addresses: string | null
  ids: string | null
}

export async function botService(msg: string): Promise<SanitizeResponse | string> {
  let endpoint
  const params: Params = {
    vs_currencies: 'usd',
    include_last_updated_at: true,
    contract_addresses: null,
    ids: null
  }

  // const intent = getActionFromMsg(msg) => por el momento no hace nada, si se progresa, se usará para detectar diferentes intenciones, ej: get_price, get_history

  const coinData = getCoinFromMsg(msg)
  if (!coinData) {
    return 'No encontré esa moneda en mis listas. Lo siento!'
  }

  const level = getLevel(msg)

  if (level === 'simpleInfo') {
    endpoint = '/simple/price'
    logger.info('simple')
    params.ids = coinData.id
  } else if (level === 'tokenInfo' && coinData.type === 'token') {
    logger.info('tokenInfo')
    endpoint = `/simple/token_price/${coinData.network}`
    params.contract_addresses = coinData.contract
  } else {
    logger.info('fullInfo')
    endpoint = `/coins/${coinData.id}`
  }

  const response = await fetchAPI(endpoint, params)
  if (!response) {
    throw new Error('API error response')
  }

  const allowedCurrentPrice =  ['ars', 'eur', 'usd', 'eth', 'btc']
  const current_price = Object.fromEntries(
    Object.entries(response.data.market_data.current_price)
      .filter(([key]) => allowedCurrentPrice.includes(key))
  )

  const tickersArray: Ticker[] = response.data.tickers ?? []
  console.log(tickersArray)
  const tickersData = trickers(tickersArray)

  const sanitize: SanitizeResponse = {
    name: response.data.name,
    description: response.data.description,
    links: {
      homepage: response.data.links.homepage ?? []
    },
    whitepaper: response.data.whitepaper ?? [],
    blockchain_site: response.data.blockchain_site ?? [],
    market_data: {
      current_price
    },
    last_updated: response.data.last_updated,
    tickers: {
      topTickers: tickersData.topTickers,
      avgPriceUsd: tickersData.avgPriceUsd,
      totalVolumeUsd: tickersData.totalVolumeUsd
    }
  }
  return sanitize
}

async function fetchAPI(endpoint: string, params?: object): Promise<AxiosResponse> {
  const API_KEY = process.env.API_KEY
  if (!API_KEY) throw new Error('API_KEY is required')

  const response = await axios.get(`https://api.coingecko.com/api/v3${endpoint}`, {
    params,
    headers: {
      'x-cg-demo-api-key': API_KEY
    }
  })
  return response
}
