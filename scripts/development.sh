#!/usr/bin/env bash

cd packages/splitio-cache
rm -rf src/
rm -rf node_modules/
npm install
npm link
npm run watch &
npm run watch-test &
cd -

cd packages/splitio-engine
rm -rf src/
rm -rf node_modules/
npm install
npm link
npm run watch &
npm run watch-test &
cd -

cd packages/splitio
rm -rf src/
rm -rf node_modules/
npm install
npm link
npm run watch &
npm run watch-test &
cd -
