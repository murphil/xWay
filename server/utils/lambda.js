export const log    = (...args) => console.log('<-----', ...args)

export const genLog = tag => (...args) => console.log(`<----- ${tag}`, ...args)

export const flip   = fun => (a, b, ...rest) => fun(b, a, ...rest)

export const id     = x => x

export const nth    = n => (...args) => args[n]

export const k      = nth(0)

export const forFun = method => (o, ...a) => o[method](...a)

export const toList = (...args) => args

export const seq    = (...fun) => (...args) => fun.splice(1) // 减少不必要的拷贝
  .reduce((acc,x) => x(acc, ...args), fun[0](...args))

export const curry  = fun => {
  let _c = (consume, produce) => {
    return (...args) => {
      if (consume <= args.length ) {
        return fun.apply(fun, [...produce, ...args])
      } else {
        return _c(consume - args.length, [...produce, ...args])
      }
    }
  }
  return _c(fun.length, [])
}

export const getIn  = (obj, path, alt) => {
  return path.reduce((cur, idx) => {
      return cur && cur[idx]
    }, obj) || alt
}

export const setIn  = (obj, path, value) => {
  let tg = obj, end = path.length - 1
  for (let idx in path) {
    if (idx != end) {
      // 非终结路径
      let cur = tg[path[idx]]
      if ( typeof cur === 'undefined'
        // 强行覆写
        || typeof cur !== 'object') {
        tg[path[idx]] = {}
      }
      tg = tg[path[idx]]
    } else {
      // 终结路径
      tg[path[idx]] = value
    }
  }
  return obj // fluent api
}

export const setInV = seq(setIn, nth(3))

const getterToPath  = {
  apply(target, ctx, args) {
    let path = target.path
    let obj = getIn(target.payload, path)
    target.path = []
    return target.over({obj, args, path, orig: target.payload})
  },
  get(target, prop) {
    target.path = [...target.path || [], prop]
    return new Proxy(target, getterToPath)
  }
}

export const mkLens = over => obj => {
  let r = new Function()
  r.payload = obj
  r.path = []
  r.over = over
  return new Proxy(r, getterToPath)
}

export const wrapTip = tip => {
  return mkLens(({obj}) => {
    if (obj) {
      return obj
    } else {
      throw Error(tip)
    }
  })
}

export const muteGet = mkLens(({obj}) => obj)

