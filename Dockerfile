FROM node:21-alpine as dependencies

COPY ./package*.json .

RUN npm install

FROM node:21-alpine as build

COPY --from=dependencies /node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:21-alpine

WORKDIR /app

COPY --from=build /dist ./dist
COPY --from=build /build ./build
COPY --from=build /package.json .
COPY --from=dependencies /node_modules ./node_modules

CMD sleep 1h