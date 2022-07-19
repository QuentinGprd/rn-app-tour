#! /bin/bash
PACKAGE_VERSION=$(npm pkg get version | sed 's/"//g')
echo $PACKAGE_VERSION
npm run build
npm pack --pack-destination ~
cd ./Example
npm uninstall rn-app-tour
npm install file:~/rn-app-tour-$PACKAGE_VERSION.tgz