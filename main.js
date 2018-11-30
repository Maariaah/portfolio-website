//move eyes

let image_eyes = document.getElementById('eyes');
if (image_eyes) {
    onmousemove = function (e) {
        let image_eyes = document.getElementById('eyes');

        if (e.clientX <= 660 && e.clientY >= 230 && e.clientY <= 300) {
            image_eyes.src = '../../src/images/o_meni/left.png'
        }
        else if (e.clientX >= 660 && e.clientY >= 230 && e.clientY <= 300) {
            image_eyes.src = '../../src/images/o_meni/right.png'
        }
        else if (e.clientY >= 230) {
            image_eyes.src = '../../src/images/o_meni/down.png'
        }
        else if (e.clientY <= 230) {

            image_eyes.src = '../../src/images/o_meni/up.png'

        }
        else {
            image_eyes.src = '../../src/images/o_meni/left.png'
        }
    }
}
//flip-item

let m = document.getElementsByClassName(".m-flip_item");
if (m) {

    (function ($) {
        $.fn.flip = function (options) {
            options = $.extend({
                targetClass: '.m-flip_item'
            }, options);

            return this.each(function () {
                let $this = $(this),
                    $target = $this.find(options.targetClass);

                $this
                    .on({
                        'init.flip': function () {
                            let targetFirst_height = $target.eq(0).height();

                            $this
                                .data('height', targetFirst_height)
                                .css({height: targetFirst_height});
                        },
                        'mouseenter.flip': function () {
                            $target.css({top: -$this.data('height') + 'px'});
                        },
                        'mouseleave.flip': function () {
                            $target.css({top: 0 + 'px'});
                        }
                    })
                    .trigger('init.flip');
            });
        };
    }(jQuery));

    $(function () {
        $('.js-flip').flip();
    });
}
function findHeight() {
    let window_height = window.innerHeight;
    $('sections').css("height", window_height);
    $('.sections-man-wrapper').css("height", window_height);
}

findHeight();

function createCircleOverlay(previewEl) {
    let dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dummy.setAttributeNS(null, 'version', '1.1');
    dummy.setAttributeNS(null, 'width', '100%');
    dummy.setAttributeNS(null, 'height', '100%');
    dummy.setAttributeNS(null, 'class', 'overlay');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttributeNS(null, 'cx', 0);
    circle.setAttributeNS(null, 'cy', 0);
    circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(previewEl.offsetWidth, 2) + Math.pow(previewEl.offsetHeight, 2)));
    dummy.appendChild(g);
    g.appendChild(circle);
    previewEl.appendChild(dummy);
}

let defaultObj = {

    onInit: function (instance) {
        createCircleOverlay(instance.previewEl);
    },
    onResize: function (instance) {
        instance.previewEl.querySelector('svg circle').setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
    },
    onOpenItem: function (instance, item) {
        // item's image
        let gridImg = item.querySelector('img'),
            gridImgOffset = gridImg.getBoundingClientRect(),
            win = {width: document.documentElement.clientWidth, height: window.innerHeight},
            SVGCircleGroupEl = instance.previewEl.querySelector('svg > g'),
            SVGCircleEl = SVGCircleGroupEl.querySelector('circle');

        SVGCircleEl.setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
        // set the transform for the SVG g node. This will animate the circle overlay. The origin of the circle depends on the position of the clicked item.
        if (gridImgOffset.left + gridImg.offsetWidth / 2 < win.width / 2) {
            SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(' + win.width + ', ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
        }
        else {
            SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(0, ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
        }
    },
};


afterInitialize();

function afterInitialize() {
    setTimeout(function () {
        for (let i = 2; i < $(".tab_content").length + 1; i++) {
            $("#content" + i).css("display", "none");
        }

    }, 500)
}

new GridFx(document.querySelector('.grid-2'), defaultObj);
new GridFx(document.querySelector('.grid-4'), defaultObj);
new GridFx(document.querySelector('.grid-5'), defaultObj);
new GridFx(document.querySelector('.grid-6'), defaultObj);
new GridFx(document.querySelector('.grid-7'), defaultObj);
new GridFx(document.querySelector('.grid-8'), defaultObj);
$(document).ready(function () {

    const rtb = document.getElementById('rtb_link');
    const rtb2 = document.getElementById('rtb_link2');
    const highlight = document.createElement('span');
    highlight.classList.add('highlight');
    document.body.append(highlight);

    function highlightLink() {
        const linkCoords = this.getBoundingClientRect();
        highlight.style.opacity = 1;
        const coords = {
            width: linkCoords.width + 5,
            height: linkCoords.height + 5,
            top: linkCoords.top + window.scrollY,
            left: linkCoords.left + window.scrollX
        };

        highlight.style.width = `${coords.width + 30}px`;
        highlight.style.height = `${coords.height + 20}px`;
        highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    }

    function removehighlightLink(){
        highlight.style.opacity = 0;

    }

    rtb.addEventListener('mouseenter', highlightLink);
    rtb2.addEventListener('mouseenter', highlightLink);

    rtb.addEventListener('focus', highlightLink);
    rtb2.addEventListener('focus', highlightLink);

    rtb2.addEventListener('mouseout', removehighlightLink);
});
function findHeight() {
    let window_height = window.innerHeight;
    $('sections').css("height", window_height);
    $('.sections-man-wrapper').css("height", window_height);
}

findHeight();

function createCircleOverlay(previewEl) {
    let dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    dummy.setAttributeNS(null, 'version', '1.1');
    dummy.setAttributeNS(null, 'width', '100%');
    dummy.setAttributeNS(null, 'height', '100%');
    dummy.setAttributeNS(null, 'class', 'overlay');
    let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttributeNS(null, 'cx', 0);
    circle.setAttributeNS(null, 'cy', 0);
    circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(previewEl.offsetWidth, 2) + Math.pow(previewEl.offsetHeight, 2)));
    dummy.appendChild(g);
    g.appendChild(circle);
    previewEl.appendChild(dummy);
}

