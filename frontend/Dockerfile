FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src ./src
COPY public ./public
COPY next.config.js .
COPY jsconfig.json .

# ENV NEXT_TELEMETRY_DISABLED 1

CMD npm run build && npm run start
