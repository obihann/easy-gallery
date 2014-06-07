(function ($) {
    $.fn.EasyGallery = function() {
        var images = this.find("a");

        images.click(imageClick);
    };

    imageClick = function(e) {
        e.preventDefault();
        drawOverlay();
        drawWrapper();
    }

    drawWrapper = function() {
        var wrapper = $("<div></div>").addClass("eg-wrapper");
        var closeBtn = $("<div></div>").addClass("eg-close");
        wrapper.append(closeBtn);
        $("body").append(wrapper);

        $(".eg-wrapper").click(function(e) {
            e.stopPropagation();
        });

        closeBtn.click(function(e) {
            $(".eg-wrapper").remove(); 
            $(".eg-overlay").remove();
        });
    }

    drawOverlay = function() {
        var overlay = $("<div></div>").addClass("eg-overlay");
        $("body").append(overlay);

        $(".eg-overlay").click(function(e) {
            $(".eg-wrapper").remove();
            $(".eg-overlay").remove();
        });
    }
}( jQuery ));
