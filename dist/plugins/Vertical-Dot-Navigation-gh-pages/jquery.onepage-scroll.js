/* ===========================================================
 * jquery-onepage-scroll.js v1.3
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */

!function ($) {

    var defaults = {
        dotstyle: "fillup",
        sectionContainer: "section",
        easing: "ease",
        animationTime: 1000,
        pagination: true,
        updateURL: false,
        keyboard: true,
        beforeMove: null,
        afterMove: null,
        loop: true,
        responsiveFallback: false,
        direction: 'vertical'
    };

    /*------------------------------------------------*/
    /*  Credit: Eike Send for the awesome swipe event */
    /*------------------------------------------------*/
    var scroll_percent = 0;

    $('.filter').each(function (i, item) {

        $(this).on('click', function () {
            scroll_percent = 0;
            square_loader_down()
        });
    });

    var square_loader_down = function (index) {
        var path = document.querySelector('#svg_square');

        if (path) {

            let pathLength = path.getTotalLength();


            if (scroll_percent < 1698) {

                path.style.display = "block";

                var pathLenghtPartial = Math.floor(pathLength / (total - 1));
                //on click
                if (index) {
                    scroll_percent = pathLenghtPartial * (index - 1);
                }

                //mouse scroll
                else {
                    scroll_percent += pathLenghtPartial;

                }
                    path.style.strokeDasharray = pathLength + ' ' + pathLength;
                    path.style.strokeDashoffset = pathLength - scroll_percent;



            }

        }

    };

    var square_loader_up = function (index) {

        var path = document.querySelector('#svg_square');
        if (path) {
            var pathLength = path.getTotalLength();

            if (scroll_percent <= pathLength && scroll_percent !== 0) {

                var pathLenghtPartial = Math.floor(pathLength / (total - 1));

                if (index) {
                    scroll_percent = pathLenghtPartial * (index - 1 );

                }
                else {
                    scroll_percent -= pathLenghtPartial;

                }

                path.style.strokeDasharray = pathLength + ' ' + pathLength;
                path.style.strokeDashoffset = pathLength - scroll_percent;

            }
        }
    };


    $.fn.swipeEvents = function () {
        return this.each(function () {

            var startX,
                startY,
                $this = $(this);

            $this.bind('touchstart', touchstart);

            function touchstart(event) {
                var touches = event.originalEvent.touches;
                if (touches && touches.length) {
                    startX = touches[0].pageX;
                    startY = touches[0].pageY;
                    $this.bind('touchmove', touchmove);
                }
            }

            function touchmove(event) {
                var touches = event.originalEvent.touches;
                if (touches && touches.length) {
                    var deltaX = startX - touches[0].pageX;
                    var deltaY = startY - touches[0].pageY;

                    if (deltaX >= 50) {
                        $this.trigger("swipeLeft");
                    }
                    if (deltaX <= -50) {
                        $this.trigger("swipeRight");
                    }
                    if (deltaY >= 50) {
                        $this.trigger("swipeUp");

                    }
                    if (deltaY <= -50) {
                        $this.trigger("swipeDown");
                    }
                    if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
                        $this.unbind('touchmove', touchmove);
                    }
                }
            }

        });
    };


    $.fn.onepage_scroll = function (options) {
        var settings = $.extend({}, defaults, options),
            el = $(this),
            sections = $(settings.sectionContainer)
        total = sections.length,
            status = "off",
            topPos = 0,
            leftPos = 0,
            lastAnimation = 0,
            quietPeriod = 500,
            paginationList = "";

        $.fn.transformPage = function (settings, pos, index) {
            if (typeof settings.beforeMove == 'function') settings.beforeMove(index);
            $(this).css({
                "-webkit-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-moz-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "-ms-transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
                "transform": ( settings.direction == 'horizontal' ) ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
                "transition": "all " + settings.animationTime + "ms " + settings.easing
            });
            $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
                if (typeof settings.afterMove == 'function') settings.afterMove(index);
            });
        };


        $.fn.moveDown = function () {

            square_loader_down();
            var el = $(this);
            index = $(settings.sectionContainer + ".current").data("index");
            current = $(settings.sectionContainer + "[data-index='" + index + "']");
            next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");
            if (next.length < 1) {
                if (settings.loop == true) {
                    pos = 0;
                    next = $(settings.sectionContainer + "[data-index='1']");
                } else {
                    return
                }

            } else {
                //pos = (index * 100) * -1;
                pos = (index * 100) * -1;
            }
            if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
            current.removeClass("current")
            next.addClass("current");
            if (settings.pagination == true) {
                $(".onepage-pagination li" + "[data-index='" + index + "']").removeClass("current");
                $(".onepage-pagination li" + "[data-index='" + next.data("index") + "']").addClass("current");
            }

            $("#main-wrapper")[0].className = $("#main-wrapper")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("#main-wrapper").addClass("viewing-page-" + next.data("index"))

            if (history.replaceState && settings.updateURL == true) {
                var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index + 1);
                history.pushState({}, document.title, href);
            }
            el.transformPage(settings, pos, next.data("index"));
        };

        $.fn.moveUp = function () {

            square_loader_up();

            var el = $(this);
            index = $(settings.sectionContainer + ".current").data("index");
            current = $(settings.sectionContainer + "[data-index='" + index + "']");
            next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");
            if (next.length < 1) {
                if (settings.loop == true) {
                    pos = ((total - 1) * 100) * -1;
                    next = $(settings.sectionContainer + "[data-index='" + total + "']");
                }
                else {
                    return
                }
            } else {
                pos = ((next.data("index") - 1) * 100) * -1;
            }
            if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
            current.removeClass("current")
            next.addClass("current")
            if (settings.pagination == true) {
                $(".onepage-pagination li" + "[data-index='" + index + "']").removeClass("current");
                $(".onepage-pagination li" + "[data-index='" + next.data("index") + "']").addClass("current");
            }
            $("#main-wrapper")[0].className = $("#main-wrapper")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
            $("#main-wrapper").addClass("viewing-page-" + next.data("index"))

            if (history.replaceState && settings.updateURL == true) {
                var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index - 1);
                history.pushState({}, document.title, href);
            }
            el.transformPage(settings, pos, next.data("index"));
        };

        $.fn.moveTo = function (page_index, x) {

            current = $(settings.sectionContainer + ".current");
            next = $(settings.sectionContainer + "[data-index='" + (page_index) + "']");


            if (next.length > 0 || x) {

                if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
                current.removeClass("current");
                next.addClass("current");
                $(".onepage-pagination li" + ".current").removeClass("current");
                $(".onepage-pagination li" + "[data-index='" + (page_index) + "']").addClass("current");
                $("#main-wrapper")[0].className = $("#main-wrapper")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
                $("#main-wrapper").addClass("viewing-page-" + next.data("index"))

                pos = ((page_index - 1) * 100) * -1;
                //console.log(pos);

                if (history.replaceState && settings.updateURL == true) {
                    var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (page_index - 1);
                    history.pushState({}, document.title, href);
                }
                el.transformPage(settings, pos, page_index);
            }

        };

        function responsive() {
            //start modification
            var valForTest = false;
            var typeOfRF = typeof settings.responsiveFallback

            if (typeOfRF == "number") {
                valForTest = $(window).width() < settings.responsiveFallback;
            }
            if (typeOfRF == "boolean") {
                valForTest = settings.responsiveFallback;
            }
            if (typeOfRF == "function") {
                valFunction = settings.responsiveFallback();
                valForTest = valFunction;
                typeOFv = typeof valForTest;
                if (typeOFv == "number") {
                    valForTest = $(window).width() < valFunction;
                }
            }

            //end modification
            if (valForTest) {
                $("#main-wrapper").addClass("disabled-onepage-scroll");
                $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
                el.swipeEvents().unbind("swipeDown swipeUp");
            } else {
                if ($("#main-wrapper").hasClass("disabled-onepage-scroll")) {
                    $("#main-wrapper").removeClass("disabled-onepage-scroll");
                    $("pages, #main-wrapper, .wrapper").animate({scrollTop: 0}, "fast");
                }


                el.swipeEvents().bind("swipeDown", function (event) {
                    if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) event.preventDefault();
                    el.moveUp();

                }).bind("swipeUp", function (event) {
                    if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) event.preventDefault();
                    el.moveDown();
                });

                $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
                    event.preventDefault();
                    var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
                    init_scroll(event, delta);
                });
            }
        }

        function init_scroll(event, delta) {
            deltaOfInterest = delta;
            var timeNow = new Date().getTime();
            // Cancel scroll if currently animating or within quiet period
            if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
                event.preventDefault();
                return;
            }

            if (deltaOfInterest < 0) {
                el.moveDown()
            } else {
                el.moveUp()
            }
            lastAnimation = timeNow;
        }

        // Prepare everything before binding wheel scroll

        el.addClass(".onepage-wrapper").css("position", "relative");
        $.each(sections, function (i) {
            $(this).css({

                top: topPos + "%"
            }).addClass("section").attr("data-index", i + 1);


            $(this).css({

                left: ( settings.direction == 'horizontal' )
                    ? leftPos + "%"
                    : 0,
                top: ( settings.direction == 'vertical' || settings.direction != 'horizontal' )
                    ? topPos + "%"
                    : 0
            });

            if (settings.direction == 'horizontal')
                leftPos = leftPos + 100;
            else
                topPos = topPos;


            if (settings.pagination == true) {
                paginationList += "<li data-index='" + (i + 1) + "' href='#" + (i + 1) + "'><a></a></li>"
            }
        });

        el.swipeEvents().bind("swipeDown", function (event) {
            if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) event.preventDefault();
            el.moveUp();
        }).bind("swipeUp", function (event) {
            if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) event.preventDefault();
            el.moveDown();
        });

        // Create Pagination and Display Them
        if (settings.pagination == true) {
            if ($('ul.onepage-pagination.dotstyle.dotstyle-' + settings.dotstyle).length < 1) $("<ul class='onepage-pagination dotstyle dotstyle-" + settings.dotstyle + "'></ul>").prependTo("#main-wrapper");

            if (settings.direction == 'horizontal') {
                posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
                el.find(".onepage-pagination").css("margin-left", posLeft);
            } else {
                posTop = (el.find(".onepage-pagination").height() / 2) * -1;
                el.find(".onepage-pagination").css("margin-top", posTop);
            }
            $('ul.onepage-pagination').html(paginationList);
        }

        if (window.location.hash != "" && window.location.hash != "#1") {
            init_index = window.location.hash.replace("#", "")

            if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
                $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("current")
                $("#main-wrapper").addClass("viewing-page-" + init_index)
                if (settings.pagination == true) {

                    $(".onepage-pagination li" + "[data-index='" + init_index + "']").addClass("current");
                }

                next = $(settings.sectionContainer + "[data-index='" + (init_index) + "']");
                if (next) {

                    next.addClass("current")
                    if (settings.pagination == true) {
                        $(".onepage-pagination li" + "[data-index='" + (init_index) + "']").addClass("current")
                    }
                    ;
                    $("#main-wrapper")[0].className = $("#main-wrapper")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
                    $("#main-wrapper").addClass("viewing-page-" + next.data("index"))
                    if (history.replaceState && settings.updateURL == true) {
                        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (init_index);
                        history.pushState({}, document.title, href);
                    }
                }
                //pos = ((init_index - 1) * 100) * -1;

                el.transformPage(settings, pos, init_index);
            } else {
                $(settings.sectionContainer + "[data-index='1']").addClass("current")
                $("#main-wrapper").addClass("viewing-page-1");
                if (settings.pagination == true) {
                    $(".onepage-pagination li" + "[data-index='1']").addClass("current");
                }
            }
        } else {
            $(settings.sectionContainer + "[data-index='1']").addClass("current");
            $("#main-wrapper").addClass("viewing-page-1");
            if (settings.pagination == true) $(".onepage-pagination li" + "[data-index='1']").addClass("current");
        }

