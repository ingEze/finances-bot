export type LevelType = 'simpleInfo' | 'tokenInfo' | 'fullInfo' | 'marketInfo' | 'tickers'

export type CoinData = {
  id: string
  aliases: string[]
  type: string
  network: string | null
  contract: string | null
}

export type CoinParams = {
  // /simple/price y /simple/token_price/:network
  vs_currencies?: string
  ids?: string
  contract_addresses?: string | null
  include_last_updated_at?: boolean
  include_24hr_vol?: boolean
  include_24hr_change?: boolean
  include_market_cap?: boolean

  // /coins/markets
  vs_currency?: string
  order?: string
  per_page?: number
  page?: number
  sparkline?: boolean

  // /coins/{id}/tickers
  include_exchange_logo?: boolean
  depth?: boolean
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

export interface TickerSimplificado {
  base: string
  target: string
  market: string
  last: number
  volume: number
  converted_last?: { btc: number; eth: number; usd: number }
  converted_volume?: { btc: number; eth: number; usd: number }
  trust_score?: string
  trade_url?: string
}
