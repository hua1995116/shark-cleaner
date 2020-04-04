const babel = {
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": true
      }
    ],
    "@babel/plugin-syntax-async-generators",
    [
      "@babel/plugin-transform-runtime",
      {
        "helpers": false,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}

if (process.env.RUN_TYPE !== 'electron') {
  babel.plugins.push("./render/remove.js");
}

module.exports = babel;