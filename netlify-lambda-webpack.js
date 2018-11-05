module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.mjs$/,
        type: 'javascript/auto',
      },
    ],
  },
}
