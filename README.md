#EasyGallery
An easy and customizable "lightbox" style gallery, for every developer sick of the mess of existing solutions. 
Though currently very early in development we provide extra functionality such as the ability to add custom footer
icons with callback functions, as well override (or extend) may of the core functions.
Another handy feature we provide is every data-\* attribute you attach to the <a /> tag will be automatically added to the full size version on load.


##Credits
* [Geomicons](https://www.iconfinder.com/iconsets/geomicons) - Icons
* [{lorempixel}](http://lorempixel.com/) - Placeholder images

##Footer Icons
Its super easy to add new icons with click handlers to the footer!
```
    var flag = {
        icon: "/content/warning.svg",
        click: function(e) {
            alert("This image has been flagged");
        }
    };

    var params = {
        footer: [flag],
    };
```

##ToDo
* Add keyboard support

##License
This tool is protected by the [GNU General Public License v2](http://www.gnu.org/licenses/gpl-2.0.html).

Copyright [Jeffrey Hann](http://jeffreyhann.ca/) 2014
