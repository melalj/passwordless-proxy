/* eslint-disable no-console */
const ProxyChain = require('proxy-chain');

const server = new ProxyChain.Server({
  port: process.env.PORT ? Number(process.env.PORT) : 8000,
  verbose: false,

  prepareRequestFunction: () => ({
    requestAuthentication: false,
    upstreamProxyUrl: process.env.PROXY_URL,
  }),
});

server.listen(() => {
  console.log(`Proxy server is listening on port ${server.port}`);
});
