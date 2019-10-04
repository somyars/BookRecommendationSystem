$(document).ready(function(){
$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight'); 
			} else {
		    label.removeClass('highlight');   
			}   
    } else if (e.type === 'focus') {
      
      if( $this.val() === '' ) {
    		label.removeClass('highlight'); 
			} 
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }
	


});


$('.tab a').on('click', function (e) {
  
  e.preventDefault();
  
  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');
  
  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();
  
  
  $(target).fadeIn(600);
  
  
});

});
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
var drop = document.getElementById("myDropdown");
console.log("Value of drop: ", drop);
$("#myDropdown").prop("selectedIndex", -1);



// --------------------------------------AJAX code:-------------------------------------------------------------------------------------------------

$(document).ready(function() 
{
	//Trigger AJAX call when sign-up is clicked
	$("#demo").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_signup();
	});
		
	//Trigger AJAX call when login is clicked
	$("#btn").click(function (event) {
        event.preventDefault();
        console.log("Func called");
        fire_ajax_Login(document.getElementById("Email_Address").value, document.getElementById("Password").value);

    });
});

// Sign-up AJAX call
function fire_ajax_signup(){
  event.preventDefault();
  console.log("Fired signup ajax");
	
	// UUID generation Reference link : https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
	function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	//POST request body for sign-up
    var formData = {
		user_id :  create_UUID(),
		first_name : $("#First_name").val(),
		last_name :  $("#Last_name").val(),
		email :  $("#Email").val(),
		password :  $("#Set_A_Password").val(),
		interest :  $("#myDropdown").val(),
    }

	console.log(JSON.stringify(formData));

    $.ajax({
    type : "POST",
    contentType : "application/json",
    url : "http://localhost:8000/api/users/",
    data : JSON.stringify(formData),
    dataType : 'text',
    success :  function () {
			alert("You have successfully signed up!Start reading..");
            console.log("SUCCESS : ");
			//Reset values as blank
			$("#First_name").val("");
			$("#Email").val("");
			$("#Last_name").val("");
			$("#Set_A_Password").val("");
			$("#myDropdown").val("");
             
    },  
     
    error : function (e) {
          	alert("Sign up unsuccessful. Try again");
           console.log("Error : "+ JSON.stringify(e));
        }
    });
}
  
  // Login AJAX function
  function fire_ajax_Login(emailAddress, password) {
    event.preventDefault();
	console.log("Fired login ajax" + emailAddress + password);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url : "http://localhost:8000/api/users/?email=" + emailAddress +"&password="+password,
        dataType: 'json',
		data: JSON.stringify(),
        cache: false,
        timeout: 600000,
        success: function (result) {
			if(result.objects != [] && result.objects != "") {
				alert ("Login successfully");
				var d = new Date();
				d.setTime(d.getTime() + (300000));
				var expires = "expires=" + d.toGMTString();
				document.cookie = "user_id" + "=" + result.objects[0].user_id + ";" + expires + ";path=/";
				console.log("SUCCESS : " +result.objects[0].user_id);
				console.log("SUCCESS : " +document.cookie);
				window.location = 'home.html'
			}
			else {
				alert ("Incorrect Credentials");
			}
			
        },
        error: function (e) {
            alert ("Incorrect Credentials");
			console.log("Error : " + e);

        }
    });
}
	




