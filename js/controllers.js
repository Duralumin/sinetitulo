'use strict';

/* Controllers */

function CategoriesCtrl($scope, $q) {

    var drive = {
        clientId : '564722618052.apps.googleusercontent.com',
        apiKey : 'AIzaSyDdWBZeTLWoFINo7sYIoI1ejcfusYLk9gQ',
        scopes : ['https://www.googleapis.com/auth/drive', 'https://spreadsheets.google.com/feeds'],
        stFolderId : '0B9IYt_R27UabRFN0N2pMSVlqWVE'
    };

    $scope.drive = drive;

    var drive = new Drive($scope, $q);
    
    var promise = drive.login().then(drive.listCategories);
    
    $scope.categories = promise;
    
    promise.then(drive.)
    
}


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
