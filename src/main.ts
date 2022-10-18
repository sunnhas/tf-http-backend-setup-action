import * as core from '@actions/core'
import * as OS from './process/os'
import * as Arch from './process/arch'
import {Tool} from './tool'
import {getConfig} from './config'
import {Repository} from './repository'

async function run(): Promise<void> {
  try {
    const config = getConfig()

    const version = await Repository.getVersionTag(config.version)
    core.info(`Version: ${version}`)

    const os = OS.parseOS(process.platform)
    const arch = Arch.parseArch(process.arch)
    core.info(`Platform: ${os}/${arch}`)

    let toolPath = Tool.find(version, arch)
    if (toolPath) {
      core.info(`Tool is found in cache at ${toolPath}`)
    } else {
      toolPath = await Tool.download(os, arch, version)
    }

    core.addPath(toolPath)

    await Tool.test()
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
