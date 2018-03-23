$(document).ready(function() {
  $(".modal").modal();

  var thisId;

  $.getJSON("/articles", data => {
    data.forEach(article =>
      $("#articles").append(
        $(`<div class='article'>
        <p class='article-title' data-id=${article._id}>${article.title}<br />${
          article.link
        }</p>
        <button data-id=${
          article._id
        } class='article-btn waves-effect waves-light btn modal-trigger' href='#modal1'>View Notes</button>`)
      )
    );
  });

  function generateModalContent(id) {
    $("#modal-content").empty();

    // Now make an ajax call for the Article
    $.ajax({ method: "GET", url: "/articles/" + id })
      // With that done, add the note information to the page
      .then(function(data) {
        const mc = $("#modal-content");
        console.log(data);
        // The title of the article
        mc.append("<h2>" + data[0].title + "</h2>");
        mc.append(`<h4>Link: ${data[0].link}</h4>`);
        mc.append(`<ul>Comments:</ul>`);
        data[0].notes.forEach(note => {
          mc.append(
            `<li>${note.author}: ${note.body} <button data-noteid=${
              note._id
            } class='delete-comment'>Delete</button></li>`
          );
        });
        mc.append(`<h5>Enter a new comment:</h5>`);
        mc.append(`<input id='author' name='author' placeholder='Name'>`);
        mc.append(
          `<textarea id='bodyinput' name='body' placeholder='Enter a comment!'></textarea>`
        );
        // A button to submit a new note, with the id of the article saved to it
        mc.append(
          "<button data-id='" +
            data[0]._id +
            "' id='savenote'>Save Note</button>"
        );

        // If there's a note in the article
        //   if (data[0].note) {
        //       data[0].note.forEach(note => {
        //           let newNote = $('<li>');
        //           newNote.text(`"${note.body}" -${note.author}`)
        //       })
        //   }
      });
  }

  function deleteComment(id) {
    console.log("Made it!");
    $.ajax({
      method: "DELETE",
      url: `/notes/${id}`
    });
    // .then(() =>{
    //     console.log('Comment Deleted!');
    //     generateModalContent(thisId)
    // })
    generateModalContent(thisId);
  }

  $(document).on("click", ".delete-comment", function() {
    var commentId = $(this).attr("data-noteid");
    console.log(commentId);
    deleteComment(commentId);
  });

  $(document).on("click", ".article-btn", function() {
    thisId = $(this).attr("data-id");
    console.log(thisId);
    generateModalContent(thisId);
  });

  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisId);

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from author input
        author: $("#author").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        generateModalContent(thisId);
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#author").val("");
    $("#bodyinput").val("");
  });
});