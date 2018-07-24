app.service('POIService', ['$http', function ($http) {
    let serverUrl = 'http://localhost:3000/';
    this.getLastPoi=function () {
        return $http.get(serverUrl + 'poiUser/reg/favePOI');
    }
    this.getPoi = function (id) {
        return $http.get(serverUrl + "POI/getPOI/"+id);
    };
    this.getRev = function (id) {
        return $http.get(serverUrl + "POI/getPoiRev/"+id);
    };
    this.postReview=function(data)
    {
        return $http.post(serverUrl+'poiUser/reg/addRank/',data)

    }
    
   
}])