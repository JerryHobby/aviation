#!/bin/zsh
git restore package-lock.json
git pull
npm i
npm update
npx prisma generate client
npm run build
pm2 restart aviation

