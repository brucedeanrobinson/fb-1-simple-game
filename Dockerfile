FROM oven/bun:1


# mkdir app && cd app
WORKDIR /app

COPY package.json .
COPY bun.lock* .

COPY . .

RUN bun install --frozen-lockfile

CMD ["bun", "serve"]