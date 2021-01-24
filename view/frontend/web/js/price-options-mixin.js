define(['jquery',
    'underscore',
    'mage/template',
    'priceUtils',
    'priceBox',
    'jquery-ui-modules/widget'], function ($, _, mageTemplate, utils) {

    return function (widget) {
        'use strict';
        
        var optionTemplate2 = '<%= data.label %>' +
        ' <% if (data.finalPrice.value > 0) { %>' +
        ' <%- data.finalPrice.formatted %>' +
        '<% } else if (data.finalPrice.value < 0) { %>' +
        ' <%- data.finalPrice.formatted %>' +
        '<% } %>';

        var count = 0;
        /*var globalOptions = {*/
        var optionTemplate =  '<%= data.label %>' +
        ' + <% if (data.finalPrice.value > 0) { %>' +
        ' <%- data.finalPrice.formatted %>' +
        '<% } else if (data.finalPrice.value < 0) { %>' +
        ' <%- data.finalPrice.formatted %>' +
        '<% } %>';
       /*};*/
        
        $.widget('mage.priceOptions', widget, {

            //options: globalOptions,

            _applyOptionNodeFix: function applyOptionNodeFix(options) {
                    
                var config = this.options,
                format = config.priceFormat,
                template = config.optionTemplate;

                //template = mageTemplate(template);
                var count = 0;
                options.filter('select').each(function (index, element) {
                    count = count+1;
                    if (count == 1) {
                        config.optionTemplate = optionTemplate2;
                        template = mageTemplate(config.optionTemplate);
                    }else if (count==2) {
                        config.optionTemplate = optionTemplate;
                        template = mageTemplate(config.optionTemplate);
                    }

                    var $element = $(element),
                        optionId = utils.findOptionId($element),
                        optionConfig = config.optionConfig && config.optionConfig[optionId];

                    $element.find('option').each(function (idx, option) {
                        var $option,
                            optionValue,
                            toTemplate,
                            prices;

                        $option = $(option);
                        optionValue = $option.val();

                        if (!optionValue && optionValue !== 0) {
                            return;
                        }

                        toTemplate = {
                            data: {
                                label: optionConfig[optionValue] && optionConfig[optionValue].name
                            }
                        };
                        prices = optionConfig[optionValue] ? optionConfig[optionValue].prices : null;

                        if (prices) {
                            _.each(prices, function (price, type) {
                                var value = +price.amount;
                                if (count == 1) {
                                    value =  value + parseFloat(jQuery('.product-info-main .product-info-price .price-wrapper ').attr('data-price-amount'));
                                }
                                
                                value += _.reduce(price.adjustments, function (sum, x) { //eslint-disable-line
                                    return sum + x;
                                }, 0);
                                toTemplate.data[type] = {
                                    value:value,
                                    formatted: utils.formatPrice(value, format)
                                };
                            });

                            $option.text(template(toTemplate));
                        }
                    });
                });
            }
        
        });
        
        return $.mage.priceOptions;
    }
});