// runs once before each test file, after jest has been initialized

import * as matchers from 'jest-extended'
import './jest-conditional'

expect.extend(matchers)
