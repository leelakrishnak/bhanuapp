const fs = require('fs');
const path = require('path');

module.exports.getAllFiles = function (dirPath) {
  const files = fs.readdirSync(dirPath);

  let arrayOfFiles = [];

  files.forEach(function (file) {
    if (!file.startsWith('.')) {
      const stats = fs.statSync(dirPath + '/' + file);

      arrayOfFiles.push({
        name: file,
        isDir: stats.isDirectory(),
        path: dirPath + file + '/',
        createdOn: stats.birthtime,
        size: stats.size,
      });
    }
  });

  return arrayOfFiles;
};
