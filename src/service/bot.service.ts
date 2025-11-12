import { getCoinFromMsg } from '../utils/getCoinsFromMessage'
import { getLevel } from '../utils/getLevel'
import logger from '../utils/logger.js'
import { sanitizeResponse } from 'src/utils/sanitizeResponse'
import { fetchAPI } from 'src/utils/fetchAPI'
import { AxiosResponse } from 'axios'
import { getParams } from 'src/utils/params'

export async function botService(msg: string): Promise<AxiosResponse | string> {
  let endpoint, params

  // const intent = getActionFromMsg(msg) => por el momento no hace nada, si se progresa, se usará para detectar diferentes intenciones, ej: get_price, get_history
  const coinData = getCoinFromMsg(msg)
  if (!coinData) {
    return 'No encontré esa moneda en mis listas. Lo siento!'
  }

  const level = getLevel(msg) ?? 'simpleInfo'

  switch (level) {
  case 'simpleInfo':
    endpoint = '/simple/price'
    params = getParams(level, coinData)
    logger.info('simple')
    break

  case 'tokenInfo':
    endpoint = `/simple/token_price/${coinData.network}`
    params = getParams(level, coinData)
    logger.info('tokenInfo')
    break

  case 'marketInfo':
    endpoint = '/coins/markets'
    params = getParams(level, coinData)
    logger.info('marketInfo')
    break

  case 'fullInfo':
    endpoint = `/coins/${coinData.id}`
    params = getParams(level, coinData)
    logger.info('fullInfo')
    break

  case 'tickersInfo':
    endpoint = `/coins/${coinData.id}/tickers`
    params = getParams(level, coinData)
    logger.info('tickerInfo')
    break

  default:
    return 'Lo siento! no he logrado conseguir información de lo que me has pedido'
  }

  const response = await fetchAPI(endpoint, params)
  if (!response) {
    throw new Error('API error response')
  }

  const sanitize = sanitizeResponse(level, response)
  return sanitize
}

