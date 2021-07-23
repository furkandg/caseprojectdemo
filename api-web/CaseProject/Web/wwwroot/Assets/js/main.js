/**
 * createIT main javascript file.
 */

(function ($) {
	"use strict";

    var $searchform;
	var $loginform;
	var $devicewidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	var $deviceheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

	/* ========================== */
	/* ==== HELPER FUNCTIONS ==== */

	function validatedata($attr, $defaultValue) {
		if ($attr !== undefined) {
			return $attr
		}
		return $defaultValue;
	}

	function parseBoolean(str, $defaultValue) {
		if (str == 'true') {
			return true;
		} else if (str == "false") {
			return false;
		}
		return $defaultValue;
	}

	// left: 37, up: 38, right: 39, down: 40,
	// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
	var keys = [37, 38, 39, 40];

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault) {
			e.preventDefault();
		}
		e.returnValue = false;
	}

	function keydown(e) {
		for (var i = keys.length; i--;) {
			if (e.keyCode === keys[i]) {
				preventDefault(e);
				return;
			}
		}
	}

	function wheel(e) {
		preventDefault(e);
	}

	function disable_scroll() {
		if (window.addEventListener) {
			window.addEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = wheel;
		document.onkeydown = keydown;
	}

	function enable_scroll() {
		if (window.removeEventListener) {
			window.removeEventListener('DOMMouseScroll', wheel, false);
		}
		window.onmousewheel = document.onmousewheel = document.onkeydown = null;
	}

	$(document).ready(function () {

		// start with (because fixed navigation)
		$(window).trigger("scroll");


		if ($().pageScroller) {
			$('body.onepager').pageScroller({
				navigation: '.onepage', sectionClass: 'scroll', scrollOffset: -80
			});
		}

		/* ======================================= */
		/* === CLICKABLE MAIN PARENT ITEM MENU === */
        $(".navbar li.dropdown > .dropdown-toggle").removeAttr("data-toggle data-target");
		if($devicewidth < 768){
            $(".navbar li.dropdown > .dropdown-toggle").click(function(e){
                e.preventDefault();
                $(this).parent().toggleClass('open');
            })
        }

		/* =============================== */
		/* === RESPONSIVE MENU SIDEBAR === */
		/*$(".navbar-toggle").click(function(){
		 $("body").toggleClass("disable-scroll");
		 $("html").toggleClass("disable-scroll");
		 })*/

		if ($devicewidth < 768) {
			var snapper = new Snap({
				element: document.getElementById('wrapper'), disable: 'right', maxPosition: 260, minPosition: 0, addBodyClasses: true
			});

			$(".navbar-toggle").click(function () {
				snapper.open('left');
			});
		}

		/* ====================== */
		/* === SIDEBAR TOGGLE === */
		$(".navbar-sidebar-toggle").click(function () {
			if ($("nav.navbar").is(".open")) {
				$("nav.navbar").removeClass("open");
			} else {
				$("nav.navbar").addClass("open");
			}
		});

		$(document).on({
			mouseenter: function (e) {
				//stuff to do on mouse enter
				if (($(e.target).is(".showHeaderSearch") )) {
				} else {
					$("nav.navbar").addClass("open");
				}
			}, mouseleave: function (e) {
				//stuff to do on mouse leave
				if (($(e.target).is(".showHeaderSearch") )) {
				} else {
					$("nav.navbar").removeClass("open");
				}
			}
		}, ".navbar-sidebar .navbar");


		$('html').click(function () {
			$("nav.navbar").removeClass("open");
		});

		$('nav.navbar').click(function (event) {
			event.stopPropagation();
		});
		/* =============================================== */
		/* === SET WIDTH IN DROPDOWNS FOR SIDEBAR MENU === */

		if ($("body").hasClass("navbar-sidebar") && $devicewidth > 768) {
			$(".yamm-dropdown").each(function () {
				$(this).css("width", $(this).attr("data-width"))
			})
		}

		/* =================================== */
		/* ==== BUTTON SCROLL INSIDE PAGE ==== */


		$('.btn-scroll[href^="#"]').on('click', function (e) {
			e.preventDefault();

			var target = this.hash, $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': $target.offset().top
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
		});

		/* =============================== */
		/* === ADD MARGINS, COLORS TO ELEMENTS === */

		if ($devicewidth > 480) {
			$('*[data-margin-top]').each(function () {
				$(this).css("margin-top", $(this).data('margin-top'))
			})
			$('*[data-margin-bottom]').each(function () {
				$(this).css("margin-bottom", $(this).data('margin-bottom'))
			})
			$('*[data-margin-left]').each(function () {
				$(this).css("margin-left", $(this).data('margin-left'))
			})
			$('*[data-margin-right]').each(function () {
				$(this).css("margin-right", $(this).data('margin-right'))
			})
		}

		$('*[data-color]').each(function () {
			$(this).css("color", '#' + $(this).data('color'))
		})

		/* ======================== */
		/* ==== ANIMATION INIT ==== */

		if ($().appear) {

			if (device.mobile() || device.tablet()) {
				// disable animation on mobile
				$("body").removeClass("withAnimation");
			} else {

				$('.withAnimation .animated').appear(function () {
					var $this = $(this);

					$this.each(function () {
						if ($this.data('time') != undefined) {
							setTimeout(function () {
								$this.addClass('activate');
								$this.addClass($this.data('fx'));
							}, $this.data('time'));
						} else {
							$this.addClass('activate');
							$this.addClass($this.data('fx'));
						}
					});
				}, {accX: 50, accY: -150});
			}
		}

		/* ================================= */
		/* ==== FIT VIDEOS TO CONTAINER ==== */

		if ($().fitVids) {
			$(".video").fitVids();
		}

		/* ========================================== */
		/* ==== SHOW HEADER SEARCH/ HEADER LOGIN ==== */

		$searchform = $(".header-search");
		$(".showHeaderSearch").click(function () {
			$searchform.fadeToggle(250, function () {
				if (($searchform).is(":visible")) {
					$searchform.find("[type=text]").focus();
					disable_scroll()
				} else {
					enable_scroll()
				}
			});
			return false;
		});
		$loginform = $(".header-login");
		$(".btn-login-toggle").click(function () {
			$loginform.fadeToggle(250, function () {
				if (($loginform).is(":visible")) {
					$loginform.find("[type=text]").focus();
					disable_scroll()
				} else {
					enable_scroll()
				}
			});
			return false;
		});

		/* =============================== */
		/* ==== TOOLTIPS AND POPOVERS ==== */

		$("[data-toggle='tooltip']").tooltip();

		$("[data-toggle='popover']").popover({trigger: "hover", html: true});

		/* ==================== */
		/* ==== MAGNIFIC POPUP ==== */

		if ($().magnificPopup) {
			$('.magnific-popup').each(function () {
				var $this = $(this);
				var $type = $this.attr('data-type');
				$this.magnificPopup({
					type: $type, closeOnContentClick: true, closeBtnInside: true, fixedContentPos: true, mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
					image: {
						verticalFit: true
					}
				});
			})
			$('.magnific-gallery').each(function () {
				var $this = $(this);
				var $type = $this.attr('data-type');
				$this.magnificPopup({
					delegate: '.image-popup', type: 'image', closeOnContentClick: true, closeBtnInside: true, fixedContentPos: true, mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
					image: {
						verticalFit: true
					}, gallery: {
						enabled: true, navigateByImgClick: true, preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
					}, callbacks: {
						buildControls: function () {
							// re-appends controls inside the main container
							this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
						}
					}, close: function () {
						// Will fire when popup is closed
					}
				});
			})

		}

		/* ========================= */
		/* === PRE FOOTER IMAGES === */

		$(".pre-footer-image").each(function () {
			var $this = $(this);
			$this.css('background-image', 'url("' + $this.attr('data-bg') + '")');
			$this.css('height', +$this.attr('data-height') + 'px');
		});
		$(".pre-footer").each(function () {
			var $this = $(this);
            if($this.attr('data-bg') != undefined){
                $this.css('background-image', 'url("' + $this.attr('data-bg') + '")');
            }

		});

		/* ======================= */
		/* ==== TO TOP BUTTON ==== */


		$('#backtoTop').click(function () {
			$("body,html").animate({scrollTop: 0}, 1200);
			return false;
		});

        /* ============================ */
        /* ==== SECTION BACKGROUND ==== */

        $(".section").each(function () {
            var $this = $(this);
            $this.css('background-color', $this.attr("data-bg-color"));
        })
        $(".section-top").each(function () {
            var $this = $(this);
            $this.css('background-color', $this.attr("data-bg-color"));
        })
        $(".section-bottom").each(function () {
            var $this = $(this);
            $this.css('background-color', $this.attr("data-bg-color"));
        })

        $(".media-section[data-type='background']").each(function () {
            var $this = $(this);
            $this.css('background-image', 'url("' + $this.attr("data-image") + '")');
        })

		/* ================== */
		/* ==== PARALLAX ==== */

		$(".stellar-object").each(function () {
			var $this = $(this);
			var $bg = $this.attr("data-image");
			var $height = $this.attr("data-height") + 'px';
			var $width = $this.attr("data-width") + 'px';
			var $top = $this.attr("data-top");
			var $left = $this.attr("data-left");

			$this.css('background-image', 'url("' + $bg + '")');
			$this.css('width', $width);
			$this.css('height', $height);
			$this.css('top', $top);
			$this.css('left', $left);
		})

        $(".media-section[data-type='fullheight']").each(function () {
            var $this = $(this);
            $this.css('min-height', $deviceheight);
            $this.css('height', $deviceheight);
        })

		if (!device.mobile() && !device.tablet()) {
			$(".media-section[data-type='parallax']").each(function () {
				var $this = $(this);
				var $bg = $this.attr("data-image");
				var $height = $this.attr("data-height");

				$this.css('background-image', 'url("' + $bg + '")');
				if ($height.indexOf("%") > -1) {
					$this.css('min-height', $deviceheight);
					$this.css('height', $deviceheight);
				} else {
					$this.css('min-height', $height + "px");
					$this.css('height', $height + "px");
				}
			})
		} else {
			$(".media-section[data-type='parallax']").each(function () {
				var $this = $(this);
				var $bg = $this.attr("data-image-mobile");
				var $height = $this.attr("data-height");

				if ($height.indexOf("%") > -1) {
					$this.css('min-height', $deviceheight);
					$this.css('height', $deviceheight);
				} else {
					$this.css('min-height', $height + "px");
					$this.css('height', $height + "px");
				}
				$this.css('background-image', 'url("' + $bg + '")');
			})
		}

		// add background position for parallax. fix for ipad and iphone
		if (!device.mobile() && !device.tablet()) {
			$(".media-section[data-type='parallax']").css('background-attachment', 'fixed');
		} else {
			$(".media-section[data-type='parallax']").css('background-attachment', 'scroll');
		}

		/* =================== */
		/* ==== KEN BURNS ==== */

		$(".media-section[data-type='kenburns']").each(function () {
			var $this = $(this);
			var $height = $this.attr("data-height");

			if ($height.indexOf("%") > -1) {
				$this.css('min-height', $deviceheight);
				$this.css('height', $deviceheight);
			} else {
				$this.css('min-height', $height + "px");
				$this.css('height', $height + "px");
			}
			if ($("body").hasClass("withAnimation") && $devicewidth > 767) {
				makekenburns($this.find('.media-section-image-container'));
			} else {
				var images = $this.find('.media-section-image-container img');
				images.each(function () {
					var image = $(this)

					if (!image.is(":first-child")) {
						image.remove();
					}
				})
			}
		});
		/* ======================= */
		/* ==== VIDEO SECTION ==== */

		$(".media-section[data-type='video']").each(function () {
			var $this = $(this);
			var $height = $this.attr("data-height");
			var $time = 1;

			if ($height.indexOf("%") > -1) {
				$this.css('min-height', $deviceheight);
				$this.find('> .display-table').css('height', $deviceheight);
			} else {
				$this.css('min-height', $height + "px");
				$this.find('> .display-table').css('height', $height + "px");
			}

			if (!$this.hasClass("html5")) {
				var $videoframe = $this.find('iframe')
				if ($videoframe.attr('data-startat')) {
					$time = $videoframe.attr('data-startat');
				}
				if (!($devicewidth < 992) && !device.mobile()) {
					if (typeof $f != 'undefined') {
						var $video = '#' + $videoframe.attr('id');
						var iframe = $($video)[0], player = $f(iframe), status = $('.status');


						player.addEvent('ready', function () {
							player.api('setVolume', 0);
							player.api('seekTo', $time);
						})
					}
				}
			} else {
				//THIS IS WHERE YOU CALL THE VIDEO ID AND AUTO PLAY IT. CHROME HAS SOME KIND OF ISSUE AUTOPLAYING HTML5 VIDEOS, SO THIS IS NEEDED
				document.getElementById('video1').play();
			}
			if (($devicewidth < 992) || device.mobile()) {
				$this.find(".video").css('display', 'none');
				if ($this.attr("data-fallback-image") !== undefined) {
					$this.css('background-image', 'url("' + $this.attr("data-fallback-image") + '")');
				}
			}
		});

		/* ================== */
		/* ==== COUNT TO ==== */

		if (($().countTo) && ($().appear) && ($("body").hasClass("withAnimation"))) {
			$('.counter').data('countToOptions', {
				formatter: function (value, options) {
					return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
				}
			}).appear(function () {
				$(this).each(function (options) {
					var $this = $(this);
					var $speed = validatedata($this.attr('data-speed'), 700);
					options = $.extend({}, options || {
						speed: $speed
					}, $this.data('countToOptions') || {});
					$this.countTo(options);
				});
			});
		} else {
			$('.counter').data('countToOptions', {
				formatter: function (value, options) {
					return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
				}
			});
			$('.counter').each(function (options) {
				var $this = $(this);
				var $speed = validatedata($this.attr('speed'), 1200);
				options = $.extend({}, options || {
					speed: $speed
				}, $this.data('countToOptions') || {});
				$this.countTo(options);
			});
		}

		/* ====================== */
		/* ==== PROGRESS BAR ==== */

		if (($().appear) && ($("body").hasClass("withAnimation"))) {
			$('.progress').appear(function () {
				var $this = $(this);
				$this.each(function () {
					var $innerbar = $this.find(".progress-bar");
					var percentage = $innerbar.attr("data-percentage");
					var barcolor = '#' + $innerbar.attr("data-barcolor");
					$innerbar.css("background-color", barcolor);
					$innerbar.addClass("animating").css("width", percentage + "%");

					$innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
						$innerbar.find(".pull-right").fadeIn(900);
					});

				});
			}, {accY: -100});
		} else {
			$('.progress').each(function () {
				var $this = $(this);
				var $innerbar = $this.find(".progress-bar");
				var percentage = $innerbar.attr("data-percentage");
				$innerbar.addClass("animating").css("width", percentage + "%");

				$innerbar.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', function () {
					$innerbar.find(".pull-right").fadeIn(900);
				});

			});
		}

		$('.progress-icons').each(function () {
			var $this = $(this);
			var $total = $this.attr("data-total");
			var $icon = $this.attr("data-icon");
			var htmldata = "";

			$this.css("font-size", ($this.attr("data-font-size") + "px"));

			var i;
			for (i = 0; i < $total; i++) {
				htmldata += '<i class="fa ' + $icon + '"></i> ';
			}

			$this.html(htmldata);

			if (($().appear) && ($("body").hasClass("withAnimation"))) {
				$('.progress-icons').appear(function () {
					var $this = $(this);
					var $active = $this.attr("data-active");
					var $icons = $this.find('i:lt(' + $active + ')');
					var $delay = parseInt(validatedata($this.attr("data-delay"), 20))

					var delay = $delay;
					for (i = 0; i < $icons.length; i++) {
						setTimeout((function (i) {
							return function () {
								i.style.color = $this.attr("data-icon-color");
							}
						})($icons[i]), delay);
						delay += $delay;
					}
				}, {accY: -100});
			} else {
				$this.each(function () {
					var $active = $this.attr("data-active");
					var $icons = $this.find('i:lt(' + $active + ')');
					$icons.css('color', $this.attr("data-icon-color"))
				});
			}
		})

		if (($().appear) && ($("body").hasClass("withAnimation"))) {
			$('.progress').appear(function () {
			}, {accY: -100});
		} else {
			$('.progress').each(function () {
			});
		}


		// ie9 requires for labels
		$('.ie9 .form-control').blur(function () {
			if (!$.trim(this.value).length) { // zero-length string AFTER a trim

			} else {
				$(this).addClass("notempty");
			}
		});

        /* ===================== */
        /* ==== TIMELINE JS ==== */

        if ($("#timeline-embed").length > 0) {

            createStoryJS({
                width: '100%',
                height: '600',
                source: 'assets/js/timeline/source/timeline.json',
                embed_id: 'timeline-embed',               //OPTIONAL USE A DIFFERENT DIV ID FOR EMBED
                start_at_end: false,                          //OPTIONAL START AT LATEST DATE
                start_at_slide: '2',                            //OPTIONAL START AT SPECIFIC SLIDE
                start_zoom_adjust: '2',                            //OPTIONAL TWEAK THE DEFAULT ZOOM LEVEL
                hash_bookmark: false,                           //OPTIONAL LOCATION BAR HASHES
                debug: false,                           //OPTIONAL DEBUG TO CONSOLE
                lang: 'en',                           //OPTIONAL LANGUAGE
                maptype: 'HYBRID',                   //OPTIONAL MAP STYLE
                css: 'assets/js/timeline/css/timeline.css',     //OPTIONAL PATH TO CSS
                js: 'assets/js/timeline/js/timeline-min.js'    //OPTIONAL PATH TO JS
            });
        }

		/* =========================== */
		/* ==== GOOGLE MAP TOOGLE ==== */

		var $maphelp = $('.hidemap .googlemap');
		$(".hidemap .mapToggle").click(function () {
			var $this = $(this);
			var $map = $this.parent().find('.googlemapcontainer');
			$this.html($this.html() == 'Hide map <i class="fa fa-angle-down"></i>' ? 'Locate us on map <i class="fa fa-angle-up"></i>' : 'Hide map <i class="fa fa-angle-down"></i>');

			if ($map.height() != "0") {
				$map.animate({height: '0px'}, 500);
			} else {
				$map.animate({height: $maphelp.data("height") + "px"}, 500);
				setTimeout(function () {
					$('html, body').animate({
						scrollTop: $map.offset().top
					}, 2000);
				}, 500);

			}
		})
		/* =========================== */
		/* ==== REVOLUTION SLIDER ==== */

		/******************************************
		 -  PREPARE PLACEHOLDER FOR SLIDER  -
		 ******************************************/

		if ($().revolution) {
			var setREVStartSize = function () {
				var tpopt = new Object();
				tpopt.startwidth = 1170;
				tpopt.startheight = 620;
				tpopt.container = $('#rev1');
				tpopt.fullScreen = "off";
				tpopt.forceFullWidth = "off";

				tpopt.container.closest(".rev_slider_wrapper").css({height: tpopt.container.height()});
				tpopt.width = parseInt(tpopt.container.width(), 0);
				tpopt.height = parseInt(tpopt.container.height(), 0);
				tpopt.bw = tpopt.width / tpopt.startwidth;
				tpopt.bh = tpopt.height / tpopt.startheight;
				if (tpopt.bh > tpopt.bw) {
					tpopt.bh = tpopt.bw;
				}
				if (tpopt.bh < tpopt.bw) {
					tpopt.bw = tpopt.bh;
				}
				if (tpopt.bw < tpopt.bh) {
					tpopt.bh = tpopt.bw;
				}
				if (tpopt.bh > 1) {
					tpopt.bw = 1;
					tpopt.bh = 1
				}
				if (tpopt.bw > 1) {
					tpopt.bw = 1;
					tpopt.bh = 1
				}
				tpopt.height = Math.round(tpopt.startheight * (tpopt.width / tpopt.startwidth));
				if (tpopt.height > tpopt.startheight && tpopt.autoHeight != "on") {
					tpopt.height = tpopt.startheight;
				}
				if (tpopt.fullScreen == "on") {
					tpopt.height = tpopt.bw * tpopt.startheight;
					var cow = tpopt.container.parent().width();
					var coh = $(window).height();
					if (tpopt.fullScreenOffsetContainer != undefined) {
						try {
							var offcontainers = tpopt.fullScreenOffsetContainer.split(",");
							$.each(offcontainers, function (e, t) {
								coh = coh - $(t).outerHeight(true);
								if (coh < tpopt.minFullScreenHeight) {
									coh = tpopt.minFullScreenHeight
								}
							})
						} catch (e) {
						}
					}
					tpopt.container.parent().height(coh);
					tpopt.container.height(coh);
					tpopt.container.closest(".rev_slider_wrapper").height(coh);
					tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);
					tpopt.container.css({height: "100%"});
					tpopt.height = coh;
				} else {
					tpopt.container.height(tpopt.height);
					tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);
					tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);
				}
			};

			/* CALL PLACEHOLDER */
			setREVStartSize();

			var revapi27;

			$(document).ready(function () {

				if ($('#rev1').revolution == undefined) {
					revslider_showDouble$Error('#rev1');
				} else {
					revapi27 = $('#rev1').show().revolution({
						dottedOverlay: "none", delay: 9000, startwidth: 1170, startheight: 620, hideThumbs: 200,

						thumbWidth: 100, thumbHeight: 50, thumbAmount: 4,

						navigationType: "bullet", navigationArrows: "solo", navigationStyle: "preview1",

						touchenabled: "on", onHoverStop: "off",

						swipe_velocity: 0.7, swipe_min_touches: 1, swipe_max_touches: 1, drag_block_vertical: false,


						parallax: "scroll", parallaxBgFreeze: "on", parallaxLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

						keyboardNavigation: "off",

						navigationHAlign: "center", navigationVAlign: "bottom", navigationHOffset: 0, navigationVOffset: 20,

						soloArrowLeftHalign: "left", soloArrowLeftValign: "center", soloArrowLeftHOffset: 20, soloArrowLeftVOffset: 0,

						soloArrowRightHalign: "right", soloArrowRightValign: "center", soloArrowRightHOffset: 20, soloArrowRightVOffset: 0,

						shadow: 0, fullWidth: "on", fullScreen: "off",

						spinner: "spinner4",

						stopLoop: "off", stopAfterLoops: -1, stopAtSlide: -1,

						shuffle: "off",

						autoHeight: "off", forceFullWidth: "on",


						hideThumbsOnMobile: "off", hideNavDelayOnMobile: 1500, hideBulletsOnMobile: "off", hideArrowsOnMobile: "off", hideThumbsUnderResolution: 0,

						hideSliderAtLimit: 0, hideCaptionAtLimit: 0, hideAllCaptionAtLilmit: 0, startWithSlide: 0
					});
				}
				if ($('#rev2').revolution == undefined) {
					revslider_showDouble$Error('#rev2');
				} else {
					revapi27 = $('#rev2').show().revolution({
						dottedOverlay: "none", delay: 7000, startwidth: 1170, startheight: 840, hideThumbs: 200,

						thumbWidth: 100, thumbHeight: 50, thumbAmount: 4,

						navigationType: "bullet", navigationArrows: "solo", navigationStyle: "preview1",

						touchenabled: "on", onHoverStop: "on",

						swipe_velocity: 0.7, swipe_min_touches: 1, swipe_max_touches: 1, drag_block_vertical: false,


						parallax: "scroll", parallaxBgFreeze: "on", parallaxLevels: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],

						keyboardNavigation: "off",

						navigationHAlign: "center", navigationVAlign: "bottom", navigationHOffset: 0, navigationVOffset: 20,

						soloArrowLeftHalign: "left", soloArrowLeftValign: "center", soloArrowLeftHOffset: 20, soloArrowLeftVOffset: 0,

						soloArrowRightHalign: "right", soloArrowRightValign: "center", soloArrowRightHOffset: 20, soloArrowRightVOffset: 0,

						shadow: 0, fullWidth: "on", fullScreen: "off",

						spinner: "spinner4",

						stopLoop: "off", stopAfterLoops: -1, stopAtSlide: -1,

						shuffle: "off",

						autoHeight: "off", forceFullWidth: "on",


						hideThumbsOnMobile: "off", hideNavDelayOnMobile: 1500, hideBulletsOnMobile: "off", hideArrowsOnMobile: "off", hideThumbsUnderResolution: 0,

						hideSliderAtLimit: 0, hideCaptionAtLimit: 0, hideAllCaptionAtLilmit: 0, startWithSlide: 0
					});
				}


			});
			/*ready*/
		}
		/* ==================== */
		/* ==== FLEXSLIDER ==== */

		if ($().flexslider) {

			if ($(".flexslider").length > 0) {
				$(".flexslider").each(function () {
					var $this = $(this);
					var ctnamespace = validatedata($this.attr("data-namespace"), "flex-");
					var ctselector = validatedata($this.attr("data-selector"), ".slides > li");
					var ctanimation = validatedata($this.attr("data-animation"), "slide");
					var cteasing = validatedata($this.attr("data-easing"), "swing");
					var ctdirection = validatedata($this.attr("data-direction"), "horizontal");
					var ctreverse = parseBoolean($this.attr("data-reverse"), false);
					var ctanimationloop = parseBoolean($this.attr("data-animationloop"), false);
					var ctsmoothheight = parseBoolean($this.attr("data-smoothheight"), false);
					var ctstartat = parseInt(validatedata($this.attr("data-startat"), 0));
					var ctslideshow = parseBoolean($this.attr("data-slideshow"), true);
					var ctslideshowspeed = parseInt(validatedata($this.attr("data-slideshowspeed"), 7000));
					var ctanimationspeed = parseInt(validatedata($this.attr("data-animationspeed"), 600));
					var ctinitdelay = parseInt(validatedata($this.attr("data-initdelay"), 0));
					var ctrandomize = parseBoolean($this.attr("data-randomize"), false);
					var ctthumbcaptions = parseBoolean($this.attr("data-thumbcaptions"), false);

					var ctpauseonaction = parseBoolean($this.attr("data-pauseonaction"), true);
					var ctpauseonhover = parseBoolean($this.attr("data-pauseonhover"), false);
					var ctpauseinvisible = parseBoolean($this.attr("data-pauseinvisible"), true);
					var ctusecss = parseBoolean($this.attr("data-usecss"), true);
					var cttouch = parseBoolean($this.attr("data-touch"), true);
					if (device.mobile()) {
						cttouch = false;
					}
					var ctvideo = parseBoolean($this.attr("data-video"), false);
					var ctcontrolnav = parseBoolean($this.attr("data-controlnav"), true);
					if (ctcontrolnav == false) {
						$this.addClass("no-margin");
					}
					var ctdirectionnav = parseBoolean($this.attr("data-directionnav"), false);
					var ctprevtext = validatedata($this.attr("data-prevtext"), "Previous");
					var ctnexttext = validatedata($this.attr("data-nexttext"), "Next");

					var ctkeyboard = validatedata(parseBoolean($this.attr("data-keyboard")), true);
					var ctmultiplekeyboard = parseBoolean($this.attr("data-multiplekeyboard"), false);
					var ctmousewheel = parseBoolean($this.attr("data-mousewheel"), false);
					var ctpauseplay = parseBoolean($this.attr("data-pauseplay"), false);
					var ctpausetext = validatedata($this.attr("data-pausetext"), "Pause");
					var ctplaytext = validatedata($this.attr("data-playtext"), "Play");
					var ctitemwidth = parseInt(validatedata($this.attr("data-itemwidth"), 0));
					var ctitemmargin = parseInt(validatedata($this.attr("data-itemmargin"), 0));
					var ctminitems = parseInt(validatedata($this.attr("data-minitems"), 0));
					var ctmaxitems = parseInt(validatedata($this.attr("data-maxitems"), 0));
					var ctmove = parseInt(validatedata($this.attr("data-move"), 0));
					var ctallowoneslide = parseBoolean($this.attr("data-allowoneslide"), false);

					var ctcontrolscontainer = validatedata($this.attr("data-controlscontainer"), "");
					var ctmanualcontrols = validatedata($this.attr("data-manualcontrols"), "");

					var ctsync = validatedata($this.attr("data-sync"), "");
					var ctasnavfor = validatedata($this.attr("data-asnavfor"), "");

					$this.flexslider({
						namespace: ctnamespace,             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
						selector: ctselector,       //{NEW} Selector: Must match a simple pattern. "{container} > {slide}" -- Ignore pattern at your own peril
						animation: ctanimation,              //String: Select your animation type, "fade" or "slide"
						easing: cteasing,                //{NEW} String: Determines the easing method used in $ transitions. $ easing plugin is supported!
						direction: ctdirection,        //String: Select the sliding direction, "horizontal" or "vertical"
						reverse: ctreverse,                 //{NEW} Boolean: Reverse the animation direction
						animationLoop: ctanimationloop,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
						smoothHeight: ctsmoothheight,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
						startAt: ctstartat,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
						slideshow: ctslideshow,                //Boolean: Animate slider automatically
						slideshowSpeed: ctslideshowspeed,           //Integer: Set the speed of the slideshow cycling, in milliseconds
						animationSpeed: ctanimationspeed,            //Integer: Set the speed of animations, in milliseconds
						initDelay: ctinitdelay,                   //{NEW} Integer: Set an initialization delay, in milliseconds
						randomize: ctrandomize,               //Boolean: Randomize slide order
						thumbCaptions: ctthumbcaptions,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

						// Usability features


						pauseOnAction: ctpauseonaction,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
						pauseOnHover: ctpauseonhover,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
						pauseInvisible: ctpauseinvisible,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
						useCSS: ctusecss,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
						touch: cttouch,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
						video: ctvideo,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

						// Primary Controls


						controlNav: ctcontrolnav,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
						directionNav: ctdirectionnav,             //Boolean: Create navigation for previous/next navigation? (true/false)
						prevText: ctprevtext,           //String: Set the text for the "previous" directionNav item
						nextText: ctnexttext,               //String: Set the text for the "next" directionNav item

						// Secondary Navigation


						keyboard: ctkeyboard,                 //Boolean: Allow slider navigating via keyboard left/right keys
						multipleKeyboard: ctmultiplekeyboard,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
						mousewheel: ctmousewheel,              //{UPDATED} Boolean: Requires $.mousewheel.js (https://github.com/brandonaaron/$-mousewheel) - Allows slider navigating via mousewheel
						pausePlay: ctpauseplay,               //Boolean: Create pause/play dynamic element
						pauseText: ctpausetext,             //String: Set the text for the "pause" pausePlay item
						playText: ctplaytext,               //String: Set the text for the "play" pausePlay item

						// Special properties
						controlsContainer: ctcontrolscontainer,          //{UPDATED} $ Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
						manualControls: ctmanualcontrols,             //{UPDATED} $ Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
						sync: ctsync,                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
						asNavFor: ctasnavfor,                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

						// Carousel Options


						itemWidth: ctitemwidth,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
						itemMargin: ctitemmargin,                  //{NEW} Integer: Margin between carousel items.
						minItems: ctminitems,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
						maxItems: ctmaxitems,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
						move: ctmove,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
						allowOneSlide: ctallowoneslide           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide
					})
				})
			}
		}
	});

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		/* ================================================= */
		/* === CHANGE TRANSPARENT NAVBAR COLOR ON SCROLL === */

		var $bodyel = $("body");

		if (($bodyel.hasClass("navbar-fixed") && $bodyel.hasClass("navbar-transparent")) || ($bodyel.hasClass("navbar-fixed") && $bodyel.hasClass("revert-to-transparent"))) {
			if (scroll >= 100) {
				$bodyel.removeClass("navbar-transparent");
				$bodyel.addClass("navbar-dark");
				$bodyel.addClass("hide-topbar");
				$bodyel.addClass("revert-to-transparent");
			} else {
				$bodyel.removeClass("navbar-dark");
				$bodyel.removeClass("hide-topbar");
				$bodyel.addClass("navbar-transparent");
			}
		}

		// fixed navbar
		if ($bodyel.is(".navbar-fixed.with-topbar")) {
			if (scroll >= 100) {
				$bodyel.addClass("hide-topbar");
				if (!($bodyel.is(".revert-to-transparent"))) {
					$bodyel.addClass("navbar-with-shadow");
				}
			} else {
				$bodyel.removeClass("hide-topbar navbar-with-shadow");
			}
		}


	})

	$(document).ready(function () {

		/* ******************
		 MAGIC BORDER IN MENU
		 ******************** */

		if ($devicewidth > 767) {
			$(function () {

				var $el, leftPos, newWidth, $mainNav = $(".navbar-nav");

				if ($mainNav.length > 0) {
					$mainNav.each(function () {
						var $this = $(this);
						if ($this.find("> li.active").length > 0) {
							$this.append("<li id='magic-line'></li>");
							var $magicLine = $("#magic-line");

							if ($("body").hasClass("navbar-sidebar")) {
								$magicLine.css("width", "2px").height($mainNav.find("> li.active").height()).css("top", $mainNav.find("> li.active").position().top).data("origTop", $magicLine.position().top)

								$(".navbar-nav > li").hover(function () {
									$el = $(this);
									var topPos = $el.position().top;
									$magicLine.stop().animate({
										top: topPos
									});
								}, function () {
									if ($('body').hasClass('onepager')) {
										$magicLine.stop().animate({
											top: $mainNav.find("> li.active").position().top
										});
									} else {
										$magicLine.stop().animate({
											top: $magicLine.data("origTop")
										});
									}
								});
								if ($().attrchange) {
									$mainNav.find('> li:not(#magic-line)').attrchange({
										trackValues: true, /* Default to false, if set to true the event object is
										 updated with old and new value.*/
										callback: function (event) {
											//event    	          - event object
											//event.attributeName - Name of the attribute modified
											//event.oldValue      - Previous value of the modified attribute
											//event.newValue      - New value of the modified attribute
											//Triggered when the selected elements attribute is added/updated/removed
											$magicLine.stop().animate({
												top: $mainNav.find("> li.active").position().top
											});
										}
									});
								}
							} else {
								$magicLine.width($mainNav.find("> li.active").width()).css("left", $mainNav.find("> li.active").position().left).data("origLeft", $magicLine.position().left).data("origWidth", $magicLine.width());

								$(".navbar-nav > li").hover(function () {
									$el = $(this);
									leftPos = $el.position().left;
									newWidth = $el.width();
									$magicLine.stop().animate({
										left: leftPos, width: newWidth
									});
								}, function () {
									if ($('body').hasClass('onepager')) {
										$magicLine.stop().animate({
											left: $mainNav.find("> li.active").position().left, width: $mainNav.find("> li.active").width()
										});
									} else {
										$magicLine.stop().animate({
											left: $magicLine.data("origLeft"), width: $magicLine.data("origWidth")
										});
									}
								});
								if ($().attrchange) {
									$mainNav.find('> li:not(#magic-line)').attrchange({
										trackValues: true, /* Default to false, if set to true the event object is
										 updated with old and new value.*/
										callback: function (event) {
											//event    	          - event object
											//event.attributeName - Name of the attribute modified
											//event.oldValue      - Previous value of the modified attribute
											//event.newValue      - New value of the modified attribute
											//Triggered when the selected elements attribute is added/updated/removed
											$magicLine.stop().animate({
												left: $mainNav.find("> li.active").position().left, width: $mainNav.find("> li.active").width()
											});
										}
									});
								}
							}
						}
					})
				}
			});
		}
	})

	$(window).load(function () {

		/* ==================== */
		/* ==== PIE CHARTS ==== */
		$('.chart').each(function () {
			var $this = $(this);
			var $color = validatedata($(this).attr('data-first-color'), "#2b8be9");
			var $color2 = validatedata($(this).attr('data-second-color'), "#eaebec");
			var $cutout = validatedata($(this).attr('data-middle-space'), 90);
			var $stroke = validatedata($(this).attr('data-show-stroke'), false);
			var options = {
				responsive: true, percentageInnerCutout: $cutout, segmentShowStroke: $stroke, showTooltips: false
			}
			var doughnutData = [{
				value: parseInt($this.attr('data-percentage')), color: $color, label: false
			}, {
				value: parseInt(100 - $this.attr('data-percentage')), color: $color2
			}];

			if (($().appear) && ($("body").hasClass("withAnimation"))) {
				$('.chart').appear(function () {
					var ctx = $this[0].getContext("2d");
					window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
				});
			} else {
				var ctx = $this[0].getContext("2d");
				window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, options);
			}
		})

		/* ================== */
		/* ==== PARALLAX ==== */

		if ($().stellar) {
			if (!device.mobile() && !device.tablet()) {
				//initialise Stellar.js
				$(window).stellar({

					horizontalScrolling: false, responsive: true, positionProperty: 'transform'
				});
			}
		}

		/* ============================ */
		/* ==== THUMBNAIL SCROLLER ==== */

		//if ($().thumbnailScroller) {
		//	$(".thumbnailScroller").each(function () {
		//		var $this = $(this);
		//		var $scrolltype = "hoverAccelerate";
		//		if (device.mobile() || device.tablet()) {
		//			$scrolltype = "clickButtons"
		//		}
		//		$this.thumbnailScroller({
		//			scrollerType: $scrolltype,
		//			scrollerOrientation: "horizontal", //scrollSpeed: 2,
		//			scrollEasing: "easeOutCirc",
		//			scrollEasingAmount: 600,
		//			acceleration: 4,
		//			scrollSpeed: 800,
		//			noScrollCenterSpace: 10,
		//			autoScrolling: 0,
		//			autoScrollingSpeed: 2000,
		//			autoScrollingEasing: "easeInOutQuad",
		//			autoScrollingDelay: 500
		//		});
		//		center_slider($this);
		//		show_slider($this);
		//	})
		//}
		////CENTER SLIDER
		//function center_slider(element) {
		//	var slider_width = $(element).find('.jTscroller').outerWidth(true);
		//	if (slider_width > $devicewidth) {
		//		$(element).find('.jTscroller').css('left', -( (slider_width - $devicewidth) / 2 ) + 'px');
		//	} else {
		//		$(element).find('.jTscroller').css('left', ( ($devicewidth - slider_width) / 2 ) + 'px');
		//	}
		//}

		if ($().thumbnailScroller) {
			$(".thumbnailScroller").each(function () {
				var $this = $(this);
				var $scrolltype = "hoverAccelerate";
				if (device.mobile() || device.tablet()) {
					$scrolltype = "clickButtons"
				}
                if (device.mobile()) {
                    $('.project-thumb').each(function(){
                        $(this).css('width', $devicewidth + 'px');
                    });
                }
				$this.thumbnailScroller({
					scrollerType: $scrolltype,
					scrollerOrientation: "horizontal", //scrollSpeed: 2,
					scrollEasing: "easeOutCirc",
					scrollEasingAmount: 400,
					acceleration: 4,
					scrollSpeed: 300,
					noScrollCenterSpace: 10,
					autoScrolling: 0,
					autoScrollingSpeed: 2000,
					autoScrollingEasing: "easeInOutQuad",
					autoScrollingDelay: 500
				});
				center_slider($this);
				show_slider($this);
			})
		}
		//CENTER SLIDER
		function center_slider(element) {
			var slider_width = $(element).find('.jTscroller').outerWidth(true);
			if (slider_width > $devicewidth) {
				$(element).find('.jTscroller').css('left', 0 + 'px');
			} else {
				$(element).find('.jTscroller').css('left', 0 + 'px');
			}
		}

		//SHOW SLIDER
		function show_slider(element) {
			element.removeClass("thumbnailScrollerLoading");
		}

		if ($().isotope && ($('.galleryContainer').length > 0)) {

			var $container = $('.galleryContainer'), // object that will keep track of options
							isotopeOptions = {}, // defaults, used if not explicitly set in hash
							defaultOptions = {
								filter: '*', itemSelector: '.galleryItem', // set columnWidth to a percentage of container width
								masonry: {}
							};

			// set up Isotope
			$container.each(function () {
				$(this).isotope(defaultOptions);
			});


			$('.galleryFilters a').click(function () {
				$('.galleryFilters .active').removeClass('active');
				$(this).addClass('active');

				var selector = $(this).attr('data-filter');
				$container.isotope({
					filter: selector, animationOptions: {
						duration: 750, easing: 'linear', queue: false
					}
				});
				return false;
			});
		}

		/* ====================== */
		/* ==== BLOG MASONRY ==== */

		if (($().isotope ) && ($('.with-isotope').length > 0) && !device.mobile() && !($devicewidth < 768)) {

			// blog masonry

			var $blogContainer = $('.with-isotope'), // object that will keep track of options
							isotopeOptions = {}, // defaults, used if not explicitly set in hash
							defaultOptions = {
								itemSelector: '.post', // set columnWidth to a percentage of container width
								masonry: {}
							};

			// set up Isotope
			$blogContainer.isotope(defaultOptions, function () {

				// fix for height dynamic content
				setTimeout(function () {
					$blogContainer.isotope('reLayout');
				}, 1000);

			});
		}

		if ($().final_countdown) {
			var curDate = new Date().getTime() / 1000;
			$('.countdown').final_countdown({
				now: curDate, seconds: {
					borderWidth: '10'
				}, minutes: {
					borderWidth: '10'
				}, hours: {
					borderWidth: '10'
				}, days: {
					borderWidth: '10'
				}
			});
		}
	});

	$(document).keyup(function (e) {
		if (e.keyCode == 27) {

			if (($searchform).is(":visible")) {
				$searchform.fadeToggle(250);
				enable_scroll()
			}
			if (($loginform).is(":visible")) {
				$loginform.fadeToggle(250);
				enable_scroll()
			}
		}
	});

	function makekenburns($element) {
		// we set the 'fx' class on the first image
		// when the page loads
		$element.find('img')[0].className = "fx";
		// the third variable is to keep track of
		// where we are in the loop
		// if it is set to *1* (instead of 0)
		// it is because the first image is styled
		// when the page loads
		var images = $element.find('img'), numberOfImages = images.length, i = 1;
		if (numberOfImages == 1) {
			images[0].className = "singlefx";
		}
		// this calls the kenBurns function every
		// 4 seconds. You can increase or decrease
		// this value to get different effects
		window.setInterval(kenBurns, 7000);

		function kenBurns() {
			if (numberOfImages != 1) {
				if (i == numberOfImages) {
					i = 0;
				}
				images[i].className = "fx";
				// we can't remove the class from the previous
				// element or we'd get a bouncing effect so we
				// clean up the one before last
				// (there must be a smarter way to do this though)
				if (i === 0) {
					images[numberOfImages - 2].className = "";
				}
				if (i === 1) {
					images[numberOfImages - 1].className = "";
				}
				if (i > 1) {
					images[i - 2].className = "";
				}
				i++;
			}
		}
	}

	/* ============================================= */
	/* ==== GOOGLE MAP ==== */

	function initmap() {

		if (($(".googlemap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
			$('.googlemap').each(function () {
				var atcenter = "";
				var $this = $(this);
				var location = $this.data("location");
				var zoom = $this.data("zoom");

				var offset = -30;

				if (validatedata($this.data("offset"))) {
					offset = $this.data("offset");
				}

				if (validatedata(location)) {

					$this.gmap3({
						marker: {
							//latLng: [40.616439, -74.035540],
							address: location, options: {
								//visible: false
								icon: new google.maps.MarkerImage("assets/images/marker.png")
							}, callback: function (marker) {
								atcenter = marker.getPosition();
							}
						}, map: {
							options: {
								//maxZoom:11,
								zoom: zoom,
								mapTypeId: google.maps.MapTypeId.ROADMAP, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
								scrollwheel: false,
								disableDoubleClickZoom: false,
								draggable: false, //disableDefaultUI: true,
								mapTypeControlOptions: {
									//mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
									//style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
									//position: google.maps.ControlPosition.RIGHT_CENTER
									mapTypeIds: []
								},
								styles: [{"featureType": "landscape", "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]},
									{"featureType": "poi", "stylers": [{"saturation": -100}, {"lightness": 51}, {"visibility": "simplified"}]},
									{"featureType": "road.highway", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
									{"featureType": "road.arterial", "stylers": [{"saturation": -100}, {"lightness": 30}, {"visibility": "on"}]},
									{"featureType": "road.local", "stylers": [{"saturation": -100}, {"lightness": 40}, {"visibility": "on"}]}, {"featureType": "transit", "stylers": [{"saturation": -100}, {"visibility": "simplified"}]},
									{"featureType": "administrative.province", "stylers": [{"visibility": "off"}]},
									{"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "on"}, {"lightness": -25}, {"saturation": -100}]},
									{"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]}]
							}, events: {
								idle: function () {
									if (!$this.data('idle')) {
										$this.gmap3('get').panBy(0, offset);
										$this.data('idle', true);
									}
								}
							}
						}, overlay: {
							//latLng: [40.616439, -74.035540],
							address: location, options: {
								//content: '<div class="customMarker"><div class="address">' + location + '</div><div class="marker"><img src="assets/images/custom-marker.png"></div></div>',
								offset: {
									y: -100, x: -25
								}
							}
						}
						//},"autofit"
					});

					// center on resize
					google.maps.event.addDomListener(window, "resize", function () {
						//var userLocation = new google.maps.LatLng(53.8018,-1.553);
						setTimeout(function () {
							$this.gmap3('get').setCenter(atcenter);
							$this.gmap3('get').panBy(0, offset);
						}, 400);

					});

					// set height
					$this.css("min-height", $this.data("height") + "px");
				}

				if ($this.parent().parent().hasClass('hidemap')) {
					$this.parent().animate({height: '0px'}, 500);
				}

			})
		}

	}

	initmap();

})(jQuery);
