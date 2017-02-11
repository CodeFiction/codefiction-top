FROM node:7.3-alpine
ENV HOME /var/opt/codefiction-top/

EXPOSE 80
RUN mkdir $HOME

WORKDIR $HOME
RUN apk add --no-cache make gcc g++ python
RUN npm install -g angular-cli@latest

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh