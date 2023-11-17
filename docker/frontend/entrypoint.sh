#!/bin/bash
cd /opt/app
npm install
if [ "$APP_ENV" == "dev" ]; then
    echo "developpement\n"
    npm run dev
else
    echo "production\n"
    npm run start
fi
