#!/usr/bin/env sh

#Install client dependencies
echo "Installing  dependencies"
npm install

echo "Building angular app"
ng build --aot

echo "Starting server ..."
#npm start
nodemon --exec ./node_modules/.bin/ts-node -- ./server.ts