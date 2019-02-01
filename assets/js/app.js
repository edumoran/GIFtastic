$(document).ready(function () {

        var movies = [
            "Sixteen Candles",
            "Ferris Bueller's Day Off",
            "The Breakfast Club",
            "The Goonies",
            "Sixteen Candles",
            "Ghostbusters",
            "Back to the Future",
            "Gremlins",
            "Fast Times at Ridgemont High",
            "Beetlejuice"
        ];
		function renderButtons(){
			for(var i = 0; i < movies.length; i++) {
				var newButton = $("<button>");
				newButton.addClass("btn");
				newButton.addClass("movie-button");
				newButton.text(movies[i]);
				$("#button-container").append(newButton);
				console.log(renderButtons)
			}
			$(".movie-button").unbind("click");
		
			$(".movie-button").on("click", function(){
				$(".gif-image").unbind("click");
				$("#gif-container").empty();
				$("#gif-container").removeClass("border-box");
				populateGIFContainer($(this).text());
			});
		
		}
		
		function addButton(show){
			if(movies.indexOf(show) === -1) {
				movies.push(show);
				$("#button-container").empty();
				renderButtons();
				console.log(addButton);
			}
		}
		
		function populateGIFContainer(show){
			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=A9shFgibPLMR5kxf7UXoz7lseaElOOOU&limit=10";

			$.ajax({
				url: queryURL,
				method: "GET"
			}).then(function(response){
				response.data.forEach(function(element){
					newDiv = $("<div>");
					newDiv.addClass("individual-gif-container");
					newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
					var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
					newImage.addClass("gif-image");
					newImage.attr("state", "still");
					newImage.attr("still-data", element.images.fixed_height_still.url);
					newImage.attr("animated-data", element.images.fixed_height.url);
					newDiv.append(newImage);
					$("#gif-container").append(newDiv);
				});
				
				$("#gif-container").addClass("border-box");
				$(".gif-image").unbind("click");
				$(".gif-image").on("click", function(){
					if($(this).attr("state") === "still") {
						$(this).attr("state", "animated");
						$(this).attr("src", $(this).attr("animated-data"));
					}
					else {
						$(this).attr("state", "still");
						$(this).attr("src", $(this).attr("still-data"));
					}
				});
			});
			console.log(populateGIFContainer);
		}
		
		$(document).ready(function(){
			renderButtons();
			$("#submit").on("click", function(){
				event.preventDefault();
				addButton($("#movie-show").val().trim());
				$("#movie-show").val("");
			});
		});
	});