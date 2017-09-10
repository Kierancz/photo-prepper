var http = require('http');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var sizeOf = require('image-size');
var formatJSON = require('format-json');
var mkdirp = require('mkdirp');
var sharp = require('sharp');
var formidable = require('formidable');
var util = require('util');

// setup server and forms
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});

function displayForm(res) {
    fs.readFile('form.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in the data store.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}

function processFormFieldsIndividual(req, res) {
    // Store the data from the fields in the data store.
    var fields = [];
    var form = new formidable.IncomingForm();
    //Call back when each field in the form is parsed.
    form.on('field', function (field, value) {
        console.log(field);
        console.log(value);
        fields[field] = value;
    });
    // Call back when each file in the form is parsed.
    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
        fields[name] = file;
        //Storing the files meta in fields array.
    });

    //Call back for file upload progress.
    form.on('progress', function (bytesReceived, bytesExpected) {
        var progress = {
            type: 'progress',
            bytesReceived: bytesReceived,
            bytesExpected: bytesExpected
        };
        console.log(progress);
        // Logging the progress on console.
        // ToDo send to client for visual feedback
    });

    // Call back at the end of the form.
    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));
    });
    form.parse(req);
}

server.listen(1185);
console.log("server listening on 1185");



// photo functions
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