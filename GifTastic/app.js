$(document).ready(function () {
    console.log("ready!");

    

    
    var topics = ["clerks", "dante hicks", "randal graves", "brodie bruce", "jay and silent bob", "holden mcneil", "banky edwards",];

    
    function renderButtons() {
        
        $("#buttons-view").empty();
        
        for (var i = 0; i < topics.length; i++) {
            var newBTN = $("<button>").text(topics[i]);
            newBTN.addClass("gotSearch btn btn-light btn-lg");
            newBTN.attr("data-name", topics[i]);
            $("#buttons-view").append(newBTN);
        }
    };
    $("#add-giffy").on("click", function (event) {
        event.preventDefault();
        var giffySearch = $("#giffy-input").val().trim();
        topics.push(giffySearch);
        renderButtons();
    });
    
    $(document).on("click", ".gotSearch", function (event) {
        var giffySearch = $(this).attr("data-name");
        console.log(giffySearch);
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + giffySearch + '&api_key=17TfFfuG61y5kZ777K8zRCQjcBZRWehw';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

        var result = response.data;
        console.log(result);
        $("#gifs-appear-here").empty();
        for(var i=0;i < result.length; i++ ) {           
            var img = $("<img>");
            var ratingSpan = $("<span>");
            var ratingP = $("<p>").text("Rating: " + result[i].rating);
            img.attr("src", result[i].images.fixed_height_still.url)
            img.attr("data-animate", result[i].images.fixed_height.url);
            img.attr("data-still", result[i].images.fixed_height_still.url);
            img.attr("data-state", "still");
            img.addClass("gif img-thumbnail");
            ratingSpan.append(img);
            ratingSpan.append(ratingP);
            $("#gifs-appear-here").append(ratingSpan);
        }
        })
    })

    $(document).on("click", ".gif", function() {
        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  
    
    renderButtons();
});