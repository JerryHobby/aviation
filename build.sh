#!/bin/zsh

cd ~/source/aviation

echo "###############################################"
echo git restore package-lock.json

git restore package-lock.json
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo git pull

git pull
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo npm i

npm i
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo npm update

npm update
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo npx prisma generate client

npx prisma generate client
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo npm run build

npm run build
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi

echo "###############################################"
echo pm2 restart aviation

pm2 restart aviation
if [ $? -ne 0 ]; then
          echo $? was returned.
          exit
fi
