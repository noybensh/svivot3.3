

angular.module('citiesApp')
.service('setHeadersToken',[ '$http','localStorageModel', function ($http,localStorageModel) {

    let token = ""

    this.set = function (t) {
        token = t
        $http.defaults.headers.common[ 'x-access-token' ] = t
        // $httpProvider.defaults.headers.post[ 'x-access-token' ] = token
        localStorageModel.addLocalStorage('token', token)
      //  localStorageModel.addLocalStorage('userName', token.user.userName)
        console.log(t)

    }

    


}])
    

    
    .controller('serviceController', ['$location', '$http', 'setHeadersToken','localStorageModel', function ($location, $http, setHeadersToken,localStorageModel) {


        self = this;

        self.directToPOI = function () {
            $location.path('/poi')
        }

        let serverUrl = 'localhost:3000/'

        let user = {
            userName: "yahalom",
            password: "12345",
           // isAdmin: true
        }


        self.signUp = function () {
            // register user
            $http.post(serverUrl + "Users/", user)
                .then(function (response) {
                    //First function handles success
                    self.signUp.content = response.data;
                }, function (response) {
                    //Second function handles error
                    self.signUp.content = "Something went wrong";
                });
        }

        self.login = function () {
            // register user
            $http.post("http://"+serverUrl + "users/login", user)
                .then(function (response) {
                    //First function handles success
                    console.log(response)


                }, function (response) {
                    //Second function handles error
                    self.login.content = "Somethindddddg went wrong";
                });
        }

        self.reg = function () {
            // register user
            $http.post(serverUrl + "reg/", user)
                .then(function (response) {
                    //First function handles success
                    self.reg.content = response.data;

                }, function (response) {
                    self.reg.content = response.data
                    //Second function handles error
                    // self.reg.content = "Something went wrong";
                });
        }

        self.addTokenToLocalStorage = function () {
            localStorageModel.addLocalStorage('token', self.login.content)
        }



    }]);


