angular.module('citiesApp')
    .controller('indexController',['$scope','$http','$rootScope','localStorageModel','POIService','setHeadersToken' ,function ($scope,$http,$rootScope,localStorageModel,POIService,setHeadersToken) {


        self = this;
        let serverUrl = 'http://localhost:3000/'
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "./countries.xml", true);
        xmlhttp.send();
        $rootScope.myXML=xmlhttp;
       

        self.logout=function(){
            localStorageModel.remove("token");
            $rootScope.userName="Guest"
            $rootScope.isloged=false
            $rootScope.loglbl = "login"
            //$rootScope.localFav=[];
            //bringFavorites.reset();
            //localStorageModel.removeToken('token')
            //setHeadersToken.set("")
         }

         self.setLogin=function(){
            $rootScope.loginShow = true
            $rootScope.show = false;
         }

         $scope.initiate=function()
         {
             let token=localStorageModel.getLocalStorage("token");
             
             setHeadersToken.set(token);
             $http.get(serverUrl+'poiUser/reg/checkToki').then(function (response){
                if (response.data.message == 'its good') {
                    $rootScope.userName = response.data.userName;
                    $rootScope.isloged = true;
                    $rootScope.loginShow = false;
                    $rootScope.show = true;
                    $rootScope.loglbl = "logout"
                    POIService.getLastPoi()
                    .then(function (response) {
                        let x=[];
                        let y=[];
                        for (let i=0;i<response.data.length;i++)
                        {
                            x.push(response.data[i]);
                        
                        }
                        $rootScope.favorites=x;
                        
                    }, function (response) {

                    });
                }
                else{
                    $rootScope.userName = "Guest"
                    $rootScope.poi;
                    $rootScope.favorites;
                    $rootScope.isloged = false
                    $rootScope.loginShow = true
                    $rootScope.show = false;
                    $rootScope.loglbl = "login"
                }
                console.log(response.data.message)
             }, function (response) {
 
            });
            /* $http.get(serverUrl+'poiUser/reg/checkToki/'+token).then(function (response) {
 
 
                 if (response.data.success) {
                     $rootScope.username = response.data.username;
                     $rootScope.connect = true;
                     setHeaderToken.set(token);
                     POIService.getLastUplodPOI()
                         .then(function (response) {
                             let x=[];
                             let y=[];
                             for (let i=0;i<response.data.length;i++)
                             {
                                 x.push(response.data[i].ID);
                                 y.push(response.data[i].ID);
                             }
                             $rootScope.favorites=x;
                             $rootScope.originalFavorites=y;
                         }, function (response) {
 
                         });
                 }
                 else
                 {
                     $rootScope.username="guest";
                     $rootScope.connect=false;
                 }
             });*/
         }
         

    }]);
