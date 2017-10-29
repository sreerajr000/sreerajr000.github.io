var structure = [{
  "date": new Date(2017, 7, 14, 11, 33, 30, 0),
  "description" : "The Perfect Villain",
  "name": "The Perfect Villain",
  "id": "the_perfect_villain",
  "folder_name": "Villain",
  "filename": "theperfectvillain.html",
  "image" : "/images/la.jpg",
  "category" : "Character Review"
},
{
  "date": new Date(2017, 3, 26, 11, 33, 30, 0),
  "description" : "Daily Blog #1",
  "name": "Daily Blog #1",
  "id": "daily_blog_1",
  "folder_name": "dailyblogs",
  "filename": "1.html",
  "image" : "/images/la.jpg",
  "category" : "Daily Blogs"
},
{
  "date": new Date(2017, 3, 27, 11, 33, 30, 0),
  "description" : "Daily Blog #2",
  "name": "Daily Blog #2",
  "id": "daily_blog_2",
  "folder_name": "dailyblogs",
  "filename": "2.html",
  "image" : "/images/la.jpg",
  "category" : "Daily Blogs"
},
{
  "date": new Date(2017, 3, 28, 11, 33, 30, 0),
  "description" : "Daily Blog #3",
  "name": "Daily Blog #3",
  "id": "daily_blog_3",
  "folder_name": "dailyblogs",
  "filename": "3.html",
  "image" : "/images/la.jpg",
  "category" : "Daily Blogs"
},
{
  "date": new Date(2017, 3, 29, 11, 33, 30, 0),
  "description" : "Daily Blog #4",
  "name": "Daily Blog #4",
  "id": "daily_blog_4",
  "folder_name": "dailyblogs",
  "filename": "4.html",
  "image" : "/images/la.jpg",
  "category" : "Daily Blogs"
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
