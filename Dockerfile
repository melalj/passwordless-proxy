FROM node:16.13-alpine
ADD package.json /tmp/package.json
RUN cd /tmp && yarn install --silent && mkdir -p /app && cp -a /tmp/node_modules /app/
WORKDIR /app
ADD . /app
CMD ["yarn", "start"]
