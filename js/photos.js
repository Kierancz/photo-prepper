var imgFolder = "./imgs/";

$(document).ready(function(){  
  //appendImages(imgFolder); 

  // get photos from input field
  document.getElementById('file-input').addEventListener('change', readAndAppendImgs, false);

});

function readAndAppendImgs(evt) {
  //Retrieve all the files from the FileList object
  var files = evt.target.files; 

  // read and append photos
  if (files) {
    for (var i=0, f; f=files[i]; i++) {
      var r = new FileReader();
      r.onload = (function(f) {
        return function(e) {
          var contents = e.target.result;
          console.log("file name: ", f.name);
          $('#photo-items').append('<img src="'+imgFolder+f.name+'"/>');
        };
      })(f);

      r.readAsText(f);
    }   
  } else {
    alert("Failed to load files"); 
  }
}

function justifiedInit() {
  $('.photo-items').empty().justifiedImages({
    images : photos,
    rowHeight: 200,
    maxRowHeight: 400,
    thumbnailPath: function(photo, width, height){
        var purl = photo.url_s;
        if( photo.url_n && (width > photo.width_s * 1.2 || height > photo.height_s * 1.2) ) purl = photo.url_n;
        if( photo.url_m && (width > photo.width_n * 1.2 || height > photo.height_n * 1.2) ) purl = photo.url_m;
        if( photo.url_z && (width > photo.width_m * 1.2 || height > photo.height_m * 1.2) ) purl = photo.url_z;
        if( photo.url_l && (width > photo.width_z * 1.2 || height > photo.height_z * 1.2) ) purl = photo.url_l;
        return purl;
    },
    getSize: function(photo){
        return {width: photo.width_s, height: photo.height_s};
    },
    margin: 1
});
}


function sortableInit() {
  var photoList = document.getElementById('photo-items');
  var sortable = Sortable.create(photoList);
}
