#! /bin/bash
PACKAGE_VERSION=$(npm pkg get version | sed 's/"//g')
echo $PACKAGE_VERSION
rm -f ./Example/rn-app-tour-$PACKAGE_VERSION.tgz
yarn build
npm pack --pack-destination ./Example
cd ./Example
yarn remove rn-app-tour
yarn cache clean
# see https://github.com/yarnpkg/yarn/issues/5357
CACHE_DIR=$(yarn cache dir)
echo $CACHE_DIR
rm -rf $CACHE_DIR
yarn add file:rn-app-tour-$PACKAGE_VERSION.tgz