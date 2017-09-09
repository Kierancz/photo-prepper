var fs = require('fs');
var glob = require('glob');
var path = require('path');
//var helpers = require('./utils');
var sizeOf = require('image-size');
var formatJSON = require('format-json');
var mkdirp = require('mkdirp');
var sharp = require('sharp');

var folder = "images/";


function getSize(photoPath) {
  sizeOf(photoPath, function (err, dimensions) {
    console.log(dimensions.width, dimensions.height);
  });
} 

function getImgInfos(photoFiles) {
  var images[];

  photoFiles.forEach(function (file) {
    var width = sizeOf(file).width;
    var height = sizeOf(file).height;

    // Push image data into our array
    images.push({
      name: file.substr(file.lastIndexOf('/') + 1),
      width: width,
      height: height,
      path: file
    });
  });

  return images;
}

function resize(file, width, height, name) {
  sharp(file)
    .resize(width, height)
    .toFile(name, function(err) { console.log(err) })
    .then( data => console.log(data) return data)
    .catch( err => console.log(err));
}



// helper functions

function write(filepath, data, callback) {
  mkdirp(path.dirname(filepath), function (err) {
    if (err) {
      throw err;
    }
    fs.writeFile(filepath, data, function (err) {
      if (err) {
        throw err;
      }
      if (callback) {
        callback(null, filepath);
      } else {
        console.log('File ' + filepath + ' successfully created.');
      }
    });
  });
};