define(['mage/utils/wrapper','underscore'],function(wrapper,_){
	'use strict';

	return function(target){
			var	count = 0;
			return target.extend({
				getItems: function(){
					++count;
				 	console.log('custome mixin'+count);
					//return this._super();
					var arr  = _.toArray(this.items);
					console.log(this.items);
					/*for (var j in arr) 
     					{
						this.items[j]['title'] = this.items[j]['title']+"suraj";
      						console.log(" " + arr[j]['title']);
     					}*/
				return arr;
				}
			});
			// return wrapper.wrap(configurable,function(){
			// });
		}
});