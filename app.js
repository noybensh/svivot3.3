let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule','ui.bootstrap']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl: 'components/Home/home.html',
        controller : 'homeCtrl as homeCtrl'
       // template: '<h1>This is the default route</h1>'
        })
        .when('/register', {
            templateUrl: 'components/Reg/register.html',
            controller : 'regCtrl as regCtrl'
        })
       .when('/login', {
            templateUrl: 'components/Login/login.html',
            controller : 'logCtrl as logCtrl'
        })
        .when('/poi/id/:id?', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        })
        .when('/poi', {
            templateUrl: 'components/POI/allPOI.html',
            controller : 'allPOICtrl as allPOICtrl'
        })
        .when('/poi/favePoi', {
            templateUrl: 'components/POI/favePoi.html',
            controller : 'favePoiCtrl as faveCtrl'
        })
        .when('/about', {
            templateUrl: 'components/About/about.html',
            controller : 'aboutController as aboutCtrl'
        })
       .otherwise({ redirectTo: '/' });

        
}]);










