let database = firebase.database();

let devtoRef = database.ref("devTools");

export function getAllPost() {
  const result = devtoRef.on("value", (snapshot) => {
    result = snapshot.val();
  });
  return result;
}
