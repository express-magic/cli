import cp from 'child_process'
import nfs from 'fs'
import path from 'path'
import util from 'util'

const xc = util.promisify(cp.exec)

const fs = {
  exists: util.promisify(nfs.exists),
}

const findCmd = async cmd => {
  if (!cmd) {
    throw new Error('Can not execute empty command.')
  }

  if (typeof cmd !== 'string') {
    throw new Error('Cmd has to be a string')
  }

  if (await fs.exists(cmd)) {
    return cmd
  }

  let newCmd = path.join(process.cwd(), 'node_modules', '.bin', cmd)

  if (!await fs.exists(cmd)) {
    newCmd = path.join(process.cwd(), 'bin', cmd)

    if (!await fs.exists(newCmd)) {
      newCmd = path.join(process.cwd(), 'src', 'bin', cmd)

      if (!await fs.exists(newCmd)) {
        throw new Error(`cmd not found: ${cmd}`)
      }
    }
  }

  return newCmd
}

export const exec = async cmd => {
  cmd = await findCmd(cmd)

  return await xc(`node --experimental-modules ${cmd}`)
}

export default exec
