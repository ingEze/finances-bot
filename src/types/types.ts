export type LevelType = 'simpleInfo' | 'tokenInfo' | 'fullInfo'

export type CoinData = {
  id: string
  aliases: string[]
  type: string
  network: string | null
  contract: string | null
}

export type Ticker = {
  base: string
  target: string
  market: {
    name: string
    identifier: string
    has_trading_incentive: boolean
  }
  last: number
  volume: number
  converted_last: {
    btc: number
    eth: number
    usd: number
  }
  converted_volume: {
    btc: number
    eth: number
    usd: number
  }
  trust_score: string
  bid_ask_spread_percentage: number
  timestamp: string
  trade_url: string | null
  coin_mcap_usd?: number
}

export type SimplifiedTicker = {
  exchange: string
  last: number
  price_usd: number
  volume: number
  trade_url: string | null
  trust_score: string
}

export type Links = {
  homepage: string[]
}

export type MarketData = {
  current_price: {
    [k: string]: unknown
  }
}

export type TickersData = {
  topTickers: SimplifiedTicker[]
  avgPriceUsd: number
  totalVolumeUsd: number
}

export type SanitizeResponse = {
  name: string
  description: string
  links: Links
  whitepaper: string[]
  blockchain_site: string[]
  market_data: MarketData
  last_updated: string
  tickers: TickersData
}
