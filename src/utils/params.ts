import { CoinData, CoinParams } from '../types/types.js'

export function getParams(level: string, coinData: CoinData): CoinParams {
  switch (level) {
  case 'simpleInfo':
    return {
      vs_currencies: 'usd',
      ids: coinData.id,
      include_last_updated_at: true,
      include_24hr_vol: true,
      include_market_cap: true,
      include_24hr_change: true
    }
  case 'tokenInfo':
    return {
      vs_currencies: 'usd',
      contract_addresses: coinData.contract,
      include_last_updated_at: true,
      include_24hr_vol: true,
      include_market_cap: true,
      include_24hr_change: true
    }

  case 'marketInfo':
    return {
      vs_currency: 'usd',
      ids: coinData.id,
      order: 'market_cap_desc',
      per_page: 1,
      page: 1,
      sparkline: false
    }

  case 'fullInfo':
    return {}

  case 'tickersInfo':
    return {
      page: 1,
      per_page: 10,
      include_exchange_logo: true,
      depth: false
    }

  default:
    return {}
  }

}
