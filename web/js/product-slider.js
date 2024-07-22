define([
    'jquery',
    'slick',
    'matchMedia',
    'mage/translate',
    'jquery-ui-modules/widget'
], function ($, slick, matchMedia, $t) {
    'use strict';

    $.widget('vmo.productSlider', {
        modal: null,
        options: {
            slidesLargeScreen: 4,
            slidesMediumScreen: 3,
            slidesSmallScreen: 2,
            sliderClass: '.slick-slider',
            onlySmallDevice: false
        },

        _create: function() {
            if (this.options.onlySmallDevice) {
                this._initClickEventsOnSliderItems();
                this._initSlickSliderSmall();
            } else {
                this._initClickEventsOnSliderItems();
                this._initSlickSlider();
            }
        },

        _initClickEventsOnSliderItems: function(){
            $(this.options.sliderClass).on('init', function(slick) {
                $(document).trigger('product-grid:loaded');
            });
        },

        _initSlickSlider: function() {
            var self = this;

            $(this.options.sliderClass).slick({
                infinite: true,
                arrows: true,
                mobileFirst: true,
                adaptiveHeight: false,
                nextArrow: '<button class="slick-next slick-next--products" aria-label="' + $t('Next') + '" type="button"><svg class="svg-icon"><use xlink:href="#icon-chevron-right" /></svg></button>',
                prevArrow: '<button class="slick-prev slick-prev--products" aria-label="Previous" type="button"><svg class="svg-icon"><use xlink:href="#icon-chevron-right" /></svg></button>',

                responsive: [{
                    breakpoint: 768,
                    settings: {
                        slidesToShow: self.options.slidesLargeScreen,
                        slidesToScroll: 1,
                    }
                }, {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: self.options.slidesMediumScreen,
                        slidesToScroll: 1,
                    }
                }, {
                    breakpoint: 280,
                    settings: {
                        slidesToShow: self.options.slidesSmallScreen,
                        slidesToScroll: 1,
                    }
                }, {
                    breakpoint: 200,
                    settings: "unslick" // destroys slick
                }]
            });
        },

        _initSlickSliderSmall: function() {
            var self = this;

            matchMedia({
                media: '(max-width: 991px)',
                entry: function () {
                    $(self.options.sliderClass).slick({
                        infinite: true,
                        arrows: true,
                        mobileFirst: true,
                        adaptiveHeight: false,
                        nextArrow: '<button class="slick-next slick-next--products" aria-label="' + $t('Next') + '" type="button"><svg class="svg-icon"><use xlink:href="#icon-chevron-right" /></svg></button>',
                        prevArrow: '<button class="slick-prev slick-prev--products" aria-label="' + $t('Previous') + '" type="button"><svg class="svg-icon"><use xlink:href="#icon-chevron-right" /></svg></button>',

                        responsive: [{
                            breakpoint: 640,
                            settings: {
                                slidesToShow: self.options.slidesMediumScreen,
                                slidesToScroll: 1,
                            }
                        }, {
                            breakpoint: 280,
                            settings: {
                                slidesToShow: self.options.slidesSmallScreen,
                                slidesToScroll: 1,
                            }
                        }, {
                            breakpoint: 200,
                            settings: "unslick" // destroys slick
                        }]
                    });
                },
                exit: function () {
                    if ($(self.options.sliderClass).hasClass('slick-initialized')) {
                        $(self.options.sliderClass).slick('unslick');
                    }
                }
            });
        }
    });

    return $.vmo.productSlider;
});
