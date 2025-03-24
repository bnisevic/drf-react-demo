FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]

# npm run build + serve -s build for a production-ready static build
