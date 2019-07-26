const { override, fixBabelImports, addLessLoader } = require('customize-cra');
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
  })
)