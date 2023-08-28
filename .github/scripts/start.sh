#! /bin/bash

echo "change directory"
cd /home/ubuntu
echo "check directory"
ls -al
# re install Dependency
echo "re install Dependency"
npm i
# generate prisma client
echo "generate prisma client"
npx prisma generate
echo "Deploying prisma..."
npx prisma migrate deploy
pm2
echo "Starting server..."
npm run start:prod
