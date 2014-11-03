(function ($) {
    var images, currentImage;
    var params = {};

    $.fn.EasyGallery = function(_params) {
        images = this.find("a");
        if (_params) {
            params = _params;
        }

        if (params.imageClick) {
            images.click(params.imageClick);
        } else {
            images.click(imageClick);
        }
    };

    imageClick = function(e) {
        e.preventDefault();

        if (currentImage) {
            currentImage.removeClass("current");
        }

        drawOverlay($(e.currentTarget));
        drawWrapper($(e.currentTarget));
    };

    drawWrapper = function(target) {
        currentImage = target;
        var wrapper = $("<div></div>").addClass("eg-wrapper");
        var footer = $("<div></div>").addClass("eg-footer");
        var arrows = $("<div></div>").addClass("eg-arrows");

        if (params.imageClickExt) {
            loadCurrentImage(params.imageClickExt);
        } else {
            loadCurrentImage();
        }

        if (images.length > 1) {
            var backArrow = $("<div></div>").addClass("eg-back").addClass("eg-icon");
            var forwardArrow = $("<div></div>").addClass("eg-forward").addClass("eg-icon");

            arrows.append(backArrow);
            arrows.append(forwardArrow);

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
            var defaultParams = {
                class: '',
                title: '',
                click: function (e) {
                }
            };

            for (var x = 0; x < length; x++) {
                var icon = $("<div></div>").addClass("eg-icon");
                var footerIcon = $.extend({}, defaultParams, params.footer[x]);

                icon.css("background-image", "url("+footerIcon.icon+")");
                icon.addClass(footerIcon.class);
                icon.attr("title", footerIcon.title);

                if (params.footer[x].class) {
                    icon.addClass(params.footer[x].class);
                }

                footer.append(icon);
                icon.click(footerIcon.click);
            }
        }

        var closeBtn = $("<div></div>").addClass("eg-close");
        wrapper.append(closeBtn);
        wrapper.append(footer);
        wrapper.append(arrows);
        $("body").append(wrapper);

        $(".eg-wrapper").click(function(e) {
            e.stopPropagation();
        });

        if (params.closeClick) {
            closeBtn.click(params.closeClick);
        } else {
            closeBtn.click(function(e) {
                if (currentImage) {
                    currentImage.removeClass("current");
                }

                $(".eg-wrapper").remove();
                $(".eg-overlay").remove();

                if (params.closeClickExt) {
                    params.closeClickExt();
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

        if (currentImage) {
            currentImage.removeClass("current");
        }

        currentImage = $(images[index]);

        if (params.nextClickExt) {
            loadCurrentImage(params.nextClickExt());
        } else {
            loadCurrentImage();
        }
    };

    loadCurrentImage = function(_callback) {
        currentImage.addClass("current");
        var img = $("<img />").attr('src', currentImage.attr("href")).load(function() {
            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth === 0) {
                alert('broken image!');
            } else {
                attrs = currentImage.data();
                for (var prop in attrs) {
                    img.attr("data-" + prop, attrs[prop]);
                }

                var width = this.width;
                var height = this.height;

                if (height > $(window).height() || width > $(window).width()) {
                    if ($(window).height() > $(window).width()) {
                        width = $(window).width();
                        height = $(window).width();
                    } else {
                        width = $(window).height();
                        height = $(window).height();
                    }

                    height -= 60;
                    /*
                     *width -= 60;
                     */
                }

                $(".eg-wrapper img").remove();
                $(".eg-wrapper").css("width", width);
                $(".eg-wrapper").css("height", height);
                $(".eg-wrapper").append(img);

                if (_callback) {
                    _callback();
                }
            }
        });
    };

    previousImage = function(e) {
        index = images.index(currentImage);
        index--;

        if (currentImage) {
            currentImage.removeClass("current");
        }

        if (index < 0) {
            index = images.length - 1;
        }

        currentImage = $(images[index]);

        if (params.previousClickExt) {
            loadCurrentImage(params.previousClickExt);
        } else {
            loadCurrentImage();
        }
    };

    drawOverlay = function(target) {
        var overlay = $("<div></div>").addClass("eg-overlay");
        $("body").append(overlay);

        $(".eg-overlay").click(function(e) {
            if (currentImage) {
                currentImage.removeClass("current");
            }

            $(".eg-wrapper").remove();
            $(".eg-overlay").remove();
        });
    };
}( jQuery ));
