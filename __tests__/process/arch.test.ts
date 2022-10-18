import {test} from '@jest/globals'
import {Architecture, parseArch} from '../../src/process/arch'
import {equal, throws} from 'assert'

test('can parse architecture', () => {
  equal(parseArch('386'), Architecture.i364)
})

test('will throw error when architecture is not supported', () => {
  throws(() => parseArch('unknown'))
})
