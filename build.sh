#!/bin/zsh

cd ~/source/aviation

echo "###############################################"
git restore package-lock.json
if [ $? -ne 0 ]; then
          echo $? was returned by: git restore package-lock.json.
          exit
fi

echo "###############################################"
git pull
if [ $? -ne 0 ]; then
          echo $? was returned by: git pull.
          exit
fi

echo "###############################################"
npm i
if [ $? -ne 0 ]; then
          echo $? was returned by: npm i.
          exit
fi

echo "###############################################"
npm update
if [ $? -ne 0 ]; then
          echo $? was returned by: npm update.
          exit
fi

echo "###############################################"
npx prisma generate client
if [ $? -ne 0 ]; then
          echo $? was returned by: npx prisma generate client.
          exit
fi

echo "###############################################"
npm run build
if [ $? -ne 0 ]; then
          echo $? was returned by: npm run build.
          exit
fi

echo "###############################################"
pm2 restart aviation
if [ $? -ne 0 ]; then
          echo $? was returned by:pm2 restart aviation.
          exit
fi
