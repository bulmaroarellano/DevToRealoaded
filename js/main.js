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
  let ano = (anio = f.getFullYear());
  console.log("monthd", mes);
  devtoRef.on("value", (snapshot) => {
    let result = snapshot.val();
    let total1 = result.filter((e) => {
      var [year, month] = e.created_at.split("-");
      console.log(year, month, ano);
      return ano === year;
    });
    console.log(total1);
  });
});
$("#nav-year-tab").click(() => {
  console.log("year");
});
$("#nav-infinity-tab").click(() => {
  console.log("infinity");
});

$("#nav-latest-tab").click(() => {
  console.log("latest");
});
//Fin Carlos velasquez
