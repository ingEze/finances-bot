/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios'
import { Ticker, TickerSimplificado } from '../types/types.js'
import { tickers } from './tickers.js'

export function sanitizeResponse(level: string, response: AxiosResponse): AxiosResponse {
  let sanitize

  switch (level) {
  case 'simpleInfo':
  case 'tokenInfo':
    sanitize = response.data
    break

  case 'marketInfo': {
    const result = response.data.map((data: any) => {
      return {
        id: data.id,
        symbol: data.symbol,
        name: data.name,
        image: data.image,
        current_price: data.current_price,
        market_cap: data.market_cap,
        market_cap_rank: data.market_cap_rank,
        total_volume: data.total_volume,
        high_24h: data.high_24h,
        low_24h: data.low_24h
      }
    })
    sanitize = result
    break
  }

  case 'fullInfo': {
    const allowedCurrentPrice = ['ars', 'eur', 'usd', 'eth', 'btc']
    const current_price = Object.fromEntries(
      Object.entries(response.data.market_data.current_price)
        .filter(([key]) => allowedCurrentPrice.includes(key))
    )

    const tickersArray: Ticker[] = response.data.tickers ?? []
    const tickersData = tickers(tickersArray)

    sanitize = {
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
    break
  }

  case 'tickersInfo': {
    const tickers: TickerSimplificado[] = response.data.tickers.map((t: any) => ({
      base: t.base,
      target: t.target,
      market: t.market.name,
      last: t.last,
      volume: t.volume,
      converted_last: t.converted_last,
      converted_volume: t.converted_volume,
      trust_score: t.trust_score,
      trade_url: t.trade_url
    }))

    const topTickers = tickers
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10)

    sanitize = topTickers
    break
  }
  }

  return sanitize
}