// sqare loader direction fill dependng on dots direction

        if (settings.pagination == true) {

            var lastIndex = '';
            var dots = $(".onepage-pagination > li");
            dots.on('mousedown', function () {
                lastIndex = $('.onepage-pagination li.current').index() + 1;
            });
            dots.on('click', function () {

                var page_index = $(this).data("index");
                el.moveTo(page_index);
                if (lastIndex < page_index) {
                    square_loader_down(page_index)
                }
                else {
                    square_loader_up(page_index)
                }
            });
        }

        $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
            event.preventDefault();
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
        });


        if (settings.responsiveFallback != false) {
            $(window).resize(function () {
                responsive();
            });

            responsive();
        }

        if (settings.keyboard == true) {
            $(document).keydown(function (e) {
                var tag = e.target.tagName.toLowerCase();

                if (!$("#main-wrapper").hasClass("disabled-onepage-scroll")) {
                    switch (e.which) {
                        case 38:
                            if (tag != 'input' && tag != 'textarea') el.moveUp()
                            break;
                        case 40:
                            if (tag != 'input' && tag != 'textarea')
                                el.moveDown()

                            break;
                        case 33: //pageg up
                            if (tag != 'input' && tag != 'textarea') el.moveUp()
                            break;
                        case 34: //page dwn
                            if (tag != 'input' && tag != 'textarea')
                                el.moveDown()

                            break;
                        case 36: //home
                            el.moveTo(1);
                            break;
                        case 35: //end
                            el.moveTo(total);
                            break;
                        default:
                            return;
                    }
                }

            });
        }
        return false;
    }


}(window.jQuery);

