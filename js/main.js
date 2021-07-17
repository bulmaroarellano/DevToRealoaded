let database = firebase.database();

let devtoRef = database.ref("devTools");

devtoRef.on("value", (snapshot) => {
  let result = snapshot.val();
  console.log(result);
});
