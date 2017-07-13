var structure = [{
  "date": new Date(99, 5, 24, 11, 33, 30, 0),
  "description" : "Image Classifier for a machine learning project",
  "name": "Image Classifier",
  "id": "img_classify",
  "folder_name": "Image Classifier",
  "filename": "faces.html",
  "image" : "/images/la.jpg",
  "category" : "Machine Learning"
}, {
  "date": new Date(2000, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg",
  "category" :"Classic Games"
}, {
  "date": new Date(2001, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg",
  "category" :"Classic Games"
}, {
  "date": new Date(2010, 5, 24, 11, 33, 30, 0),
  "description" : "Simple Tetris Game made using Javascript and p5.js",
  "name": "Tetris",
  "id": "tetris",
  "folder_name": "Tetris",
  "filename": "tetris.html",
  "image" : "/images/tetris.jpg",
  "category" :"Classic Games"
}];

var page = 0;

structure.sort(function(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
});

var filterVal;

function filtDate(ele) {
  return (ele.date == filterVal);
}

function filtCategory(ele){
  return (ele.category == filterVal);
}

function createCallbackCat(t){
  return function(){
    filterVal = t;
    page = 0;
    structure = structure.filter(filtCategory);
    populate(structure);
  }
}

function createCallbackDate(t){
  return function(){
    filterVal = t;
    page = 0;
    structure = structure.filter(filtDate);
    populate(structure);
  }
}
function populate(struct) {
  //remove current elements if any
  var myNode = document.getElementById("blog_frame");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }


  var dRow, dCol1, dCol2, dThumb, dImg, dH, dP, dA;
  console.log(struct);
  for(var i = page * 12; i < page*12 + 12 && i < struct.length; ++i){
    dRow = document.createElement("DIV");
    dRow.className = "row text-center";
    document.getElementById("blog_frame").appendChild(dRow);

    dCol1 = document.createElement("DIV");
    dCol1.className = "col-sm-4";
    dRow.appendChild(dCol1);

    dP = document.createElement("P");
    dP.appendChild(document.createTextNode(struct[i].category));
    dP.style.textAlign = "left";

    dA = document.createElement("A");
    dA.href = "#";
    dCol1.appendChild(dA);
    dA.appendChild(dP);
    
   $(dP).click(createCallbackCat(struct[i].category));

    dThumb = document.createElement("DIV");
    dCol1.appendChild(dThumb);
    dThumb.className = "thumbnail";

    dImg = document.createElement("IMG");
    dImg.src = struct[i].image;
    dThumb.appendChild(dImg);

    dCol2 = document.createElement("DIV");
    dCol2.className = "col-sm-8";
    dRow.appendChild(dCol2);


    dA = document.createElement("A");
    dA.href = "#";
    dCol2.appendChild(dA);
    dP = document.createElement("P");
    dP.appendChild(document.createTextNode(struct[i].date.toDateString()));
    dP.style.textAlign = "right";

   $(dP).click(createCallbackDate(struct[i].date));

    dA.appendChild(dP);

    dA = document.createElement("A");
    dCol2.appendChild(dA);

    dH = document.createElement("H3");
    dA.href = "/blogs/" + struct[i].folder_name + "/" + struct[i].filename;
    dH.appendChild(document.createTextNode(struct[i].name));
    dA.appendChild(dH);
    $(dRow).hide();
    $(dRow).fadeIn(2000);
  }
}


function prevPage(){
  if(page > 0){
    $('#prev').removeClass('disabled'); 
  }
  if(((page+1) * 12 <= structure.length))
    $('#next').removeClass('disabled'); 
  if(page != 0){ page--;
     populate(structure);
  }
  else {
    $('#prev').addClass('disabled');
  }
 
}

function nextPage(){
  if(page > 0){
    $('#prev').removeClass('disabled'); 
  }
  if(((page+1) * 12 <= structure.length))
    $('#next').removeClass('disabled'); 
  if((page+1) * 12 > structure.length){
    $('#next').addClass('disabled');
  }
  else{
    page++;
     populate(structure);
  }
}