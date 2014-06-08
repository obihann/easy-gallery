(function ($) {
    var images, currentImage, params;

    $.fn.EasyGallery = function(_params) {
        images = this.find("a");
        images.click(imageClick);
        params = _params;
    };

    imageClick = function(e) {
        e.preventDefault();
        drawOverlay($(e.currentTarget));
        drawWrapper($(e.currentTarget));
    }

    drawWrapper = function(target) {
        currentImage = target;
        var wrapper = $("<div></div>").addClass("eg-wrapper");
        var footer = $("<div></div>").addClass("eg-footer");

        var img = $("<img />").attr('src', target.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                alert('broken image!');
            } else {
                attrs = currentImage.data();
                for (prop in attrs) {
                    img.attr(prop, attrs[prop]); 
                }

                $(".eg-wrapper").append(img);
            }
        });

        if (images.length > 1) {
            var backArrow = $("<div></div>").addClass("eg-back").addClass("eg-icon");
            var forwardArrow = $("<div></div>").addClass("eg-forward").addClass("eg-icon");

            footer.append(backArrow);
            footer.append(forwardArrow);

            backArrow.click(previousImage);
            forwardArrow.click(nextImage);
        }

        if (params.footer) {
            var length = params.footer.length;
            for (var x = 0; x < length; x++) {
                var icon = $("<div></div>").addClass("eg-icon");
                icon.css("background-image", "url("+params.footer[x].icon+")");

                footer.append(icon);
                icon.click(params.footer[x].click);
            }
        }

        var closeBtn = $("<div></div>").addClass("eg-close");
        wrapper.append(closeBtn);
        wrapper.append(footer);
        $("body").append(wrapper);

        $(".eg-wrapper").click(function(e) {
            e.stopPropagation();
        });

        closeBtn.click(function(e) {
            $(".eg-wrapper").remove(); 
            $(".eg-overlay").remove();
        });
    }

    nextImage = function(e) {
        index = images.index(currentImage);
        index++;

        if (index >= images.length) {
            index = 0;
        }

        currentImage = $(images[index]);

        var img = $("<img />").attr('src', currentImage.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                alert('broken image!');
            } else {
                $(".eg-wrapper img").remove();
                $(".eg-wrapper").append(img);
            }
        });
    }

    previousImage = function(e) {
        index = images.index(currentImage);
        index--;

        if (index < 0) {
            index = images.length - 1;
        }

        currentImage = $(images[index]);

        var img = $("<img />").attr('src', currentImage.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                alert('broken image!');
            } else {
                $(".eg-wrapper img").remove();
                $(".eg-wrapper").append(img);
            }
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
