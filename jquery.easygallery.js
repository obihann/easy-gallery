(function ($) {
    var images, currentImage;

    $.fn.EasyGallery = function() {
        images = this.find("a");
        images.click(imageClick);
    };

    imageClick = function(e) {
        e.preventDefault();
        drawOverlay($(e.currentTarget));
        drawWrapper($(e.currentTarget));
    }

    drawWrapper = function(target) {
        currentImage = target;
        var wrapper = $("<div></div>").addClass("eg-wrapper");

        var img = $("<img />").attr('src', target.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                alert('broken image!');
            } else {
                $(".eg-wrapper").append(img);
            }
        });

        if (images.length > 1) {
            var backArrow = $("<div></div>").addClass("eg-back");
            var forwardArrow = $("<div></div>").addClass("eg-forward");

            wrapper.append(backArrow);
            wrapper.append(forwardArrow);

            backArrow.click(previousImage);
            forwardArrow.click(nextImage);
        }

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

        console.log(images.length);

        currentImage = $(images[index]);
        console.log(currentImage);

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
