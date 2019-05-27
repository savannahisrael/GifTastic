
var moods = [
    "Stoked",
    "Struggling",
    "Over It",
    "Blessed",
    "Looking Good",
    "Sassy",
    "Savage",
    "Bummed",
    "Asleepy",
    "Hell Yeah",
    "Oh Really",
];


function moodButton(moods) {
    var button = $('<button>').text(moods).addClass("moodButton");
    $('#moodButtonsDiv').append(button);
}

for (var index in moods) {
    moodButton(moods[index]);  
}


$('#newButton').on('click', function() {
    event.preventDefault();
    var newMood = $('input').val().trim(); 
    moodButton(newMood);
    $('input').val('');
});


function getGiphy(moods) {
    var giphyQueryURL = "https://api.giphy.com/v1/gifs/search?q=" + moods + "&api_key=E7FD5XEKjG9QlICaseIhLNj9rqgqGrsG&limit=10";

    $.ajax({url: giphyQueryURL})
    .then(function(giphyResponse) { 
        $('#gifsWrapper').empty();

        for (var i in giphyResponse["data"]) {
            var stillLink = giphyResponse["data"][i]["images"]["fixed_width_still"]["url"];
            var animatedLink = giphyResponse["data"][i]["images"]["fixed_width"]["url"];
            var rating = $('<p>').text("rating: " + giphyResponse["data"][i]["rating"]);
            var img = $("<img>");
            
        
            img.attr({
                src: stillLink,
                class: "giphy",
                "data-state": "still",
                "data-still": stillLink,
                "data-animate": animatedLink,
                "data-rating": giphyResponse["data"][i]["rating"]
            });

            var imgDiv = $('<div>').append(img, rating).addClass("imgDiv"); 
            $('#gifsWrapper').prepend(imgDiv);
        }
    });
}


$(document).on('click', '.moodButton', function() {
    var moodName = $(this).text();
    getGiphy(moodName);
});

$(document).on("click", ".giphy", function() {
    var gif = $(this);
    var state = gif.attr('data-state');
    var animate = gif.attr('data-animate');
    var still = gif.attr('data-still');

    if (state === "still") {
        gif.attr('src', animate);
        gif.attr('data-state', "animate");
    } else {
        gif.attr('src', still);
        gif.attr('data-state', "still");
    }
});
