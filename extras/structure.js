var structure = [{
  "date": new Date(2017, 7, 16, 11, 33, 30, 0),
  "description" : "Breadth First Search Algorithm in a graph",
  "name": "BFS",
  "id": "bfs",
  "folder_name": "Competitive Programming",
  "filename": "bfs.html",
  "image" : "/images/bfs.jpg"
},{
  "date": new Date(2017, 7, 17, 11, 33, 30, 0),
  "description" : "Depth First Search Algorithm in a graph",
  "name": "DFS",
  "id": "dfs",
  "folder_name": "Competitive Programming",
  "filename": "dfs.html",
  "image" : "/images/dfs.jpg"
},{
  "date": new Date(2017, 7, 18, 11, 33, 30, 0),
  "description" : "Dijkstra's Algorithm for finding shortest path in a graph",
  "name": "Dijkstra",
  "id": "dijkstra",
  "folder_name": "Competitive Programming",
  "filename": "dijkstra.html",
  "image" : "/images/dijkstra.jpg"
}];

var page = 0;

structure.sort(function(a, b) {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
});

function populate() {
  var myNode = document.getElementById("extra_frame");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }
  var dRow, dCol, dThumb, dImg, dButton,dP;
  for(var i = page * 12; i < page*12 + 12 && i < structure.length; ++i) {
    if ((i) % 3 == 0) {
      dRow = document.createElement("DIV");
      dRow.className = "row text-center";
      document.getElementById("extra_frame").appendChild(dRow);
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
    dButton.id = i;
    //dButton.onclick = function() { loadFrame(structure[i]); };
    $(dButton).on('click', function (e) { loadFrame(this.id); });
    dButton.className = "btn";

    $(dRow).hide();
    $(dRow).fadeIn(2000);
  }

}


function loadFrame(id){	
  window.location = "/extras/" + structure[id].folder_name + "/" + structure[id].filename;
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