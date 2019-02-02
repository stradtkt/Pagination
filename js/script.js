/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
(function() {
   'use strict';
   // global variables 
   var studentItems = $('.student-item');
   var pagination = "<div class='pagination'><ul></ul></div>";
   var studentList = pages(studentItems);


////////////////////////////////////////////////////////
//Search bar
////////////////////////////////////////////////////////

    var studentSearch = '<div class="student-search"><input id="searchName" placeholder="Search Students"/><button id="submit">Search</button></div>';
    $('.page-header.cf').append(studentSearch);
    function search() {
       // get the val of the search item then lowercase the result then trim it to remove whitespace
       var searchItem = $('#searchName').val().toLowerCase().trim();
       var filterStudents = studentItems.filter(function(i) {
          // find the email or name from the list of students
          var email = $(this).find('.email').text();
          var name = $(this).find('h3').text();
          if (name.indexOf(searchItem) > - 1 || email.indexOf(searchItem) > - 1) {
             return true;
          } else {
             return false;
          }
       });

       if(filterStudents.length === 0) {
          $('.page-header h2').text("Sorry there are no results");
       } else {
          $('.page-header h2').text("Students searched");
       }
       var students = pages(filterStudents);
       $('.pagination').remove();
       if(filterStudents.length >= 10) {
          appendButtons(students);
       }
       showPages(0, students);
    }
/**************************************************************************************************************************************************************************************************************** */

////////////////////////////////////////////////////
//Pagination
////////////////////////////////////////////////////
// the pages for the application
function pages(list) {
   var oldList = list.slice();
   var pagesArray = [];
   while(oldList.length) {
      pagesArray.push(oldList.splice(0, 10));
   }
   return pagesArray;
}
// showing the correct page out of the pagelist
function showPages(pageNumber, pageList) {
   $('.student-list li').hide();
   $.each(pageList, function(index, page) {
      if(pageNumber === index) {
         $.each(page, function(i, listItem) {
            $(listItem).fadeIn('fast');
         });
      }
   });
}

function appendButtons(pageList) {
   // append the list
   $('.page').append(pagination);
   var numPages = pageList.length;
   for(var i = 1; i <= numPages; i++) {
      var buttons = '<li><a href="#">'+ i +'</a></li>';
      // append the list item that are the buttons for the pagination
      $('.pagination ul').append(buttons);
   }
   // add an active class to the page the user is on
   $('.pagination ul li a').first().addClass('active');
   $('.pagination ul li a').on('click', function(event) {
      var pageSelection = parseInt($(this)[0].text) - 1;
      showPages(pageSelection, pageList);
      // onclick removes the active class from the previous and then sets it to the new item
      $('.pagination ul li a').removeClass();
      $(this).addClass('active');
      event.preventDefault();
   });
}

//calling the function appendBtns which provides the correct amount of buttons for the amount of items that are in the studentList
appendButtons(studentList);
//calling the showPages function starting at the zero index and then displays the next 10 results from the studentList
showPages(0, studentList);
//calls the search function when the button is clicked
$('.student-search').find('button').on('click', search);
$('.student-search').find('input').keyup(search);
})();