let defaultObj = {

    onInit: function (instance) {
        createCircleOverlay(instance.previewEl);
    },
    onResize: function (instance) {
        instance.previewEl.querySelector('svg circle').setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
    },
    onOpenItem: function (instance, item) {
        // item's image
        let gridImg = item.querySelector('img'),
            gridImgOffset = gridImg.getBoundingClientRect(),
            win = {width: document.documentElement.clientWidth, height: window.innerHeight},
            SVGCircleGroupEl = instance.previewEl.querySelector('svg > g'),
            SVGCircleEl = SVGCircleGroupEl.querySelector('circle');

        SVGCircleEl.setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
        // set the transform for the SVG g node. This will animate the circle overlay. The origin of the circle depends on the position of the clicked item.
        if (gridImgOffset.left + gridImg.offsetWidth / 2 < win.width / 2) {
            SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(' + win.width + ', ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
        }
        else {
            SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(0, ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
        }
    },
};


afterInitialize();

function afterInitialize() {
    setTimeout(function () {
        for (let i = 2; i < $(".tab_content").length + 1; i++) {
            $("#content" + i).css("display", "none");
        }

    }, 500)
}

new GridFx(document.querySelector('.grid-1'), defaultObj);
'use strict';
$(document).ready(function () {

// loader

    function loaded(){
        $('.loading').fadeOut();
    }

    //onload square

    function Onload() {
        $(".square-empty").addClass("load_transition");
        $('.sections').addClass('load_transition2');

    }
    window.onload = loaded();
    window.onload = Onload();


    //one-page scroll

    let scrollWrapper = $('.sections-man-wrapper');

    if (scrollWrapper.length) {
        scrollWrapper.onepage_scroll({
            dotstyle: "fillup",              // dotstyle let you choose which cool style you want to use, default is "fillup",
            sectionContainer: ".sections",     // sectionContainer accepts any kind of selector in case you don't want to use section
            easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",// "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
            animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
            pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
            updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
            beforeMove: function (index) {
            },  // This option accepts a callback function. The function will be called before the page moves.
            afterMove: function (index) {
            },   // This option accepts a callback function. The function will be called after the page moves.
            loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
            keyboard: true,                  // You can activate the keyboard controls
            responsiveFallback: false,       // You can fallback to normal page scroll by defining the width of the browser in which
            // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
            // the browser's width is less than 600, the fallback will kick in.
            direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
        });
    }

    //change section height according to a browser height

    function findHeight() {
        let window_height = window.innerHeight;
        $('sections').css("height", window_height);
        $('.sections-man-wrapper').css("height", window_height);
    }

    findHeight();

    function createCircleOverlay(previewEl) {
        let dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        dummy.setAttributeNS(null, 'version', '1.1');
        dummy.setAttributeNS(null, 'width', '100%');
        dummy.setAttributeNS(null, 'height', '100%');
        dummy.setAttributeNS(null, 'class', 'overlay');
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttributeNS(null, 'cx', 0);
        circle.setAttributeNS(null, 'cy', 0);
        circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(previewEl.offsetWidth, 2) + Math.pow(previewEl.offsetHeight, 2)));
        dummy.appendChild(g);
        g.appendChild(circle);
        previewEl.appendChild(dummy);
    }
    //
    let defaultObj = {

        onInit: function (instance) {
            createCircleOverlay(instance.previewEl);
        },
        onResize: function (instance) {
            instance.previewEl.querySelector('svg circle').setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
        },
        onOpenItem: function (instance, item) {
            // item's image
            let gridImg = item.querySelector('img'),
                gridImgOffset = gridImg.getBoundingClientRect(),
                win = {width: document.documentElement.clientWidth, height: window.innerHeight},
                SVGCircleGroupEl = instance.previewEl.querySelector('svg > g'),
                SVGCircleEl = SVGCircleGroupEl.querySelector('circle');

            SVGCircleEl.setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
            // set the transform for the SVG g node. This will animate the circle overlay. The origin of the circle depends on the position of the clicked item.
            if (gridImgOffset.left + gridImg.offsetWidth / 2 < win.width / 2) {
                SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(' + win.width + ', ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
            }
            else {
                SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(0, ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
            }
        },
    };


    afterInitialize();

    function afterInitialize() {
        setTimeout(function () {
            for (let i = 2; i < $(".tab_content").length + 1; i++) {
                $("#content" + i).css("display", "none");
            }

        }, 700)
    }

    //fade in effect

        $(window).on('scroll', function () {

            //small images
            $('.item').each(function (i) {

                let bottom_of_object = $(this).position().top + $(this).outerHeight();
                let bottom_of_window = $(window).scrollTop() + $(window).height();

                /* If the object is completely visible in the window, fade it it */
                if (bottom_of_window > bottom_of_object) {

                    $(this).animate({'opacity': '1'}, 1500);

                }

            });

            //big images
            $('.item2').each(function (i) {

                let bottom_of_object = $(this).position().top + $(this).outerHeight();
                let bottom_of_window = $(window).scrollTop() + $(window).height();

                /* If the object is completely visible in the window, fade it it */
                if (bottom_of_window > bottom_of_object) {

                    $(this).animate({'opacity': '1'}, 1400);
                }

            });

        });

});

//loader//
let path = document.getElementById('svg_square2');
if (path) {
    let loading = 0;
    let loadingInterval = setInterval(Loader, 20);

    function Loader() {

        let pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
        path.style.strokeDashoffset = pathLength;

        if (loading === 100) {
            clearInterval(loadingInterval);
            window.open('index.html', '_self')
        }
        else {
            loading += 1;
        }
    }
}

$(document).ready(function () {
(function(){
    var gif=  $('#pageLoader');
    var loading = 0;
    var id = setInterval(LoadingGif(), 1000);


        function LoadingGif() {
            if(loading = 10){
                clearInterval(id);
               //gif.css('display', 'block');

                console.log('LOADED!')
            }

            else{
                loading += 1;
                console.log('loading')

            }
        }
})();
})();
$("#main-wrapper").mousemove(function (e) {

    let image = $(".square-image");
    let title = $('.welcome');
    paralax(e, image, -20);
    paralax(e, title, -70)
});

function paralax(e, target, movement) {
    let container = $("#main-wrapper");

    let relX = e.pageX - container.offset().left;
    let relY = e.pageY - container.offset().top;

    let x = (relX - container.width() / 2) / container.width() * movement;
    let y = (relY - container.height() / 2) / container.height() * movement;

    target.css("-webkit-transform", "translateX(" + x + "px)");
   target.css("transform", "translateY(" + y + "px)");
}

let image = $(".portfolio");
let title = $(".portfolio:nth-child(even)");
let screen = 0;

$(".gallery-row2").on('mousewheel', function () {



});




//tabs//

function changeTab(tab_id, cont) {


    let i, tab_btn, tab_cont;

    tab_btn = document.getElementsByClassName('tab');
    tab_cont = document.getElementsByClassName('tab_content');

    for (i = 0; i < tab_cont.length; i++) {
        tab_cont [i].style.display = "none";
    }
    let content = document.getElementById(cont);

    content.style.removeProperty('display');
    content.style.display = "block";

    for (i = 0; i < tab_btn.length; i++) {
        tab_btn[i].className = tab_btn[i].className.replace("active", "");
        tab_btn[i].className = 'tab link-1'
    }
    let x = document.getElementById(tab_id);
    x.className = 'tab active link-1';



}
