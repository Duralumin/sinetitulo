'use strict';

/* Controllers */

function CategoriesCtrl($scope, $q) {
    var drive = new Drive($scope, $q);
    var promise = drive.login();
    promise.then(
    function() {
        alert("done");
    });
}


function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
