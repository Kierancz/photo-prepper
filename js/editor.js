var imageExport = require('image-size');

var folder = "images/";

var sizeOf = require('image-size');
sizeOf('images/funny-cats.png', function (err, dimensions) {
  console.log(dimensions.width, dimensions.height);
});

$.ajax({
    url : folder,
    success: function (data) {
        $(data).find("a").attr("href", function (i, val) {
            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                $("body").append( "<img src='"+ folder + val +"'>" );
            } 
        });
    }
});


function getSize(photoPath) {

} 

function getPhotos(photoFolder) {

  $.ajax({
    type: 'GET',
    url: '/my/url', //folder
    success: function(resp) {

    },
    error: function() {

    }
  });

  var request = new XMLHttpRequest();
  request.open('GET', 'photoFolder', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var resp = request.responseText;
    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

}