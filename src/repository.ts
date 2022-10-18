import {getOctokit} from './config'
import {Tool} from './tool'

export namespace Repository {
  const Owner = 'sunnhas'
  const Repo = 'tf-http-backend'

  export function getReleaseUrl(version: string): string {
    if (version === 'latest') {
      return `https://github.com/${Owner}/${Repo}/releases/latest/download`
    } else {
      return `https://github.com/${Owner}/${Repo}/releases/download/${version}`
    }
  }

  export async function getVersionTag(inputVersion: string): Promise<string> {
    const client = getOctokit()

    if (inputVersion && inputVersion !== 'latest') {
      const response = await client.rest.repos.getReleaseByTag({
        owner: Tool.Owner,
        repo: Tool.Repo,
        tag: inputVersion
      })

      if (response.status === 200) {
        return response.data.tag_name
      } else {
        throw new Error(`Release ${inputVersion} not found`)
      }
    } else {
      const response = await client.rest.repos.getLatestRelease({
        owner: Tool.Owner,
        repo: Tool.Repo
      })
      return response.data.tag_name
    }
  }
}
