module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: "https://api.realworld.io/api/",
  },
};
