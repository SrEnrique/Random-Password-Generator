FROM node:12.18.1


ENV NODE_ENV=production


WORKDIR /app
COPY ./randomPasswordGenerator ./


RUN npm install --production


COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]
