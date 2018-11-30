//tabs//

function changeTab(tab_id, cont) {

    let i, tab_btn, tab_cont;

    tab_btn = document.getElementsByClassName('tab');
    tab_cont = document.getElementsByClassName('tab_content');

    for (i = 0; i < tab_cont.length; i++) {
        tab_cont[i].style.display = "none";
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
  setTimeout( function() {

    $('.grid').isotope({
        itemSelector: '.grid-item',
        masonry: {
            horizontalOrder: true,
            percentPosition: true,
            columnWidth: 370,
            gutter: 4
        }
    });

    }, 100);
}

$(document).ready(function () {

//loader//
    function loaded() {
        $('.loading').fadeOut();

    }
    //wait for images to load

    var $container = $(".grid");
    if ($container.length) {
        $container.imagesLoaded(function () {
            $('.grid').isotope({
                itemSelector: '.grid-item',
                masonry: {
                    horizontalOrder: true,
                    percentPosition: true,
                    columnWidth: 370,
                    gutter: 4,
                }
            });
        });
    }



    //onload square

    function Onload() {
        $(".square-empty").addClass("load_transition");
        $('.sections').addClass('load_transition2');


    }

    window.onload = loaded();
    window.onload = Onload();

    //move eyes

    if ($('#eyes').length) {

        $("#main-wrapper").mousemove(function (e) {

            let image_eyes = document.getElementById('eyes');

            if (e.clientX <= 660 && e.clientY >= 230 && e.clientY <= 300) {
                image_eyes.src = './dist/assets/images/o_meni/left.png'
            }
            else if (e.clientX >= 660 && e.clientY >= 230 && e.clientY <= 300) {
                image_eyes.src = './dist/assets/images/o_meni/right.png'
            }
            else if (e.clientY >= 230) {
                image_eyes.src = './dist/assets/images/o_meni/down.png'
            }
            else if (e.clientY <= 230) {

                image_eyes.src = './dist/assets/images/o_meni/up.png'

            }
            else {
                image_eyes.src = './dist/assets/images/o_meni/left.png'
            }
        })
    }

    //flip-item

    if ($(".m-flip_item").length) {

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


        $('.js-flip').flip();

    }

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


    if ($('#rtb_link').length) {

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

        function removehighlightLink() {
            highlight.style.opacity = 0;


        }

        rtb.addEventListener('mouseenter', highlightLink);
        rtb2.addEventListener('mouseenter', highlightLink);

        rtb.addEventListener('focus', highlightLink);
        rtb2.addEventListener('focus', highlightLink);

        rtb2.addEventListener('mouseout', removehighlightLink);
    }

//paralax

    var container = $("#main-wrapper");
    if (window.innerWidth > 800) {

        container.on('mousemove', function (e) {

            let image = $(".square-image");
            let title = $('.welcome');
            let pretitle = $('.pre-title');

            paralax(e, image, -20);
            paralax(e, title, -70);
            paralax(e, pretitle, -50);


        });
    }

    function paralax(e, target, movement) {

        let relX = e.pageX - container.offset().left;
        let relY = e.pageY - container.offset().top;

        let x = (relX - container.width() / 2) / container.width() * movement;
        let y = (relY - container.height() / 2) / container.height() * movement;


        target.css({"-webkit-transform": "translate(" + x + "px," + y + "px)"});
    }

//change page arrows

    let prev = $('.prev_next:nth-child(1)');
    let next = $('.prev_next:nth-child(2)');
    let pre_disabled = $('.prev_next:nth-child(1) > strong > i');
    let nxt_disabled = $('.prev_next:nth-child(2) > strong > i');

    $.get('../php/directory_count.php', function (data) {

        let arr = [];
        let dir = JSON.parse(data);

        let pathArray = window.location.pathname.split('/');
        let last_path = pathArray.slice(pathArray.length - 2, pathArray.length - 1);

        for (let i = 0; i < dir.length; i++) {
            arr.push(dir[i].slice(9));

        }
        if (arr[0] == last_path) {

            nxt_disabled.addClass('disabled-arrow');
        }
        if (arr[arr.length - 1] == last_path) {
            pre_disabled.addClass('disabled-arrow');
        }

        prev.on('click', function () {

            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == last_path) {

                    if (j < arr.length - 1) {
                        window.location.pathname = "http://mariaherart.com/works/" + arr[j + 1];
                    }

                    else {
                        pre_disabled.css('pointer-events', 'none');
                    }

                }
            }

        });

        next.on('click', function () {

            for (let j = 0; j < arr.length; j++) {
                if (arr[j] == last_path) {
                    if (j > 0) {
                        window.location.pathname = "http://mariaherart.com/works/" + arr[j - 1];
                    }

                    else {
                        nxt_disabled.css('pointer-events', 'none');

                    }
                }
            }

        });


    });


//filters

    let filter_name = $('.filter');
    if (filter_name.length) {

        let container = $('.main');

        filter_name.each(function (i, item) {

            $(this).on('click', function () {
                $.fn.moveUp();
                $.fn.moveTo(1, true);

                let current = $(this).attr('data-filter');
                jQuery.fn.sortDomElements = (function () {
                    return function (comparator) {
                        return Array.prototype.sort.call(this, comparator).each(function (i) {
                            this.parentNode.appendChild(this);
                        });
                    };
                })();

                container.children().sortDomElements(function (a, b) {
                    if (current === 'name') {

                        akey = $(a).attr("data-name");
                        bkey = $(b).attr("data-name");

                    }

                    else if (current === 'new') {
                        akey = $(a).attr("data-new");
                        bkey = $(b).attr("data-new");

                    }
                    else if (current === 'old') {
                        akey = $(a).attr("data-old");
                        bkey = $(b).attr("data-old");


                    }

                    if (akey === bkey) return 0;
                    if (akey < bkey) return -1;
                    if (akey > bkey) return 1;

                });

            });

        });
    }


//change section height according to a browser height

    function findHeight() {
        let window_height = window.innerHeight;
        $('.list-sections').css("height", window_height);
        $('.sections-man-wrapper').css("height", window_height);
    }

    findHeight();

    //background 360 video

    if ($('.animation').length) {
        let containerSelector = '#container360';
        let viewer = new Kaleidoscope.Video({
            source: '../../assets/video/Animation_video.mp4',
            containerId: containerSelector,
            height: window.innerHeight,
            width: window.innerWidth
        });
        viewer.render();

        window.onresize = function () {
            viewer.setSize({height: window.innerHeight, width: window.innerWidth});
        };
        document.querySelector(containerSelector).addEventListener('touchend', viewer.play.bind(viewer));
    }

    //contact envelope gif

    let links = $(".envelope_links");
    $(".gif-container > img").on('click', function () {
        $(this).attr('src', '../../dist/assets/images/kontakt/envelope.gif');
        if (links.css('display', 'none')) {
            setTimeout(function () {
                links.css('display', 'block');
            }, 3000);
        }
        else {
            links.css('display', 'none');
        }

    });

    //links toggle

    $("div.about_me > p > span.see-more").on("click", function () {
        $(this).next("small").toggle();
    });

    //lightroom

    window.addEventListener('DOMContentLoaded', function () {
        new SmartPhoto(".js-smartPhoto");
    });

    $(function () {
        let smartphoto = $(".js-smartPhoto");
        if(smartphoto.length){
            smartphoto.SmartPhoto();
        }

    });

    //scroll to top btn
    if($("#scroll_top").length){
        $("#scroll_top").on('click', function () {
            console.log('scroll');
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;

        })
    }
    // function createCircleOverlay(previewEl) {
    //     let dummy = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //     dummy.setAttributeNS(null, 'version', '1.1');
    //     dummy.setAttributeNS(null, 'width', '100%');
    //     dummy.setAttributeNS(null, 'height', '100%');
    //     dummy.setAttributeNS(null, 'class', 'overlay');
    //     let g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    //     let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    //     circle.setAttributeNS(null, 'cx', 0);
    //     circle.setAttributeNS(null, 'cy', 0);
    //     circle.setAttributeNS(null, 'r', Math.sqrt(Math.pow(previewEl.offsetWidth, 2) + Math.pow(previewEl.offsetHeight, 2)));
    //     dummy.appendChild(g);
    //     g.appendChild(circle);
    //     previewEl.appendChild(dummy);
    // }
    //
    // let defaultObj = {
    //
    //     onInit: function (instance) {
    //         createCircleOverlay(instance.previewEl);
    //     },
    //     onResize: function (instance) {
    //         instance.previewEl.querySelector('svg circle').setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
    //     },
    //     onOpenItem: function (instance, item) {
    //         // item's image
    //         let gridImg = item.querySelector('img'),
    //             gridImgOffset = gridImg.getBoundingClientRect(),
    //             win = {width: document.documentElement.clientWidth, height: window.innerHeight},
    //             SVGCircleGroupEl = instance.previewEl.querySelector('svg > g'),
    //             SVGCircleEl = SVGCircleGroupEl.querySelector('circle');
    //
    //         SVGCircleEl.setAttributeNS(null, 'r', Math.sqrt(Math.pow(instance.previewEl.offsetWidth, 2) + Math.pow(instance.previewEl.offsetHeight, 2)));
    //         // set the transform for the SVG g node. This will animate the circle overlay. The origin of the circle depends on the position of the clicked item.
    //         if (gridImgOffset.left + gridImg.offsetWidth / 2 < win.width / 2) {
    //             SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(' + win.width + ', ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
    //         }
    //         else {
    //             SVGCircleGroupEl.setAttributeNS(null, 'transform', 'translate(0, ' + (gridImgOffset.top + gridImg.offsetHeight / 2 < win.height / 2 ? win.height : 0) + ')');
    //         }
    //     },
    // };


    // if ($('.ispisavanje').length) {
    //
    //     new GridFx(document.querySelector('.grid-1'), defaultObj);
    //
    // }
    //
    // if ($('.rtb').length) {
    //     //new GridFx(document.querySelector('.grid-2'), defaultObj);
    //     new GridFx(document.querySelector('.grid-3'), defaultObj);
    //     new GridFx(document.querySelector('.grid-4'), defaultObj);
    //     new GridFx(document.querySelector('.grid-5'), defaultObj);
    //     new GridFx(document.querySelector('.grid-6'), defaultObj);
    //     new GridFx(document.querySelector('.grid-7'), defaultObj);
    //     //new GridFx(document.querySelector('.grid-8'), defaultObj);
    // }

});