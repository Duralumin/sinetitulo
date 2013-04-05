'use strict';

/* Controllers */

function CategoriesCtrl($scope, $q, $http) {
    $scope.data = [];
    $scope.drive = {
        clientId : '564722618052.apps.googleusercontent.com',
        apiKey : 'AIzaSyDdWBZeTLWoFINo7sYIoI1ejcfusYLk9gQ',
        scopes : ['https://www.googleapis.com/auth/drive', 'https://spreadsheets.google.com/feeds'],
        stFolderId : '0B9IYt_R27UabRFN0N2pMSVlqWVE'
    };

    $scope.st = { currentCategory : {entities : []}, currentEntity : {} };

    var drive = new Drive($scope, $q, $http);

    $scope.categoryChange = function(category) {
        category.entities = drive.listEntities(category.spreadId);
        $scope.st.currentCategory = category;
    }

    $scope.listEntities = function(category) {
        console.log(category);
    }

    $scope.entitiesLoaded = function() {
        return $scope.st.currentCategory.entities.length > 0;
    }

    $scope.entityChange = function() {
        var spreadId = $scope.st.currentEntity.spreadId;
        var sheetId = $scope.st.currentEntity.sheetId;
        $scope.st.currentEntity.details = drive.fetchEntityDetails(spreadId, sheetId);
    }

    $scope.makeArrayTo = function(limit) {
         var data = [];
        for (var i=0; i<limit; i++)  {
            data.push(i);
        }
        return data
    }

    function init() {

        $scope.st.categories = drive.login().then(drive.listCategories);

    }

    init();

    //promise.then(drive.)

}


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
