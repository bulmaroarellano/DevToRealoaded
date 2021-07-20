//console.log("ashes...")
let printCards = ('../js/main')
$(function () {
    $("header").load("../partials/header.html")
  });
const url = new URL(window.location.href)
let param = url.searchParams.get("value")
console.log(param)
//console.log(url)

let database = firebase.database();
let devtoRef = database.ref("devTools");
const getFoundPosts = () => {
    console.log("Your life burns faster...")
    //let searchValue = $('#inputSearch').val().toLowerCase()
  
    devtoRef.once('value').then( snapshot =>{
        let result = snapshot.val()
        let articlesKeys = Object.keys( result )
        //console.log( articlesKeys ) 
        let filterResult = articlesKeys.reduce((accum,current) => {
            let articleTitle = result[current].title.toLowerCase()
          //console.log( articleTitle)
         // articleTitle.includes(searchValue) ? console.log("si lo contiene") : console.log( "no lo contiene ")
  
            return articleTitle.includes(param) ? {...accum, [current]: result[current]} : accum 
        },{})
        console.log (filterResult)

    })
  }

  const printResults = () =>{
    let results = getFoundPosts()
    console.log("entró a print results: :" + results)
    //let filterResult1 = getFoundPosts()
    console.log("Los registros con los que se van a pintar las cards: " + filterResult1 )
    for (title in filterResult1) {
        let { title } = filterResult1[title]
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
  let postsCollection = getFoundPosts()
  console.log("llamado a obtener resultados: " + postsCollection )
  printResults()

