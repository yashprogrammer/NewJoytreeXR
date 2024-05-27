const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // This is the endpoint that will be proxied
    createProxyMiddleware({
      target: "https://example.com", // The external API server
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove '/api' from the proxied request URL
      },
    })
  );
};
