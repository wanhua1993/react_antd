const { override, fixBabelImports, addLessLoader, addWebpackAlias, addDecoratorsLegacy } = require('customize-cra');
const path = require('path');
module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    // style: 'css',
    style: true // 自动打包相关的样式
  }),
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: { '@primary-color': '#ea5147' },
  }),
  // 添加别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  // 装饰器
  addDecoratorsLegacy()
)