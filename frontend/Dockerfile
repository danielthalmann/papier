FROM node:21

RUN npm install -g npm

COPY docker/entrypoint.sh /

RUN mkdir -p /opt/app && chmod 777 /entrypoint.sh

WORKDIR /opt/app

VOLUME /opt/app

EXPOSE 3000

ENV APP_ENV=prod

ENTRYPOINT "/entrypoint.sh"
