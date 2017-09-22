var imgFolder = "./imgs/";

$(document).ready(function(){  
  //appendImages(imgFolder); 

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

  // get photos from input field
  document.getElementById('file-input').addEventListener('change', readAndAppendImgs, false);

});

function sortableInit() {
  var photoList = document.getElementById('photo-items');
  var sortable = Sortable.create(photoList);
}
