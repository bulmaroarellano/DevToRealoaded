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
