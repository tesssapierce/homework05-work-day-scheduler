$(document).ready(function () {

//Declare variables
var hour = [9, 10, 11, 12, 13, 14, 15, 16, 17]
var displayHour = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

//Loop through creating each hour on the scheduler
for (i=0; i < hour.length; i++ ){
  //Create a new Div for the time block element
  var newDiv = $("<div>");
  newDiv
    .addClass("row time-block")
    .attr('id', "hour" + hour[i])
    .attr("value", hour[i])
  $(".container").append(newDiv)

  //Create a new 1 col div for time
  var timeCol = $("<div>");
  timeCol
    .addClass("hour col-1")
    .text(displayHour[i])
  newDiv.append(timeCol)

  //Create a new 10 col div for description
  var descriptionCol = $("<div>")
  descriptionCol.addClass("description col-10")
  newDiv.append(descriptionCol)

  //Create a new 1 col div for save button
  var saveCol = $("<div>")
  saveCol.addClass("saveBtn col-1")
  newDiv.append(saveCol)
}

function updateHour(){
  var currentTime = moment().hours()
  divTime = $(".time-block").val()
  
  $(".time-block").each(function(){

    if (divTime < currentTime){
      $(this).addClass("past")
    } if (divTime == currentTime){
      $(this).addClass("present")
    } if (divTime > currentTime){
      $(this).addClass("future")
    }

  })
}

updateHour();

});

//DONE: 
//Build divs
//Build columns
//Populate with hour on left column (1 col)
//Populate with text area in middle columns (10 cols)
//Populate with save on right column (1 col)

//TODO: 
//Change formatting by checking current time against time of div element
//Make save button clickable
//Save any text area to local storage