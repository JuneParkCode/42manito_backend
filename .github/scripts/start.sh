#! /bin/bash

echo "change directory"
cd /home/ubuntu
echo "check directory"
ls -al
# generate prisma client
echo "generate prisma client"
npx prisma generate
echo "Deploying prisma..."
npx prisma migrate deploy
echo "Starting server..."
npm run start:prod
