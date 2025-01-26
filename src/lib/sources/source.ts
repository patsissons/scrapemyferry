import * as bcf from './bcf'
import { Source } from './types'

export function sourceForType(sourceType: string): Source {
  switch (sourceType) {
    case 'bcf':
      return bcf
  }

  throw new Error(`Unknown source type: ${sourceType}`)
}
