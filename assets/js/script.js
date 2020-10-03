$(document).ready(function () {

  //Declare variables
  var hour = [9, 10, 11, 12, 13, 14, 15, 16, 17]
  var displayHour = ["9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"]

  //Object of schedule data
  var schedulerObj = {
    hour9: "",
    hour10: "",
    hour11: "",
    hour12: "",
    hour13: "",
    hour14: "",
    hour15: "",
    hour16: "",
    hour17: "",
  }

  //Overrides array data if there is any in local storage
  var schedulerStorage = localStorage.getItem("schedulerObj")
  if (schedulerStorage !==null){
    schedulerObj = JSON.parse(schedulerStorage)
  }

  //Set current day
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"))

  //Build the calendar
  function buildPage(){
    //Loop through creating each hour on the scheduler
    for (i=0; i < hour.length; i++ ){
      var propName = "hour" + hour[i];
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
      var descriptionCol = $("<textarea>")
      descriptionCol.addClass("description col-10")
      newDiv.append(descriptionCol)

      // populate text with local storage if present
      if (schedulerObj[propName]){
        descriptionCol.text(schedulerObj[propName])
      }

      //Create a new 1 col div for save button
      var saveCol = $("<button>")
      saveCol.addClass("saveBtn col-1")
      saveCol.text("Save")
      newDiv.append(saveCol)
    }
    updateHour();
  }

  //Update colors based on current time
  function updateHour(){
    var currentTime = moment().hours()
    console.log(currentTime)
    $(".time-block").each(function(){

      divTime = $(this).attr("value");

      if (divTime < currentTime){
        $(this).addClass("past")
      } if (divTime == currentTime){
        $(this).removeClass("past")
        $(this).addClass("present")
      } if (divTime > currentTime){
        $(this).removeClass("past")
        $(this).removeClass("present")
        $(this).addClass("future")
      }

    })
}

//Builds the page on page load
buildPage();

//Saves to local storage if user clicks Save
$(".saveBtn").on("click", function(){
  value = $(this).siblings(".description").val();
  key = $(this).parent().attr("id");

  schedulerObj[key] = value;
  saveToLocalStorage();
})

//Saves to local storag eand stringifies
function saveToLocalStorage(){
  localStorage.setItem("schedulerObj", JSON.stringify(schedulerObj))
}

});