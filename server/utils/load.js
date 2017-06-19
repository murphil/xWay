/*
- 延迟加载，例如 function目录:
  - 实现为对象
  - 实例中初始化存储路径
  - 读取目录中的 yml 文件列表，获取文件名作为标识符
  - 维护标识符->加载路径的列表
  - load 方法实际加载
    - reload 机制
  - update 方法更新文件
*/
const path    = require('path')
const fs      = require('fs')
const jsYaml  = require('js-yaml')
const loadYml = path => jsYaml.safeLoad(fs.readFileSync(path, 'utf-8'))
const saveYml = (path, obj) => fs.writeFileSync(path, jsYaml.safeDump(obj))

const lazy = (path, ext='yml', loader=loadYml, saver) => {
  let re = new RegExp(`.*\.${ext}$`)
  let files = fs.readdirSync(path)
                .filter(x=> re.test(x))
                .map(x => path.parse(x).name)
  let collection = {}
  let getRealPath = (ident) => path.resolve(path, `${ident}.${ext}`)
  return {
    load(ident){
      if (files.indexOf(ident)>0 && ! collection[ident]){
        collection[ident] = loader(getRealPath(ident))
      }
      return collection[ident]
    },
    refresh(){
      collection = {}
    },
    dump(ident, obj) {
      saveYml(getRealPath(ident), obj)
    }
  }
}

module.exports = {
  lazy, loadYml, saveYml
}