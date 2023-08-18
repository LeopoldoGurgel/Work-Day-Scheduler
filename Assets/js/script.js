// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
// HTML elements declarations
var dateTimeEl = $("#dateTime");
var tasksLS = JSON.parse(localStorage.getItem("tasks")) || [];
// $("*div[id*='hour']").addClass(" present");
setTask();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // MY NOTES
  // Found out about this cool attribute*=anything in which you select every
  // HTML tag containing an specific text piece. For example, The divs in my 
  // HTML all contain an ID of hour- + a number. With this method, I can select
  // Every Div tag with an ID containing "hour" in it. That same way, I'll sellect
  // all my buttons with a class of saveBtn. It's not necessary, since I don't have 
  // other buttons. But I'll do it for learning purposes.
  // localStorage.setItem("tasks", JSON.stringify([]));
    $("*button[class*='saveBtn']").on("click", function(event){
      event.preventDefault();

      var taskId = $(this).parent().attr("id");

      taskId = {
        id: $(this).parent().attr("id"),
        time: dayjs().format("DD/MM/YYYY, HH:mm:ss"),
        task: $(this).parent().children()[1].value,
      }

      tasksLS.push(taskId);
      localStorage.setItem("tasks", JSON.stringify(tasksLS));
      setTask();
    })
  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

    function timeComparison() {
      for(var i = 9; i <= 17; i++){
        var hourId = "hour-" + i;
        var hourDivEl = $("#" + hourId);

        if(dayjs().format("HH") == i){
          hourDivEl.addClass(" present")
        }else if(dayjs().format("HH") < i){
          hourDivEl.addClass(" future")
        }else{
          hourDivEl.addClass(" past")
        }}}
    timeComparison();
    setInterval(timeComparison, 60000);
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
 function setTask(){     
  for(var i = 0; i<tasksLS.length; i++){
      var task = tasksLS[i];
      // this find() method is also another cool way to select a tag
      // by an attribute. By this, I'm selecting the tags with a class of 
      // description. in this case, the text areas.
      var taskEl = $("#" + task.id).find(".description");
      console.log(taskEl);
      if (taskEl.length>0) {
        var taskText = task.time + " - " +task.task;
        // this \n add a new line and it's a vanilla JS feature :D
        taskEl.val(taskText);
      }


    // function setText() {
    //   if (tasksLS[i].id === $(this).parent().attr("id")) {
    //     $(this).parent().text(tasksLS[i].time + " - " + tasksLS[i].task);
    //   }
    // }
    // setText.call($("#" + tasksLS[i].id + " textarea")[0]);
  }
    }
  
  //
  // TODO: Add code to display the current date in the header of the page.
      setInterval(function() {
        var currentDate = dayjs().format("DD/MM/YYYY");
        var currentTime = dayjs().format("hh:mm:ss");
        var weekDay = dayjs().format("dddd");
        dateTimeEl.text("Today is " + weekDay+ ", " + currentDate + " and it's exactly " + currentTime);
        }, 1000);
      });
