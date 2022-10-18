import * as core from '@actions/core'
import * as github from '@actions/github'

interface Config {
  version: string
  token: string
}

export function getConfig(): Config {
  return {
    version: core.getInput('version', {required: true}),
    token: core.getInput('token', {required: true})
  }
}

type ClientType = ReturnType<typeof github.getOctokit>

export function getOctokit(): ClientType {
  const {token} = getConfig()
  return github.getOctokit(token)
}
