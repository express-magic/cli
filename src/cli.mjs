import argv from './argv'

export const defaultArgs = {
  options: [],
  default: [],
  argv: [],
  env: [],
  help: false,
}

export const cli = props => {
  const args = { ...defaultArgs, ...props }

  if (args.help && args.help.length) {
    if (argv.has(['-h', '--h', '--help'])) {
      console.log(args.help)
      process.exit()
    }
  }

  let mappedArgv = args.options.map(argv.replace).filter(a => a)

  if (mappedArgv.length === 0 && args.default && args.default.length > 0) {
    mappedArgv = args.default
  }

  const argvAppend = [...mappedArgv, ...args.argv]

  process.argv = [process.argv[0], process.argv[1], ...argvAppend]

  args.env.filter(([argv, env]) => process.argv.indexOf(argv) > -1).map(([argv, env, set]) => {
    process.env[env] = set
  })

  return argvAppend.join(' ')
}

export default cli
