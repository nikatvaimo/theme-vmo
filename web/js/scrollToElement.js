/**
 * Copyright © Vaimo Group. All rights reserved.
 * See LICENSE_VAIMO.txt for license details.
 */

define([
    'jquery',
    'underscore',
    'jquery-ui-modules/widget'
], function ($, _) {
    'use strict';

    $.widget('vmo.scroll_to_element', {
        options: {
            triggerScrollClass: '.js-scroll-to', // should be an <a> with id as url to scroll to
            openTabOnClick: false,
            activeClass: 'active'
        },

        _create: function() {
            this._scrollToElementListener();
        },

        _scrollToElementListener: function() {
            var thisOptions = this.options;
            $(thisOptions.triggerScrollClass).on('click', function(event) {
                if (this.hash !== '') {
                    event.preventDefault();

                    var $hash = $(this.hash);


                        if (thisOptions.openTabOnClick && !$hash.hasClass(thisOptions.activeClass)) {
                            $hash.click();
                        }

                        // Apply an offset if there is a sticky add-to-cart on PDP
                        var offsetVal = $('[data-scroll-to-element-offset]').attr('data-scroll-to-element-offset'),
                            offset = offsetVal ? parseInt(offsetVal) : 0,
                            elementTop = $hash.offset().top;

                        $('html, body').animate({
                            scrollTop: elementTop - offset
                        }, 500);
                    }
            })
        }
    });
});
