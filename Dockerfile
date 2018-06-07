FROM node:7.3-alpine
ENV HOME /var/opt/codefiction-top/

EXPOSE 4200
RUN mkdir $HOME

WORKDIR $HOME
RUN apk add --no-cache make gcc g++ python
RUN npm install -g angular-cli@latest nodemon

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh