FROM node:16-alpine as prod

RUN apk add --no-cache nfs-utils

COPY nfs-server/exports /etc/
COPY nfs-server/nfsd.sh /usr/bin/nfsd.sh

RUN chmod +x /usr/bin/nfsd.sh

FROM node:16-alpine as builder

ENV NODE_ENV build

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# ---

FROM prod

ENV NODE_ENV production

COPY --from=builder package.json ./
COPY --from=builder yarn.lock ./
COPY --from=builder node_modules/ ./node_modules/
COPY --from=builder dist/ ./dist/
COPY --from=builder entrypoint.sh/ ./

VOLUME /data

CMD ["sh", "entrypoint.sh"]
# sudo docker run --privileged -d -v /data:/data -p 2049:2049 -p 3333:3333 --env-file .env betogontijo/deta-backup