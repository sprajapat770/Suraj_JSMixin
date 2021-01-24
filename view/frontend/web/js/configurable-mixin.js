define([
    'jquery',
    'underscore',
    'mage/template',
    'mage/translate',
    'priceUtils',
    'priceBox',
    'jquery-ui-modules/widget',
    'jquery/jquery.parsequery',
    'fotoramaVideoEvents',
    'Magento_Catalog/js/price-options'
], function ($, _, mageTemplate, $t, priceUtils) {
    'use strict';
    
    options: {
            customHolderSelector: '.price-options'
        };
    
    return function (widget) {

        $.widget('mage.configurable',widget, {

            this.options = options;

            /*_reloadPrice: function () {
                this._super();
                console.log('hjhjh');
                $(this.options.customHolderSelector).trigger('createPriceOptions');

            }*/
            _getOptionLabel: function (option) {
                return option.initialLabel;
            }
        });

    return $.mage.configurable;
    }
});