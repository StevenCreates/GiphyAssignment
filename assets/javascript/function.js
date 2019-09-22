
$(document).ready(function () {

    //variables and arrays
    var theAnimals = ["Penguin", "Sabertooth", "Dog", "Unicorn"];

    //looping animals in the array
    function arrayButtons() {
        $("#giphyButtons").empty();
        var i = 0;
        for (i = 0; i < theAnimals.length; i++) {
            var newbut = $("<button>");
            newbut.addClass("clickMe btn btn-outline-warning buttonspace");
            newbut.attr("data-animal", theAnimals[i]);
            newbut.text(theAnimals[i]);
            $('#giphyButtons').append(newbut);
            clickGiphy();
        }
    };

    arrayButtons();

    //Add Animal To Array
    $("#addAnimal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#searchAnimal").val().trim();
        console.log(animal);
        theAnimals.push(animal);
        arrayButtons();
    });

    //loading giphy onclick

    function clickGiphy() {
        $(".clickMe").on("click", function () {
            var apiKey = "VLhjWS2b7pKEfcpXxFBILjbY0D9Kvohy";
            var animal = $(this).attr("data-animal");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=" + apiKey + "&" + "limit=10";
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var results = response.data;
                console.log(results);
                for (var i = 0; i < results.length; i++) {
                    var giphyDiv = $("<div>");
                    var textRating = $('<p>').text("Rating: " + results[i].rating);
                    var animalGiphy = $("<img>");
                    animalGiphy.attr('src', results[i].images.fixed_height.url);
                    giphyDiv.append(textRating);
                    giphyDiv.append(animalGiphy);
                    $(".giphyHere").prepend(giphyDiv);
                }
            });
        });
    }





    //document ready finished
});