//Inyectamos el html del header
$(function() {
    $("header").load("../partials/header.html");
    $("#sidebar").load("../partials/sidebar.html");
    $("#sidebar-left").load("../partials/sidebar-left.html");
    $("#content").load("../partials/content.html");
    $("#sidebar-right").load("../partials/sidebar-right.html");
    $("footer").load("../partials/footer.html");
});