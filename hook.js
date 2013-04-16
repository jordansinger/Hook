$(function () {
    $('#hook').hook();
});

;(function ( $, window, document, undefined ) {
    var win = $(this),
            st = win.scrollTop() || window.pageYOffset,
            hasTouch = function() {
              return !!('ontouchstart' in window) || !!('onmsgesturechange' in window);
            };

        win.scroll(function(){
            st = win.scrollTop();
        });

    var methods = {

        init: function(options) {

                return this.each(function() {
                    var $this = $(this),
                        settings = $this.data('hook');
                        height = $this.height();

                        if(typeof(settings) == 'undefined') {

                                var defaults = {
                                    reloadPage: true, // if false will reload element
                                    dynamic: true, // if false Hook elements already there
                                    textRequired: false, // will input loader text if true
                                    swipeDistance: 50, // swipe distance for loader to show on touch devices
                                    loaderClass: 'hook-loader',
                                    spinnerClass: 'hook-spinner',
                                    loaderTextClass: 'hook-text',
                                    loaderText: 'Reloading...'
                                };

                                settings = $.extend({},  defaults, options);

                                $this.data('hook', settings);
                        } else {

                                settings = $.extend({}, settings, options);
                        }

                        if(settings.dynamic === true) {
                             var loaderElem = '<div class=' + settings.loaderClass + '>';
                                     loaderElem += '<div class='+ settings.spinnerClass + '/>';
                                     loaderElem += '</div>';
                             var spinnerTextElem = '<span class='+ settings.spinnerClass + '>' + settings.loaderText + '</span>';

                             $this
                                     .append(loaderElem);

                             if (settings.textRequired === true) {
                                 $this.append(spinnerTextElem);
                             }

                        }

                        if(!hasTouch()) {
                            win.bind('mousewheel', function(event, delta) {
                                methods.onScroll($this, settings, delta);
                            });
                        }  else {
                            var lastY = 0,
                                 swipe = 0;
                            win.on('touchstart', function(e){
                                lastY = e.originalEvent.touches[0].pageY;
                            });

                            win.on('touchmove', function(e) {
                                swipe = e.originalEvent.touches[0].pageY + lastY;
                                st = $(this).scrollTop();

                                if(swipe < settings.swipeDistance) {
                                    e.preventDefault();
                                }

                                if(swipe > settings.swipeDistance && lastY <= 40) {
                                    methods.onSwipe($this, settings);
                                }
                            });

                            win.on('touchend', function(){
                                swipe = 0;
                            });
                        }

                });
        },

        onScroll: function(el, settings,delta) {
            if(delta > 10 && st <= 0)
            {
                methods.reload(el, settings);
            }
        },

        onSwipe: function(el, settings, swipe) {
            if(st <= 0) {
                methods.reload(el, settings);
            }
        },

        reload: function(el, settings) {
            var reloadEvent;

            if(settings.reloadPage === false) {
                reloadEvent = new Event('reloaded');
                window.dispatchEvent(reloadEvent);

            } else {

                el.show();
                el.animate({
                    "marginTop": "0px"
                }, 200);
                el.delay(500).slideUp(200, function () {
                    window.location.reload(true);
                });
            }
        },

        destroy: function(options) {
            return $(this).each(function(){
                var $this = $(this);

                $this.empty();
                $this.removeData('hook');
            });
        }
    };

    $.fn.hook = function (options ) {
        var method = arguments[0];

        if(methods[method]) {
            method = methods[method];
            arguments = Array.prototype.slice.call(arguments, 1);
        } else if (typeof(method) == 'object' || !method) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
                        return this;
        }

        return method.apply(this, arguments);
    };

})( jQuery, window, document );