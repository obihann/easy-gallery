(function ($) {
    var images, currentImage, params;

    $.fn.EasyGallery = function(_params) {
        images = this.find("a");
        params = _params;

        if (params.imageClick) {
            images.click(params.imageClick);
        } else {
            images.click(imageClick);
        }
    };

    imageClick = function(e) {
        e.preventDefault();
        drawOverlay($(e.currentTarget));
        drawWrapper($(e.currentTarget));

        if (params.imageClickExt) {
            params.imageClickExt(e);
        }
    };

    drawWrapper = function(target) {
        currentImage = target;
        var wrapper = $("<div></div>").addClass("eg-wrapper");
        var footer = $("<div></div>").addClass("eg-footer");

        var img = $("<img />").attr('src', target.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                alert('broken image!');
            } else {
                attrs = currentImage.data();
                for (var prop in attrs) {
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

            if (params.nextClick) {
                forwardArrow.click(nextImage);
            } else {
                forwardArrow.click(nextImage);
            }

            if (params.previousClick) {
                backArrow.click(previousClickImage);
            } else {
                backArrow.click(previousImage);
            }
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

        if (params.closeClick) {
            closeBtn.click(params.closeClick);
        } else {
            closeBtn.click(function(e) {
                $(".eg-wrapper").remove(); 
                $(".eg-overlay").remove();

                if (params.closeClickExt) {
                    params.closeClickExt(e);
                }
            });
        }
    };

    nextImage = function(e) {
        index = images.index(currentImage);
        index++;

        if (index >= images.length) {
            index = 0;
        }

        currentImage = $(images[index]);

        var img = $("<img />").attr('src', currentImage.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                alert('broken image!');
            } else {
                $(".eg-wrapper img").remove();
                $(".eg-wrapper").append(img);
            }
        });

        if (params.nextClickExt) {
            params.nextClickExt(e);
        }
    };

    previousImage = function(e) {
        index = images.index(currentImage);
        index--;

        if (index < 0) {
            index = images.length - 1;
        }

        currentImage = $(images[index]);

        var img = $("<img />").attr('src', currentImage.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                alert('broken image!');
            } else {
                $(".eg-wrapper img").remove();
                $(".eg-wrapper").append(img);
            }
        });

        if (params.previousClickExt) {
            params.previousClickExt(e);
        }
    };

    drawOverlay = function(target) {
        var overlay = $("<div></div>").addClass("eg-overlay");
        $("body").append(overlay);

        $(".eg-overlay").click(function(e) {
            $(".eg-wrapper").remove();
            $(".eg-overlay").remove();
        });
    };
}( jQuery ));
