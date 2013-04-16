function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

/*
  The Control that comes into play in the Homepage of the IQ Application.
 */
function FormatListCtrl($scope, $http,Template,$location,Search,Cart) {
	/*Get all the formats from API */
	$http.jsonp( 'http://localhost:5000/?callback=JSON_CALLBACK', {query:{isArray:true }}).
		then( function ( response ) {
   			 $scope.formats = response.data;
 		 });
 	/*Get all the frequencies from API */
	$http.jsonp( 'http://localhost:5000/frequencies?callback=JSON_CALLBACK', {query:{isArray:true}}).
  		then( function ( response ) {
	    	$scope.frequencies = response.data;
	  	});
  	/*The action to be executed when the user selects a format
  	 	This will query the API for the associated list of stations and slogans 
  	 * */
    $scope.cartSize = Cart.count;
  	$scope.al = function(q){
	  	$http.jsonp( 'http://localhost:5000/stations/'+q+'/?callback=JSON_CALLBACK', {
		    query:{
		    	isArray:true
		    }
	
		  }).then( function ( response ) {
		    $scope.stations = response.data;
		});
		$http.jsonp( 'http://localhost:5000/slogans/'+q+'/?callback=JSON_CALLBACK', {
		    query:{
		    	isArray:true
		    }
	
		  }).then( function ( response ) {
		    $scope.slogans = response.data;
		});
  	};
  /* 
  	The action when the Imaging Button is clicked
  	This function will query the list of matching templates according to the format, station and slogan objects passed. The result is then  saved to the factory called Template
  	
   */
  $scope.search_imaging = function(format,frequency,station,slogan){
  		Search.set(format,station,slogan,frequency);
  		$http.jsonp( 'http://localhost:5000/templates/'+format.uid+'/'+station.id+'/'+slogan.id+'/?callback=JSON_CALLBACK', {
	    query:{
	    	isArray:true
	    }
	  }).then( function ( response) {
	    Template.setTemplates(response.data);
		$location.path('/templates');
	});
  }
  
}

function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];

/*
  The Control that comes into play in the Template area of the IQ Application.
 */
function TemplListCtrl($scope, $http,Template,$location,Search,Cart) {
	$scope.templates = Template.getTemplates();
	$scope.cartSize = function(){
        cart = Cart.get();
        return cart.length();
    };
	$scope.play = function(item,template){
		track = {}
		query = Search.get();
		track.template = template;
		track.posVoice = item.posVoice;
		track.statVoice = item.statVoice;
		track.freVoice = item.freVoice;
		track.station = query.station;
		track.slogan = query.slogan;
		track.frequency = query.frequency;
		console.log(track);
		//This should be posted to Flask to generate sox code. The data returned will be a link to the file.
	};

	$scope.addToCart = function(item,template){
		var track = {}
		query = Search.get();
		track.template = template;
		track.posVoice = item.posVoice;
		track.statVoice = item.statVoice;
		track.freVoice = item.freVoice;
		track.station = query.station;
		track.slogan = query.slogan;
		track.frequency = query.frequency;
		Cart.addToCart(track);
		console.log(Cart.get());
	};
	

} 

