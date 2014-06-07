(function ($) {
    $.fn.EasyGallery = function() {
        var images = this.find("a");

        images.click(imageClick);
    };

    imageClick = function(e) {
        e.preventDefault();
        drawOverlay($(e.currentTarget));
        drawWrapper($(e.currentTarget));
    }

    drawWrapper = function(target) {
        var wrapper = $("<div></div>").addClass("eg-wrapper");

        var img = $("<img />").attr('src', target.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            alert('broken image!');
            } else {
            $(".eg-wrapper").append(img);
            }
        });

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

    drawOverlay = function(target) {
        var overlay = $("<div></div>").addClass("eg-overlay");
        $("body").append(overlay);

        $(".eg-overlay").click(function(e) {
            $(".eg-wrapper").remove();
            $(".eg-overlay").remove();
        });
    }
}( jQuery ));
