import {test} from '@jest/globals'
import {equal, throws} from 'assert'
import {OperatingSystem, parseOS} from '../../src/process/os'

test('can parse operating system', () => {
  equal(parseOS('darwin'), OperatingSystem.MacOS)
})

test('will throw error when operating system is not supported', () => {
  throws(() => parseOS('unknown'))
})
