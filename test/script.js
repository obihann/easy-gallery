$(function() {
    var flag = {
        icon: "/content/warning.svg",
        click: function(e) {
            alert("This image has been flagged");
        }
    };

    var params = {
        footer: [flag],
        imageClickExt: function(e) {
            alert("Custom");
        }
    };

    $(".carousel").EasyGallery(params);
});
