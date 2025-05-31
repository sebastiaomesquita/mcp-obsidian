# Usar imagem com Bun (não oficial, mas tem no Docker Hub)
FROM oven/bun:latest AS builder

WORKDIR /app

# Copiar package.json e package-lock.json (se tiver)
COPY package.json ./

# Instalar dependências com bun
RUN bun install

# Copiar o restante do código
COPY . .

# Rodar build via Bun
RUN bun build src/index.ts --target node --outdir=dist

# Imagem final, também usando Bun runtime
FROM oven/bun:latest AS production

WORKDIR /app

# Copiar dist e package.json da etapa builder
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package.json /app/

# Instalar só dependências de produção
RUN bun install --production

# Comando padrão para rodar o servidor
ENTRYPOINT ["bun", "run", "dist/index.js"]
