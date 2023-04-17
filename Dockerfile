FROM node:16.3.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY . ./
RUN ls -a
RUN npm install --production=true 
RUN npm run build
EXPOSE 3000
CMD ["npm","run","start"]