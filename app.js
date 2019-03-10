// Initial buttons appended to page
var topic = [
    "Game of Thrones",
    "Agents of S.H.I.E.L.D.",
    "Handmaiden's Tale",
    "The Walking Dead",
    "The Simpsons",
];

displayButtons();

function displayButtons() {
    $("#buttons-display").empty(); //to clear every time, so no duplicates

    for (var i = 0; i < topic.length; i++) {
        var a = $("<button>").addClass("tvshow").attr("data-name", topic[i]).text(topic[i]); //Make a new button for each index in topic array
        $("#buttons-display").append(a); //Add new buttons to the display of buttons
    }
}

$("#add-tvshow").on("click", function (event) {
    event.preventDefault(); //Prevents page from reloading and flickering the info
    topic.push($("#tvshow-input").val().trim()); //adds new searched TV shows into the array, trimed of spaces before/afer text
    displayButtons(); //Loads the new searched TV show
    $("#tvshow-input").val(""); //Clears the input field
})

var tvshow = $(this).attr("data-name"); //Add data-name to each button
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshow + "&api_key=DG7daN5UvHL2N9pDsYSRslw45QeLnEBs"; //URL for each button

$(document).on("click", ".tvshow"); //, displayTVshowInfo);
