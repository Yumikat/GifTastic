// Initial buttons appended to page
var topic = [
    "Game of Thrones",
    "Agents of SHIELD",
    "Handmaiden's Tale",
    "The Walking Dead",
    "The Simpsons",
    "Stranger Things"
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
            var tvshowImage = $("<img>").attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still"
            }).addClass("gif");
            $("#tvshow-display").append(p, tvshowImage);
        }
    })
}

$(".gif").on("click", function () {
    // $(".gif").click(function () {
    // var state = $(this).attr("data-state");
    // var stillURL = $(this).attr("data-still");
    // var animateURL = $(this).attr("data-animate");
    // console.log(state);
    // console.log(stillURL);
    // console.log(animateURL);
    alert("Clicked");

    // if (state == "still") {
    //     $(this).attr({
    //         "src": animateURL,
    //         "data-state": "animate" 
    //     })} else {
    //     $(this).attr({
    //         "src": stillURL,
    //         "data-state": "still"
    //     })
    // }
});

$("#buttons-display").on("click", ".tvshow", displayTVshowInfo);

