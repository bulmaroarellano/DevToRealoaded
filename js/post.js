const createPost = (obj, endpoint) => {

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() { 
      if (this.readyState == 4 && this.status == 200) {
          //console.log(JSON.parse(this.responseText));
      }
  };
  xhttp.open("POST", endpoint, true);
  xhttp.send(JSON.stringify(obj));
}




let idTask = 0;
// creamos el post
$('#btn-task-form').click(function(event){
    event.preventDefault();
    let cover_image=$("#cover-image-input").val();
    let title = $('#title').val();
    let tags = $('#tags').val();
    let image_content= $("image-content");
 let content = $("#content").val();
    database.ref(`post/`).set({
            title,
            textArea
        });
        idTask++
    });