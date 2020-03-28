# handle-data

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[45a3e22](https://github.com/SimulatedGREG/electron-vue/tree/45a3e224e7bb8fc71909021ccfdcfec0f461f634) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).


# log

## install electron-vue template from vue-cli 
```vue init simulatedgreg/electron-vue my-project```

## node-sass 注入 全局 scss 文件 报错

- 官网方法

- .electron-vue/webpack.renderer.config.js 文件修改内容

```js
loaders: {
    sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1&data=@import "./src/renderer/globals"',
    scss: 'vue-style-loader!css-loader!sass-loader?data=@import "./src/renderer/globals";'
}
```
- [electron-vue](https://github.com/SimulatedGREG/electron-vue) 项目 issue 解决方案如下

- 如上相同文件下 只需修改如下内容

```js
{
    test: /\.scss$/,
    use: ['vue-style-loader', 'css-loader', 'sass-loader?data=@import "@/styles globals";']
}
```

## main 主进程 窗口配置 系统托盘配置
将采用模拟顶部

## 引入 element-ui

## 主体页面布局

## 引入 iconfont