export enum OperatingSystem { // eslint-disable-line no-shadow
  Linux = 'Linux',
  MacOS = 'Darwin',
  Windows = 'Windows'
}

export function parseOS(os: string): OperatingSystem {
  switch (os) {
    case 'linux':
      return OperatingSystem.Linux
    case 'darwin':
      return OperatingSystem.MacOS
    case 'win32':
      return OperatingSystem.Windows
    default:
      throw new Error(`${os} is not supported`)
  }
}
