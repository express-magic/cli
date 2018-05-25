import path from 'path'

import { is, tryCatch } from '@magic/test'

import { exec } from '../src'

const fixturePath = path.join(process.cwd(), 'test', '.fixtures', 'cli.mjs')

export default [
  { fn: tryCatch(exec), expect: is.error, info: 'empty arguments error' },
  { fn: tryCatch(exec, ''), expect: is.error, info: 'empty string argument errors' },
  { fn: tryCatch(exec, []), expect: is.error, info: 'array argument errors' },
  { fn: tryCatch(exec, {}), expect: is.error, info: 'object argument errors' },
  { fn: tryCatch(exec, 'cmd'), expect: is.error, info: 'string argument not found in .bin errors' },
  { fn: tryCatch(exec, fixturePath), expect: ({ stdout }) => stdout === 'hi\n', info: 'can capture stdout' },
]
