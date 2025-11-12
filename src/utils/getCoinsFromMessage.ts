import { CoinData } from '../types/types.js'
import { coins } from './data/coins.js'

export function getCoinFromMsg(msg: string): CoinData | null {
  const lowerMsg = msg.toLowerCase()
  for (const type in coins) {
    const coinData = coins[type as keyof typeof coins]
    if (coinData.aliases.some((keyword: string) => lowerMsg.includes(keyword))) {
      return coinData
    }
  }

  return null
}

