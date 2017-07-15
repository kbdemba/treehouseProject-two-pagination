//global variables
const names = $(".student-item");
let searchedNames = [];
const amountPerPage = 10; //number of names to show per page


//>>>>>>>>FUNCTIONS

//function to create the search bar
function addSearchBar(){
	let searchHTML = '<div class="student-search">'
	    searchHTML += '<input id="input-value" placeholder="Search for students...">'
	    searchHTML += '<button id="search-btn">Search</button>'
	    searchHTML += "</div>"
	$('.page-header').append(searchHTML);
}

//function to create a pagination button
function createButtons(tagOnButton){
	let textToAppend = "<button class='btn'>" + tagOnButton + "</button>";
	$(".pagination").append(textToAppend);
}

//funtion to remove the active class from aLL btns
function removeActiveClass(){
	$(".pagination .btn").removeClass("active");
}

//default the page number to be 1
function showPage(aName, pageNumber=1){
	$(searchedNames).hide()
	$(names).hide()
	var sliceFirst = (pageNumber*10) - 10;
	var sliceSecond = pageNumber * 10;
	$(aName).slice(sliceFirst, sliceSecond).show()

}

//function to create the pag buttons
function appendButtons(Aname){
	$(".pagination").html("");
	//only put the pagi nave if there is more than 1 page
	if (Aname.length > amountPerPage) {
		//console.log("this ideot")
		//bval = calculte the number of buttons to create
		let bval = Math.floor((Aname.length - 1)/10)
		for (let i = 0; i <= bval; i++) {
			createButtons(i+1);
		}
	}
}

//function to display a message if no names found on search
function errMessage(inputVal){
	let errMsg = '<h3 id="errMsg">';
		errMsg += '<span>' + inputVal + '</span> not found in our directory,';
		errMsg += " please try a different name!!!";
		errMsg += "</h3";
  		$(".pagination").html(errMsg);

}


//>>>>>>>>>>>>>>EVENT LISTENERS


// event listener on the pag buttons
$(".pagination").on("click", (e)=> {

	if (e.target.tagName === "BUTTON") {
		clickedBtn = e.target;
		//console.log($(clickedBtn).text());

		//when there is no name searched, pagination will be for the whole students
		// don't worry, there will be no buttons available if searched name not found
		if (searchedNames.length == 0) {
			showPage(names, $(clickedBtn).text());
		} else //pagination will only be for the searched students found
		{
			showPage(searchedNames, $(clickedBtn).text());
		}
		//remove the active class from all the buttons
		$(".pagination button").removeClass("active");
		//now add the active class to this button
		$(clickedBtn).addClass('active');
	}//target=butt
});//on click for thr buttons


//event listener on the search bttn
$('.page-header').on("click", (e)=> {
	if (e.target.id == "search-btn") {
		searchedNames = [];
		let inputValue = $("#input-value").val().toLowerCase();
		let student = $(".student-details h3")

		$(student).each(function(){
			let studentName = $(this).text().toLowerCase();
			let sEmail = $(this).next().text();
			//console.log(sEmail)

			//check if the name or email maches the input value
			if(studentName.indexOf(inputValue) > -1 || sEmail.indexOf(inputValue) > -1){
				console.log("found")
				let parentDiv = $(this).parent().parent()[0]
				searchedNames.push(parentDiv)
				//console.log($(this).parent().parent())
      		} //if
	  	});//loop each
		//initially show the first page of the searched names
		 showPage(searchedNames)
     appendButtons(searchedNames);
  	 //if no name matched, display the errmessage
     if (searchedNames.length < 1) {
      		errMessage(inputValue)
  		}
  		//add the active class to the first btn
  		$(".pagination button:first").addClass("active");
	}//if trget has a an id butnsearch
})//event listener on the buttn



// WHEN THE PAGE LOADS, INITIALLY DO THESE
addSearchBar();
showPage(names);
appendButtons(names);
$(".pagination button:first").addClass("active");
