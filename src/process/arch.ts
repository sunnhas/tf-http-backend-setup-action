export enum Architecture { // eslint-disable-line no-shadow
  i364 = 'i364',
  x64 = 'x86_64',
  arm64 = 'arm64'
}

export function parseArch(arch: string): Architecture {
  switch (arch) {
    case '386':
      return Architecture.i364
    case 'x64':
      return Architecture.x64
    case 'arm64':
      return Architecture.arm64
    default:
      throw new Error(`${arch} is not supported`)
  }
}
