$(document).ready(function () {
	console.log("I am called");
	fetchbooks();
	$(".image").css("transition", "transform 500ms ease-in-out");
    $(".image").hover(    
        // Handler for mouseenter
        function()
        {
            $(this).css("transform", "scale(1.2)");
        },
        // Handler for mouseleave
        function()
        {
            $(this).css("transform", "scale(1)");
        }
    );
});    
	
	function openNav() {
       document.getElementById("mySidenav").style.display = "block";
       document.getElementById("box1").style.top = "400px";
       document.getElementById("box1").style.border = "1px solid #fff";
       document.getElementById("box1").style.transform = "scale(1)";
       document.getElementById("row").style.height = "800px";

       // document.getElementById("box1").style.display = "block";

    }

    function closeNav() {
       document.getElementById("mySidenav").style.display = "none";
       document.getElementById("box1").style.transform = "scale(1)";
       document.getElementById("box1").style.transition = "all 0.7s ease";
       document.getElementById("box1").style.border = "none";
    }
//katie added
// referenced https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp in this code

function fetchbooks() {
	console.log("In fetch books");
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "http://localhost:8000/api/books/?limit=5",
        data: JSON.stringify(),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
        	var items = [];
			items.push("<tr>");
			$.each (data.objects, function (key,value) {
        		items.push("<td><img id='box1' src='"+value.image_url+"' width='180' height='250' style='padding:20px;'/></td>");
				console.log (value.book_id);
			});
			items.push("</tr>");
			console.log(data);
			items.push("<tr>");
			$.each (data.objects, function (key,value) {
				items.push("<td><p width='180' height='250' style='padding:20px;display:inline;color:white;'>"+value.title+"<br/>Average Rating:"+value.average_rating+"</p></td>");
				console.log (value.book_id);
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

