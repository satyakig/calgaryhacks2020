const cp = require('shelljs').cp;

cp('app.yaml', 'build/');
cp('package.json', 'build/');
cp('package-lock.json', 'build/');
cp('-R', 'node_modules/', 'build/');
