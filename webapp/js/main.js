$(document).ready(function () {
    console.log("Document ready is called");

	// Trigger the below ajax call to Tastypie API to get the books 
    fetchPopularBooks();
    fetchNewReleaseBooks();
    fetchAdultBooks();
    fetchChildrenBooks();
    fetchComicBooks();
    fetchHistoryBooks();
    fetchRomanceBooks();
    fetchPoetryBooks();
    fetchMysteryBooks();
	fetchRecommendations();
	
	// Below function triggers the searchBooks ajax call on keyup operation on search field
	$('#search').keyup(function(event) {
		console.log("Search is called");
        $('#result').html('');
		searchBooks();
        $('#state').val('');
        var searchField = $('#search').val();
        var expression = new RegExp(searchField, "i");
        
    });
});

// Below AJAX function calls Tastypie RESTful API with the POST request for rating
function createReview(bookID, rating){    
	/*Cookies https://www.tutorialspoint.com/javascript/javascript_cookies.htm */
    var allcookies = document.cookie;
               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name == "user_id") {
					  var userId = value;
					  console.log("User Id:" + userId)
				  }
        }
	
	// UUID generation Reference link : https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
	function create_reviewID(){
    var dt = new Date().getTime();
    var reviewID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return reviewID;
	}
	
	// POST request body for review
	var formData = {
      userID : userId,
      bookID :  bookID,
      rating :  rating,
	  reviewID : create_reviewID()
    }
    $.ajax({
		type : "POST",
		contentType : "application/json",
		url : "http://localhost:8000/api/reviews/",
		data : JSON.stringify(formData),
		dataType : 'json',
		success : function(result) {
		  console.log(result);
		},
		error : function(e) {
		  console.log("ERROR: ", e);
		}  
  });
}

