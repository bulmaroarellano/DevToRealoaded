let database = firebase.database();
let devtoRef = database.ref("devTools");

devtoRef.on("value", (snapshot) => {
  let result = snapshot.val();
});

//Creado por Carlos Velasquez
//RFE-10
//16/07/2021
//Filtro por Feed Week Month Year Infinity Latest
$("#nav-feed-tab").click(() => {
  printPost(postCollection);
  console.log("Feed");
});

$("#nav-week-tab").click(() => {
  console.log("week");
  devtoRef.on("value", (snapshot) => {
    let result = snapshot.val();
    console.log(result);
    let total1 = result.filter((e) => e.tags === "react");
    console.log(total1);

    let total = result.reduce((accum, current) => {
      console.log(accum + current.comments_count);
    }, []);
    printPost(total);
  });
});

$("#nav-month-tab").click(() => {
  let f = new Date();
  let dia = f.getDate();
  let mes = f.getMonth() + 1;
  let ano = f.getFullYear();
  devtoRef.on("value", (snapshot) => {
    let result = snapshot.val();
    let resultado = result.filter((e) => {
      var [year, month] = e.created_at.split("-");

      return (
        parseInt(mes) === parseInt(month) && parseInt(ano) === parseInt(year)
      );
    });

    console.log("Resultado de Mes y año:", resultado);
    printPost(resultado);
  });
});

$("#nav-year-tab").click(() => {
  let f = new Date();
  let ano = f.getFullYear();
  devtoRef.on("value", (snapshot) => {
    let result = snapshot.val();
    let respuesta = result.filter((e) => {
      var [year, month] = e.created_at.split("-");

      return parseInt(ano) === parseInt(year);
    });
    printPost(respuesta);
    console.log("Resultado de Mes y año:", respuesta);
  });
});

$("#nav-infinity-tab").click(() => {
  console.log("infinity");
});

$("#nav-latest-tab").click(() => {
  console.log("latest");
});

document.getElementById("nav-latest-tab").addEventListener("click", (e) => {
  //  document.getElementById("nav-latest-tab").innerHTML = "";
  readPost(e);
});

function readPost(e) {
  console.log("Lo que trae", e.target.innerHTML);
  devtoRef
    .orderByChild("priority")
    // .equalTo(e.target.innerHTML)
    .equalTo("latest")
    .on("value", function (snapshot) {
      snapshot.forEach((snap) => {
        const issu = snap.val();
        console.log("datos del resultado", issu);
      });
    });
}

//Fin Carlos velasquez

//Inyectamos el html del header
$(function () {
  $("header").load("../partials/header.html");
  $("#sidebar").load("../partials/sidebar.html");
  $("#sidebar-left").load("../partials/sidebar-left.html");
  $("#content").load("../partials/content.html");
  $("#sidebar-right").load("../partials/sidebar-right.html");
  $("footer").load("../partials/footer.html");
});

//let postRef = database.ref("/devTools");
//let postUserRef = database.ref("/db-devto//user");
let cardContainer = document.getElementById("cardContainer");

//Crear cartas con valores en la DB
devtoRef.on("value", (snapshot) => {
  $(".cardContainer").empty();
  let postCollection = snapshot.val();
  console.log(postCollection)
  printPost(postCollection);
});

  function printPost(postCollection) {
  //$(".cardContainer").innerHTML('')
  for (item in postCollection) {
    let { readable_publish_date, reading_time_minutes, title, cover_image, user: {name}, user: {profile_image}, tags, positive_reactions_count } = postCollection[item];
    if(postCollection[item] === postCollection[0]){
        $(".cardContainer").append(`
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-feed" role="tabpanel" aria-labelledby="nav-feed-tab">
                <div class="card br-post post-card featured-post-card">
                    <img src="${cover_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                <div class="d-flex c-header">
                    <img src="${profile_image}" alt="" class="br-100">
                <div class="d-flex c-name">
                    <h6 class="nickname mb-0">${name}</h6>
                    <p>${readable_publish_date}</p>
                </div>
            </div>
        <div class="card-content pl-5 pt-2">
            <a href="index2.html" class="post-list">
                <h4 class="card-title">${title}</h4>
            </a>
            <div class="d-flex h-order">
                <nav class="card-post-tags">
                    <a class="custom-a">#showdev</a>
                    <a>#python</a>
                    <a>#serverless</a>
                    <a>#twitter</a>
                </nav>
            </div>
            <div class=" d-flex read">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24"
                        height="24" role="img"
                        aria-labelledby="aavwx5vmqdgx8wvzfg593jo469ge3dnz"
                        class="crayons-icon mb-1">
                        <title id="aavwx5vmqdgx8wvzfg593jo469ge3dnz">
                            Comments</title>
                        <path
                            d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                        </path>
                    </svg>
                    <button class="comment">Add comment</button>
                </div>
                <div class="d-flex">
                    <p class="card-text mb-0"><small class="text-muted">${reading_time_minutes} min read</small></p>
                    <button class="save">Save</button>
                </div>
            </div>
        </div>
    </div>
    </div>
        `)
    } else {
    $(".cardContainer").append(`
    <div class="card mt-3 br-post post-card">
        <div class="card-body">
            <div class="d-flex c-header">
                    <img src="${profile_image}" alt="" class="br-100 pad">
                <div class="d-flex c-name">
                    <h6 class="nickname mb-0">${name}</h6>
                    <p>${readable_publish_date}</p>
                </div>
            </div>
            <div class="card-content pl-5 pt-2">
                <a href="index2.html" class="post-list">
                    <h4 class="card-title">${title}</h4>
                </a>
                <div class="d-flex h-order">
                    <nav class="">
                        <a>#${tags}</a>
                        <a>#cleancode</a>
                        <a>#stestdev</a>
                        <a>#tdd</a>
                    </nav>
                </div>
                <div class=" d-flex read">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" role="img"
                            aria-labelledby="ah0ho4vrguhqcalal3r0v1fzvlxju7zc"
                            class="crayons-icon mb-1">
                            <title id="ah0ho4vrguhqcalal3r0v1fzvlxju7zc">
                                Reactions</title>
                            <path
                                d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                            </path>
                        </svg>
                        <span class="not-b">${positive_reactions_count} reactions</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" role="img"
                            aria-labelledby="aavwx5vmqdgx8wvzfg593jo469ge3dnz"
                            class="crayons-icon mb-1">
                            <title id="aavwx5vmqdgx8wvzfg593jo469ge3dnz">
                                Comments</title>
                            <path
                                d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                            </path>
                        </svg>
                        <button class="comment">Add comment</button>
                    </div>
                    <div class="d-flex">
                        <p class="card-text mb-0"><small class="text-muted">${reading_time_minutes} minutes</small></p>
                        <button class="save">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
      `);
    }
  }
};
