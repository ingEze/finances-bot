import { LevelType } from 'src/types/types'
import { LEVELS } from './data/levels.js'

export function getLevel(msg: string): string | null {
  const lowerMsg = msg.toLowerCase()
  for (const level in LEVELS) {
    const keywords = LEVELS[level as keyof typeof LEVELS]
    if (keywords.some((word: string) => lowerMsg.includes(word))) {
      return level as LevelType
    }
  }
  return 'simpleInfo'
}
