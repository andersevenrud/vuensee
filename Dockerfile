#
# vuensee
# @author Anders Evenrud <andersevenrud@gmail.com>
# @license MIT
#

FROM nginx:1-alpine

WORKDIR /usr/src/vuensee

COPY . ./

RUN apk add --no-cache --virtual .build-deps \
    npm \
    nodejs

RUN npm ci --silent --no-optional && \
  npm run build

RUN apk del .build-deps

RUN mv dist/* /usr/share/nginx/html/ && \
  rm -rf *