// Below AJAX function calls Tastypie RESTful API with the search criteria as query parameter
function searchBooks() {
	var x = document.getElementById("sectionSearchResult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
	var searchField = $('#search').val();	
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?limit=5&title__contains="+searchField,
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='"+value.book_id+"_5' name='"+value.book_id+"' value='5' /><label for='"+value.book_id+"_5' title='it was amazing'></label><input type='radio' id='"+value.book_id+"_4' name='"+value.book_id+"' value='4' /><label for='"+value.book_id+"_4' title='really liked it'></label><input type='radio' id='"+value.book_id+"_3' name='"+value.book_id+"' value='3' /><label for='"+value.book_id+"_3' title='liked it'></label><input type='radio' id='"+value.book_id+"_2' name='"+value.book_id+"' value='2' /><label for='"+value.book_id+"_2' title='it was ok'></label><input type='radio' id='"+value.book_id+"_1' name='"+value.book_id+"' value='1' /><label for='"+value.book_id+"_1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");
            $("#result").empty();
            $("#result").append(items);
            console.log("SUCCESS : ", data);
        },

        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request with high ratings and rating count
function fetchPopularBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?order_by=-ratings_count&average_rating=5&limit=5",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='"+value.book_id+"_5' name='"+value.book_id+"' value='5' onclick='createReview("+value.book_id+",5)'/><label for='"+value.book_id+"_5' title='it was amazing'></label><input type='radio' id='"+value.book_id+"_4' name='"+value.book_id+"' value='4' onclick='createReview("+value.book_id+",4)'/><label for='"+value.book_id+"_4' title='really liked it'></label><input type='radio' id='"+value.book_id+"_3' name='"+value.book_id+"' value='3' onclick='createReview("+value.book_id+",3)'/><label for='"+value.book_id+"_3' title='liked it'></label><input type='radio' id='"+value.book_id+"_2' name='"+value.book_id+"' value='2' onclick='createReview("+value.book_id+",2)'/><label for='"+value.book_id+"_2' title='it was ok'></label><input type='radio' id='"+value.book_id+"_1' name='"+value.book_id+"' value='1' onclick='createReview("+value.book_id+",1)'/><label for='"+value.book_id+"_1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#popularBooks").empty();
            $("#popularBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request with latest publication year
function fetchNewReleaseBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: " http://localhost:8000/api/books/?limit=5&publication_year=2019.0",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#newReleaseBooks").empty();
            $("#newReleaseBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

/*Cookies https://www.tutorialspoint.com/javascript/javascript_cookies.htm*/
function ReadCookie() {
               var allcookies = document.cookie;               
               // Get all the cookies pairs in an array
               cookiearray = allcookies.split(';');
               
               // Now take key value pair out of this array
               for(var i=0; i<cookiearray.length; i++) {
                  name = cookiearray[i].split('=')[0];
                  value = cookiearray[i].split('=')[1];
				  if(name == "user_id") {
					  userId = value;
					  console.log("User Id:" + userId)
				  }
        }
		return userId;
    }

// Below AJAX function calls Tastypie RESTful API for recommendation with the GET request with user_id captured from cookies
function fetchRecommendations() {
	var userId = ReadCookie();
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/recommend/?limit=5&user_id="+userId,
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#recommendations").empty();
            $("#recommendations").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as adult
function fetchAdultBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: " http://localhost:8000/api/books/?genres__genre=Adult&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];	
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#adultBooks").empty();
            $("#adultBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as children
function fetchChildrenBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=Children&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#childrenBooks").empty();
            $("#childrenBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as comics
function fetchComicBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=Comics&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#comicBooks").empty();
            $("#comicBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as history
function fetchHistoryBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=History&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#historyBooks").empty();
            $("#historyBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as romance
function fetchRomanceBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=Romance&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#romanceBooks").empty();
            $("#romanceBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as poetry
function fetchPoetryBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=Poetry&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#poetryBooks").empty();
            $("#poetryBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// Below AJAX function calls Tastypie RESTful API with the GET request genre as mystery
function fetchMysteryBooks() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?genres__genre=Mystery&limit=5&order_by=-average_rating",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var items = [];
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td><img id='box1' src='" + value.image_url + "' width='180' height='250' style='padding:20px;'/></td>");
            });
            items.push("</tr>");
            console.log(data);
            items.push("<tr>");
            $.each(data.objects, function (key, value) {
                items.push("<td align='center'><p width='180' height='250' style='padding:20px;display:inline;color:white;'>" + value.title.substring(0, value.title.indexOf('(')==-1?value.title.length:value.title.indexOf('(')) + "</p><p style='color:grey;padding:10px;text-align:center;font-size:15px;'>Rating: " + value.average_rating + "</p><div class='rate' align='center'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' id='star5' name='rate' value='5' /><label for='star5' title='it was amazing'></label><input type='radio' id='star4' name='rate' value='4' /><label for='star4' title='really liked it'></label><input type='radio' id='star3' name='rate' value='3' /><label for='star3' title='liked it'></label><input type='radio' id='star2' name='rate' value='2' /><label for='star2' title='it was ok'></label><input type='radio' id='star1' name='rate' value='1' /><label for='star1' title='did not like it'></label></div></td>");
            });
            items.push("</tr>");

            $("#mysteryBooks").empty();
            $("#mysteryBooks").append(items);
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

// referenced https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp in this code for hiding and showing sections
function viewAllPopularBooks() {
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
	var x = document.getElementById("sectionPopularBooks");
	if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
		console.log("20 called");
		fetchPopularBooks(20);
		x.style.display = "block";
    }

}

function viewAllNewReleases() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllChildren() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllComics() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllHistory() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllMystery() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllPoetry() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllRomance() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionAdult");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}

function viewAllAdult() {
    var x = document.getElementById("sectionPopularBooks");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionYouMayAlsoLike");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionNewReleases");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionChildren");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionComics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionHistory");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionMystery");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionRomance");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    var x = document.getElementById("sectionPoetry");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}