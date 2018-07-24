angular.module('citiesApp')    
.controller('homeCtrl', ['$rootScope','$scope', '$http', '$location','modalService', function ($rootScope,$scope, $http, $location,modalService,someData) {

        var self = this;
        self.show = false;
        self.homeShow = true ; 
        let serverUrl = 'http://localhost:3000/'
        self.dataFromService = someData;
        self.opentheBook = function(poi){
            $rootScope.id = poi.poiID;
          self.getPOIbyID(poi.poiID )
           modalService.openMenuModal('myModalContent.html', 'animated zoomIn' , poi);
         };

         self.getPOIbyID = function (id ) {
            $http.post(serverUrl+"POI/numWatch/"+id).then(function(response){
                
            })
        }

        self.loginLocation = function () {
            $location.url('/login');
            $location.replace();
        }

        self.registerLocation = function () { 
            $location.url('/register');
            $location.replace();
        }

        self.restorePassword = function () {
            self.homeShow = false; 
            self.show = true;
        }


        self.randPOI = [];
        self.category2 = [];
        self.fav2 = [];

        self.random3=function(){
            $http.get(serverUrl + "POI/random3").then(function (response) {
               // console.log(response.data)
            self.randPOI = response.data
        }, function (response) {
            alert('Points Of Interest Not Found');
        }
          );
        }


        self.categoryTwo= function()
        {
           
            $http.get(serverUrl + "poiUser/reg/categoryTwo").then(function (response) {
                //console.log(response.data);
                self.category2 = [
                    {poi: response.data.firstPoi.name , pic:response.data.firstPoi.picture , poiID: response.data.firstPoi.poiID},
                    {poi: response.data.secondPoi.name, pic:response.data.secondPoi.picture, poiID: response.data.secondPoi.poiID },
                  
                  ];
               console.log(self.category2);
            
            });
        }

        self.twoFav= function()
        {
           
            $http.get(serverUrl + "poiUser/reg/twofavePOI").then(function (response) {
               console.log(response.data)
                if(response.data=== "no fav")
                {
                    
                    self.haveFave= false;
                    return;
                }
                else{
                    self.haveFave= true;
                    if(response.data.length >1){
               self.fav2 = [
                    {poi: response.data[0].poi1.name , pic:response.data[0].poi1.picture ,poiID: response.data[0].poi1.poiID },
                    {poi: response.data[1].poi2.name, pic:response.data[1].poi2.picture,poiID: response.data[1].poi2.poiID },
                  
                  ];
                  console.log(self.fav2)
                }
                else if(response.data.length ==1)
                {
                    console.log(response.data)
                    self.fav2 = [
                       // {poi: response.data.poi1.name , pic:response.data.poi1.picture },
                        {poi: response.data[0].poi2.name, pic:response.data[0].poi2.picture }//,
                      
                      ];
                }


                }
            
            });
        }

        self.goTo=function(name){
            console.log(name)
            $location.path('/poi/id/'+name)
        }        

       

       
    }]);

