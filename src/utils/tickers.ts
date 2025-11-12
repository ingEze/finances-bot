import { SimplifiedTicker, Ticker } from '../types/types.js'

export function tickers(trickers: Ticker[]): { topTickers: SimplifiedTicker[], avgPriceUsd: number, totalVolumeUsd: number } {
  const simplifiedTicker: SimplifiedTicker[] = trickers.map(t => ({
    exchange: t.market.name,
    last: t.last,
    price_usd: t.converted_last.usd,
    volume: t.volume,
    trade_url: t.trade_url,
    trust_score: t.trust_score
  }))

  const topTickers = simplifiedTicker
    .filter(t => t.trust_score === 'green')
    .sort((a, b) => a.volume - b.volume)
    .slice(0, 10)

  const avgPriceUsd =
    trickers.reduce((acc, t) => acc + t.converted_last.usd, 0) /
    trickers.length

  const totalVolumeUsd = trickers.reduce((acc, t) => acc + t.converted_volume.usd, 0)

  return {
    topTickers,
    avgPriceUsd,
    totalVolumeUsd
  }

}
