$(document).ready(function() {
    // Get current day and time
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm a");
    $("#currentDay").text(currentDate);
  
    // Define business hours
    var businessHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
  
    // Create timeblocks for each hour of the business day
    for (var i = 0; i < businessHours.length; i++) {
      var hour = businessHours[i];
      var timeblock = $("<div>").addClass("row time-block");
      var hourBlock = $("<div>")
        .addClass("col-sm-1 hour")
        .text(hour + ":00");
      var textArea = $("<textarea>")
        .addClass("col-sm-10 description")
        .attr("id", "hour-" + hour);
      var saveBtn = $("<button>")
        .addClass("col-sm-1 saveBtn fas fa-save")
        .attr("data-time", hour);
  
      // Check if the current hour is past, present, or future
      if (hour < moment().hour()) {
        textArea.addClass("past");
      } else if (hour === moment().hour()) {
        textArea.addClass("present");
      } else {
        textArea.addClass("future");
      }
  
      // Get saved event for each hour from local storage
      var savedEvent = localStorage.getItem("hour-" + hour);
      if (savedEvent) {
        textArea.text(savedEvent);
      }
  
      // Append hour, text area, and save button to the timeblock
      timeblock.append(hourBlock, textArea, saveBtn);
      $(".container").append(timeblock);
    }
  
    // Save the event to local storage when the save button is clicked
    $(".saveBtn").on("click", function() {
      var time = $(this).attr("data-time");
      var event = $("#hour-" + time).val();
      localStorage.setItem("hour-" + time, event);
    });
  });
  