let database = firebase.database();

let devtoRef = database.ref("devTools");
devtoRef.on("value", (snapshot) => {
  result = snapshot.val();
});
