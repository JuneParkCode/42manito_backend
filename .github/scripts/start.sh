#! /bin/bash

echo "change directory"
cd /home/ubuntu
echo "check directory"
ls -al
# re install Dependency
echo "re install Dependency"
npm uninstall prisma @prisma/client --no-save >> install.log
npm i >> install.log
# generate prisma client
echo "generate prisma client"
npx prisma generate >> install.log
echo "Deploying prisma..."
npx prisma migrate deploy >> install.log
pm2
echo "Starting server..."
npm run start:prod
