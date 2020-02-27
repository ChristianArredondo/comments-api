ARG PORT=8080

FROM node:9.11.1-alpine
ARG PORT
ENV APP="/opt/comments-api" \
    LOG_PATH="/var/logs/comments-api" \
    NODE_ENV="dev"

COPY ./dist $APP
WORKDIR $APP
RUN mkdir -p $LOG_PATH && npm install

EXPOSE $PORT
CMD ["node", "./main.js"]
