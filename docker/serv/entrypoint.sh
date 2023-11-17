#!/bin/bash
cd /opt/app
npm install
if [ "$APP_ENV" == "dev" ]; then
    echo "developpement\n"
    npm run start:dev
else
    echo "production\n"
    npm run start
fi
#npx prisma migrate deploy
#node dist/src/main.js