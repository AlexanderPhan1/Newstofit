
function getArticles() {
    $("#posts").empty();

    $.getJSON("/articles", function (data) {
        for (var i = 0; i < data.length; i++) {

            if (data[i].notes.length > 0) {
            $("#posts").append("<li class='list-group-item post-title' data-id='" + data[i]._id + "'>" + data[i].title + "<br><a href='https://guides.gamepressure.com/" + data[i].link + "'>Link to article</a><span class='badge'>"+data[i].notes.length+"</span></li>");
            }
            else {
                $("#posts").append("<li class='list-group-item post-title' data-id='" + data[i]._id + "'>" + data[i].title + "<br><a href='https://guides.gamepressure.com/" + data[i].link + "'>Link to article</a></li>");
            }
            console.log(data[i].notes.length);

        }
    });
}
getArticles();


var artId;
$(document).on("click", "li", function () {
    console.log("I was clicked");

    var artId = $(this).attr("data-id");
    $("#addNote").attr("data-id", artId);
    console.log("This is my id: " + artId);
    $('#pNotes').empty()

    $.ajax({
            method: "GET",
            url: "/articles/" + artId
        })

        .done(function (data) {
            for (var i = 0; i < data.notes.length; i++) {
                console.log(data.notes[i]);
                if (data.notes[i].title && data.notes[i].body) {
                    $('#pNotes').append("<li class='list-group-item'>Title: <strong>" + data.notes[i].title + "</strong></li>");
                    $('#pNotes').append("<li class='list-group-item'>Comment: " + data.notes[i].body + "</li>");
                    console.log(data.notes.length);
                }
            }
        });
});

$("#addNote").on("click", function () {

    var thisId = $(this).attr("data-id");

    $.ajax({
            method: "POST",
            url: "/submit/" + thisId,
            data: {

                title: $("#titleinput").val(),

                body: $("#bodyinput").val()
            }
        })

        .done(function (data) {

            console.log(data);


        });


    $("#titleinput").val("");
    $("#bodyinput").val("");
});