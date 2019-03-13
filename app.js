// Initial buttons appended to page
var topic = [
    "Game of Thrones",
    "Agents of SHIELD",
    "Handmaid's Tale",
    "The Walking Dead",
    "The Simpsons",
    "Stranger Things",
    "The Haunting of Hill House"
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

function displayTVshowInfo() {
    var tvshow = $(this).attr("data-name"); //Add data-name to each button
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + tvshow +
        "&api_key=DG7daN5UvHL2N9pDsYSRslw45QeLnEBs&limit=10"; //URL for each button

    //Grabbing JSON from page, using AJAX
    $.ajax({
        method: "GET",
        url: queryURL
    }).then(function (response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            // var container = $("<div class='gif-image'>");
            var tvshowImage = $("<img>").attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still"
            }).addClass("gif");
            // container.append(p, tvshowImage);
            $("#tvshow-display").prepend(p, tvshowImage);
        }
    })
}

$(document).on("click", ".gif", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state");
    var stillURL = $(this).attr("data-still");
    var animateURL = $(this).attr("data-animate");
    // console.log(state);
    // console.log(stillURL);
    // console.log(animateURL);
    // alert("Clicked");
    // console.log(event);

    if (state == "still") {
        $(this).attr({
            "src": animateURL,
            "data-state": "animate" 
        })} else {
        $(this).attr({
            "src": stillURL,
            "data-state": "still"
        })
    }
});

$("#buttons-display").on("click", ".tvshow", displayTVshowInfo);

