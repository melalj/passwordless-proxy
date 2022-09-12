/* eslint-disable no-console */
const ProxyChain = require('proxy-chain');

const server = new ProxyChain.Server({
  port: process.env.PORT ? Number(process.env.PORT) : 8000,
  verbose: process.env.ENABLE_LOG_VERBOSE === 'true',

  prepareRequestFunction: () => ({
    requestAuthentication: false,
    upstreamProxyUrl: process.env.PROXY_URL,
  }),
});

server.listen(() => {
  console.log(`Proxy server is listening on port ${server.port}`);
});

if (process.env.ENABLE_LOG_CONNECTION_CLOSED === 'true') {
  server.on('connectionClosed', ({ connectionId, stats }) => {
    console.log(`Connection ${connectionId} closed`);
    console.dir(stats);
  });
}

if (process.env.ENABLE_LOG_REQUEST_FAILED === 'true') {
  server.on('requestFailed', ({ request, error }) => {
    console.log(`Request ${request.url} failed`);
    console.error(error);
  });
}
