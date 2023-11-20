#!/bin/zsh
git restore package-lock.json
echo git restore RC= $?

git pull
echo git pull RC= $?

npm i
echo npm i RC= $?

npm update
echo npm update RC= $?

npx prisma generate client
echo npx prisma generate client RC= $?

npm run build
echo npm run build RC= $?

pm2 restart aviation
echo pm2 restart RC= $?

