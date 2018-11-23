document.getElementById('myForm').addEventListener('submit', savePlan);

// sae from submitting
function savePlan(e){

//get form values
var title =document.getElementById('title').value;
var time =document.getElementById('time').value;
var place =document.getElementById('place').value;
var day =document.getElementById('day').value;

if(!validateTime(time, title, place, day)){
  return false;
}

var plan = {
  titleMeeting: title,
  placeMeeting: place,
  timeMeeting: time,
  dayMeeting: day
}
if (localStorage.getItem('bookmarks')===null) {
  var bookmarks=[];
  bookmarks.push(plan);
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
else {
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  bookmarks.push(plan);

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}fetchPlans();
  //prevent form from submitting
  e.preventDefault();
}

//delete time function//
function deletePlan(time) {
  //get time
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through time
for (var i = 0; i < bookmarks.length; i++) {
  if(bookmarks[i].timeMeeting == time){
    //remove from array
    bookmarks.splice(i,1);
  }
}
localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
fetchPlans();}

function fetchPlans(){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//get output id//
var planResults = document.getElementById('planResults');


planResults.innerHTML = '';
for (var i = 0; i < bookmarks.length; i++) {
  var title = bookmarks[i].titleMeeting;
  var place = bookmarks[i].placeMeeting;
  var time = bookmarks[i].timeMeeting ;
  var day = bookmarks[i].dayMeeting;

  planResults.innerHTML += '<div class="border border-warning">'+
                                '<h2>'+title+
                                '</h2>'+
                                '<h4>'+place+
                                '</h4>'+
                                '<h5>'+day+
                                '</h5>'+
                                '<h5>'+time+
                                ' <a onclick="deletePlan(\''+time+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h5>'+
                                '</div>';
}
}
//validate time
function validateTime(time, title, place, day) {
  if (!time || !title || !place || !day) {
    alert('Please fill in the form');
    return false;
  }

  var reg = new RegExp(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/);


  if (!time.match(reg)) {
    alert('Please use the proper format for time (HH:MM)');
    return false;}
return true;
}
