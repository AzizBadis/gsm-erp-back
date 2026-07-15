FROM node:20-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 3021

CMD ["npm", "run", "start:dev"]
