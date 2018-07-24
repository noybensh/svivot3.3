

angular.module('citiesApp')
.factory('modalService', ['$uibModal', function($uibModal) {

    return {
      openMenuModal: function(templateLink, windowAnimation , id) {
           
          var modalObj = $uibModal.open({
              templateUrl: templateLink,
              backdrop: 'static',
              //windowClass: windowAnimation,
              
              controller: function($rootScope,$scope,$modalInstance,POIService,$route,$http){
                var reviewNew="";
                var rankNew = 0;
                $scope.clone=id;
                POIService.getPoi(id.poiID)
                .then(function (response) {
                    $scope.poi= response.data;
                 
                }, function (response) {

                });
                POIService.getRev(id.poiID)
                .then(function (response) {
                    $scope.reviews= response.data.Reviews;
                 
                }, function (response) {

                }); 
                
                $scope.ok = function(id){
                  //Process OK Button Click
                  $rootScope.poi = null;
                   $modalInstance.close();

                },
                 $scope.cancel = function(){
                  $modalInstance.dismiss('cancel');
                }
                $scope.addFavorite=function (id) {
                    var index=$rootScope.favorites.indexOf(id);
                    let data = {
                        poiID: id
                    } 
                    if (index==-1){
                       $http.post('http://localhost:3000/poiUser/reg/saveFavPoi',data).then(function(response){

                       });
                        $rootScope.favorites.push(id);
                    }
                    else{
                        $http.delete('http://localhost:3000/poiUser/reg/deleteFavPOI',data)
                        .then(function(response){
                            console.log(response.data)
                        });
                        $rootScope.favorites.splice(index,1);
                    }
                }
                $scope.isFavorite=function (id) {
                    
                    return  $rootScope.favorites.indexOf(id)!=-1;
                }
                $scope.changeRank=function (rank) {
                    rankNew=rank;
                }
                $scope.changeRev=function (review) {
                    reviewNew=review;
                }
                $scope.giveR = function() {
                    if (reviewNew=="" || rankNew>5 || rankNew<=0)
                    {
                        alert("No rank or review written")
                        return;
                    }
                    let data={
                        poiID:id.poiID,
                        review: reviewNew,
                        rank: rankNew
                    }
                    POIService.postReview(data)
                        .then(function(response){
                            if (response.data=="The same review from this user exists")
                            {
                                alert("The same review from this user exists");
                            }
                            else
                                alert("rank and review uploaded");
                        },function(response){

                        });
                        $route.reload();
                        $modalInstance.close();


                };
              },

              size: 'md',
              keyboard: true,
              resolve: {
                someData: function () {
                  return 'Return some Data';
                }
            }
          });
          
  
  
      }
  };
  }])
.controller('allPOICtrl', ['$rootScope','$scope', '$http', '$location','modalService', function ( $rootScope,$scope, $http, $location,modalService, someData) {
    
    var self = this;
    self.dataFromService = someData;
   self.opentheBook = function(poi){
     $rootScope.id = poi.poiID;
     self.getPOIbyID(poi.poiID )
      modalService.openMenuModal('myModalContent.html', 'animated zoomIn' , poi);
    };
    self.filterd = undefined;
    let serverUrl = 'http://localhost:3000/'
    
    self.allPoi= function(){
        self.allPois;
        $http.get(serverUrl + "POI/getAllPoi").then(function (response) {
        console.log(response.data)
        self.allPois= response.data

    });

    


}
self.goTo= function(){
    $location.path('/poi/favePoi')
}


/*self.getR=function(ids){
 //  console.log(id);
   let idi={id: ids}
   let p;
        $http.post(serverUrl+"POI/getTwoR",idi).then(function(response){
            p=response
        })
    console.log(p)

        
}*/

/*self.goTo=function(name){
    
    console.log(name)
    $location.path('/poi/id/'+name)
}*/

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