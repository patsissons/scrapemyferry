import * as bcf from './bcf'
import { Source } from './types'

export function sourceForType(sourceType: string): Source | undefined {
  switch (sourceType) {
    case 'bcf':
      return bcf
  }
}
