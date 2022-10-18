import * as tc from '@actions/tool-cache'
import * as core from '@actions/core'
import {promises as fsp} from 'fs'
import path from 'path'
import {Repository} from './repository'
import * as exec from '@actions/exec'
import {Architecture} from './process/arch'
import {OperatingSystem} from './process/os'

export namespace Tool {
  const Name = 'tf-http-backend'
  export const Owner = 'sunnhas'
  export const Repo = 'tf-http-backend'
  export const CmdName = 'tf-http-backend'

  export function find(version: string, arch: Architecture): string {
    return tc.find(Name, version, arch)
  }

  export async function download(os: OperatingSystem, arch: Architecture, version: string): Promise<string> {
    const toolURL: string = getDownloadURL(os, arch, version)
    core.info(`Download url: ${toolURL}`)

    const tar = await tc.downloadTool(toolURL)
    const binaryDir = await tc.extractTar(tar)
    const toolDir = await tc.cacheDir(binaryDir, CmdName, version, arch)

    const toolName = getToolName(os)
    await fsp.chmod(path.join(toolDir, toolName), 0o755)

    return toolDir
  }

  export async function test() {
    let output = ''

    const options = {
      listeners: {
        stdout: (data: Buffer): void => {
          output += data.toString()
        }
      }
    }

    const exitCode = await exec.exec(CmdName, ['version'], options)
    core.debug(`Command: ${CmdName} version`)
    core.debug(`Exit code: ${exitCode}`)
    core.debug(`Stdout: ${output}`)
  }

  function getDownloadURL(os: OperatingSystem, arch: string, version: string): string {
    const v = version.replace('v', '')
    return `${Repository.getReleaseUrl(version)}/tf-http-backend_${v}_${os}_${arch}.tar.gz`
  }

  function getToolName(os: OperatingSystem): string {
    if (os === OperatingSystem.Windows) {
      return `${CmdName}.exe`
    } else {
      return `${CmdName}`
    }
  }
}
