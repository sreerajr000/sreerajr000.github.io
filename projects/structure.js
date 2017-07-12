var structure = [{
  "date": new Date(99, 5, 24, 11, 33, 30, 0),
  "description" : "Image Classifier for a machine learning project",
  "name": "Image Classifier",
  "id": "img_classify",
  "folder_name": "Image Classifier",
  "filename": "faces.html",
  "image" : "/images/la.jpg"
}, {
  "date": new Date(2000, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg"
}, {
  "date": new Date(2001, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg"
}, {
  "date": new Date(2010, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg"
}];



structure.sort(function(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
});

function populate() {
  var dRow, dCol, dThumb, dImg, dButton,dP;
  for (var i = 0; i < structure.length; ++i) {
    if ((i) % 3 == 0) {
      dRow = document.createElement("DIV");
      dRow.className = "row text-center";
      document.getElementById("project_frame").appendChild(dRow);
    }
    dCol = document.createElement("DIV");
    dCol.className = "col-sm-4";
    dRow.appendChild(dCol);

    dThumb = document.createElement("DIV");
    dCol.appendChild(dThumb);
    dThumb.className = "thumbnail";

    dImg = document.createElement("IMG");
    dImg.src = structure[i].image;
    dThumb.appendChild(dImg);

    dP = document.createElement("P");
    dP.appendChild(document.createTextNode(structure[i].description));
    dThumb.appendChild(dP);

    dButton = document.createElement("BUTTON");
    dThumb.appendChild(dButton);
    dButton.appendChild(document.createTextNode(structure[i].name));
    dButton.className = "btn";
  }

}