'use strict';

/* Services */
angular.module('phonecatServices', ['ngResource']).
    factory('Phone', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
});

angular.module('templateServices', []).
    factory('Template', function(){
        var templates = [];
        return {
            getTemplates: function() {
                return templates;
            },
            setTemplates: function(value) {
                templates = value;
            },
        };
    });

angular.module('trackCart',['LocalStorageModule']).
	factory('Cart',function(localStorageService){
		var cart = [];
		return{
			get: function(){
				if(localStorageService.get('cart') != null){
					cart = JSON.parse(localStorageService.get('cart'));
				}
				return cart;
			},
            count: function(){
                if(localStorageService.get('cart') != null){
                    cart = JSON.parse(localStorageService.get('cart'));
                }
                return cart.length;
            },
			addToCart: function(item){
				if(localStorageService.get('cart') != null){
					cart = JSON.parse(localStorageService.get('cart'));
				}
				if(cart.length != 0){
					var cartItem = {};
					var exists = false;
					for(var i=0;i<cart.length;i++){
						cartItem = cart[i];
						if(JSON.stringify(item) == JSON.stringify(cartItem)){
							exists = true;
							break;
						}
					}
					if(!exists){
						cart.push(item);
					}else{
						alert('You have already added '+item.template.name+' to the cart');
					}
				}else{
					cart.push(item);
					console.log('Cart Empty.item added');
				}
				
				localStorageService.remove('cart');
				localStorageService.add('cart',JSON.stringify(cart));
			},
			removeFromCart: function(item){
				if(localStorageService.get('cart') != null){
					cart = JSON.parse(localStorageService.get('cart'));
				}
				var cartItem = {};
				for(var i=0;i<cart.length;i++){
					cartItem = cart[i];
					if(item == cartItem){
						cart.pop(cartItem);
					}
				}
				localStorageService.remove('cart');
				localStorageService.add('cart',JSON.stringify(cart));

			},
		}
	});

angular.module('searchQuery',[]).
	factory('Search',function(){
		var station = {};
		var format = {};
		var slogan = {};
		var frequency = {};
		return {
			set: function(form,stat,slo,fre){
				station = stat;
				format = form;
				slogan = slo;
				frequency = fre;
			},
			unset: function(){
				station = {};
				format = {};
				slogan = {};
				frequency = {};
			},
			get: function(){
				var search = {};
				search.station = station;
				search.format = format;
				search.slogan = slogan;
				search.frequency = frequency;
				return search
			},
		}
	})
