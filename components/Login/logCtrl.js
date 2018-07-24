angular.module('citiesApp')
 .controller('logCtrl',  ['$rootScope','$scope','$location', '$http', 'setHeadersToken','POIService','localStorageModel', function ($rootScope, $scope,$location, $http, setHeadersToken,POIService,localStorageModel) {
 
    var self = this;
    let Token ; 
    $rootScope.show = false;
    $rootScope.loginShow = true ; 
    
    let serverUrl = 'http://localhost:3000/'

    self.questions1 = ["What is the name of your first pet?", "What is your high school name?"];

    self.restorePassword = function () {
        $rootScope.loginShow = false; 
        $rootScope.show = true;
        self.restoreUsername = null
    self.restoreAns = null
    self.Q1 = null
    }

    self.backToLogin = function(){
        $rootScope.loginShow = true; 
        $rootScope.show = false;
        self.restoreUsername = null,
        self.restoreAns = null,
        self.Q1 = null
    }
    self.login = function () {
        //let serverUrl = 'http://localhost:3000/'
        if (typeof this.user == 'undefined'){
            alert("Please enter Username and password")
            self.login.content= "Please enter Username and password";
            return
        }
        let user = {
            userName: self.user[1],
            password: self.user[2]
           // isAdmin: true
        }

        $http.post(serverUrl + "users/login", user)
        .then(function (response) {
          // console.log(response.data)
            if (response.data==="incorrect password" || response.data==="No such userName" ){
                alert("One or more of the details are wrong. Please try again.")
                self.login.content= "One or more of the details are wrong. Please try again." ; 
                return
            }
             else if(response.data.message==="bad values"){
                alert("Please enter Username and password")
                self.login.content= "Please enter Username and password";
                return
}
            else{
                
                localStorageModel.remove("token");
                setHeadersToken.set(response.data.token);
                $rootScope.userName=  user.userName;
                $rootScope.isloged = true
                $rootScope.loglbl = "logout"
                POIService.getLastPoi()
                .then(function (response) {
                    let x=[];
                    
                    for (let i=0;i<response.data.length;i++)
                    {
                        //console.log(response.data[i].poiID)
                        x.push(response.data[i]);
                        
                    }
                    $rootScope.favorites=x;
                    
                }, function (response) {

                });
                $location.path('/')
                
            }   
            //First function handles success

        }, function (response) {
            //Second function handles error
            alert ("One or more of the details are wrong. Please try again.")
            self.login.content = "One or more of the details are wrong. Please try again.";
        });
    }


    self.restore = function () {
        let restore = {
            userName: self.restoreUsername,
            ans: self.restoreAns,
            q: self.Q1
        }


        $http.post(serverUrl + "users/passwordRestor", restore)
            .then(function (response) {
                if (response.data === "The answer is incorrect") {
                    self.restore.content= "One or more of the details are wrong. Please try again." ; 
                }
                else {
                    self.restore.content= "Your password is: " + response.data;
                }

            });
    }

 }]);
