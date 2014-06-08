#EasyGallery
An easy and customizable "lightbox" style gallery, for every developer sick of the mess of existing solutions. 
Though currently very early in development we provide extra functionality such as the ability to add custom footer
icons with callback functions, as well override (or extend) may of the core functions.
Another handy feature we provide is every data-\* attribute you attach to the <a /> tag will be automatically added to the full size version on load.

##Setup
Nice and simple
```
<body>
    <div class="carousel">
        <div class="thumb">
            <a href="images/1.jpeg" rel="carousel" data-uniq="a" data-color="green"><img src="images/1.jpeg" /></a>
        </div>
        <div class="thumb">
            <a href="images/2.jpeg" rel="carousel" data-uniq="mouse" data-color="pink"><img src="images/2.jpeg" /></a>
        </div>
    </div>
</body>
```
One line... like every plugin :)
```
$(".carousel").EasyGallery();
```

##Params
###Footer Icons
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
    
    $(".carousel").EasyGallery(params);
```

###Overriding a function
You dont like how I do X, then do it yourself! The following can be overridden:
* closeBtn
* previousClick
* nextClick
* imageClick
* 
```
    var params = {
        closeBtn: function(e) {
            console.log(123);
        }
    };
    
    $(".carousel").EasyGallery(params);
```

###Extending a function
Incase my functions are lacking, you can go crazy and extend them all you want and your code will be executed after mine.
The following can be extended:
* closeBtnExt
* previousClickExt
* nextClickExt
* imageClickExt
* 
```
    var params = {
        closeBtnExt: function(e) {
            console.log(123);
        }
    };
    
    $(".carousel").EasyGallery(params);
```

##ToDo
* Add keyboard support

##Credits
* [Geomicons](https://www.iconfinder.com/iconsets/geomicons) - Icons
* [{lorempixel}](http://lorempixel.com/) - Placeholder images

##License
This tool is protected by the [GNU General Public License v2](http://www.gnu.org/licenses/gpl-2.0.html).

Copyright [Jeffrey Hann](http://jeffreyhann.ca/) 2014
