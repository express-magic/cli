// filter argv for multiples of the same option, '-v', '--version'
export const replaceArgv = args => {
  let argv
  args
    .map(arg => ({ arg, idx: process.argv.indexOf(arg) }))
    .filter(({ idx }) => idx > -1)
    .map(({ arg, idx }, id) => {
      if (id === 0) {
        argv = args[args.length - 1]
      }
    })

  return argv
}

// test multiple aliases for match in argv
export const hasArgv = (...args) => args.some(arg => process.argv.indexOf(arg) > -1)

export const argv = {
  has: hasArgv,
  replace: replaceArgv,
}

export default argv
