var database = firebase.database();
var article_id = 1;
    var article = {
            'title': 'Conectar Firebase con tu app de JavaScript',
    }

    firebase.database().ref('articles/' + article_id).set(article);