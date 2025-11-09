import { intents } from './data/intents.js'

export function getActionFromMsg(msg: string): string | null {
  const lowerMsg = msg.toLowerCase()
  for (const intent in intents) {
    const keywords = intents[intent as keyof typeof intents]
    if (keywords.some((keyword: string) => lowerMsg.includes(keyword))) {
      return intent
    }
  }
  return null
}
