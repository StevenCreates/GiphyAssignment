$(document).ready(function () {

    //variables and arrays
    var theTopic =
        ["Fail",
            "Explosion",
            "Trip",
            "Slap"
        ];


    //
    //looping Topics in the array
    function arrayButtons() {
        $("#giphyButtons").empty();
        var i = 0;
        for (i = 0; i < theTopic.length; i++) {

            var newbut = $("<button>");
            newbut.addClass("clickMe btn btn-outline-warning buttonspace");
            newbut.attr("data-topic", theTopic[i]);
            newbut.text(theTopic[i]);
            newbut.attr('data-name', theTopic[i].name);

            $('#giphyButtons').append(newbut);
        }
    };
    arrayButtons();


    //
    //Add Topics To Array
    $("#addTopic").on("click", function (event) {

        event.preventDefault();

        var topic = $("#searchTopic").val().trim();
        console.log(topic);
        theTopic.push(topic);
        arrayButtons();
        clickGiphy();
    });

    //
    //loading giphy onclick
    var offsetNum = 0;
    function clickGiphy() {
        $(".clickMe").on("click", function () {
            offsetNum=(offsetNum+10);
            
            var apiKey = "VLhjWS2b7pKEfcpXxFBILjbY0D9Kvohy";
            var topic = $(this).attr("data-topic");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&" + "limit=10&rating=pg&offset=" +offsetNum;
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
                    var topicGiphy = $("<img>");

                    topicGiphy.attr('src', results[i].images.fixed_height_still.url)
                    topicGiphy.attr('data-state', 'still')
                    topicGiphy.attr('data-still', results[i].images.fixed_height_still.url)
                    topicGiphy.attr('data-animate', results[i].images.fixed_height.url)
                    giphyDiv.attr('class', 'giphyBorder')
                    giphyDiv.append(topicGiphy);
                    giphyDiv.append(textRating);

                    $(".giphyHere").prepend(giphyDiv);
                }
                changeGif();
            })
        })
    }

    //
    //animating when clicking function
    function changeGif() {
        $('img').on("click", function () {
            var state = $(this).attr('data-state')

            console.log(state)

            if (state == 'still') {
                $(this).attr('src', $(this).attr('data-animate'));
                $(this).attr('data-state', 'animate');
            }
            else if (state == 'animate') {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
            }
        })

    }




    clickGiphy();
    //document ready finished
});