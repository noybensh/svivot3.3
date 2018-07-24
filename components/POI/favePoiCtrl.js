angular.module('citiesApp')
.controller('favePoiCtrl', ['$route','$rootScope','$scope', '$http', '$location','modalService', function ($route, $rootScope,$scope, $http, $location,modalService, someData) {
 
    var self = this;
    self.dataFromService = someData;
    var temp = {};
   self.opentheBook = function(poi){
     $rootScope.id = poi.poiID;
     
      modalService.openMenuModal('myModalContent.html', 'animated zoomIn' , poi);
    };
    self.filterd = undefined;
    let serverUrl = 'http://localhost:3000/'
    
    self.allPoi= function(){
        self.allPois;
        self.allPois= $rootScope.favorites
}

$scope.setPlace = function(place,poiID){
    if(place==1)
    place=$rootScope.favorites.indexOf(poiID)-1;
    if(place==0)
    place=$rootScope.favorites.indexOf(poiID)+1;
    if(place>=$rootScope.favorites.length || place< 0){
    self.place=0;
    return;
    }
 var temp= $rootScope.favorites[place];
 var tempPlace = $rootScope.favorites.indexOf(poiID);
 $rootScope.favorites[place]=poiID;
 $rootScope.favorites[tempPlace]=temp;   


$route.reload();
}



self.change=function(category){
    if(category == 'All')
    {
        self.filterd= undefined;    
    }
    else
    self.filterd= category;
    
    console.log(self.filterd);
}

self.rank=function(){
    if(self.ranki === '-rank')
    self.ranki = 'rank';
    else 
    self.ranki = '-rank';
}



self.getPOIbyID = function (id ) {
    $http.post(serverUrl+"POI/numWatch/"+id).then(function(response){
        
    })
}



}]);