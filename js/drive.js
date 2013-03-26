function Drive($scope, $q) {





    ///////////////////////
    this.login = function() {
        var deferred = $q.defer();
        // Step 2: Reference the API key
        gapi.client.setApiKey($scope.drive.apiKey);
        window.setTimeout(function() {
            checkAuth(deferred);
        }, 1);
        return deferred.promise;
    }

     this.listCategories = function() {
        var deferred = $q.defer();
        makeApiCall(function() {
            listSpreadsInFolder(deferred);
        })
        return deferred.promise;
    }

    function checkAuth(deferred) {
        gapi.auth.authorize({
            client_id: $scope.drive.clientId,
            scope: $scope.drive.scopes,
            immediate: true
        }, function(authResult) {
            handleAuthResult(deferred, authResult);
        });
    }

    function handleAuthResult(deferred, authResult) {
        if (authResult && !authResult.error) {
            //$scope.$apply(function() {deferred.resolve(authResult);});
            $scope.$apply(deferred.resolve);
        }
        else {
            $scope.$apply(deferred.reject);
        }
    }

    function makeApiCall(callback) {
        gapi.client.load('drive', 'v2', callback);
    }


    function listSpreadsInFolder(deferred) {

        var request = gapi.client.drive.children.list({
            folderId: $scope.drive.stFolderId,
            q: "mimeType = 'application/vnd.google-apps.spreadsheet'"
        });
        request.execute(function(data) {
            var categories = [];
            var categoriesNumber = 0;
            if (data != null && data.items != null) {
                categoriesNumber = data.items.length;
            }
            if (categoriesNumber == 0) {
                $scope.$apply(function() {
                    deferred.resolve(categories);
                });
            }
            else {
                angular.forEach(data.items, getSpreadInformation(deferred, categories,categoriesNumber));
            }
        });
    }

    function getSpreadInformation(deferred, categories,categoriesNumber) {
        return function(data, index) {
            var id = data.id;
            var request = gapi.client.drive.files.get({
                fileId: id
            });
            request.execute(handleSpreadInformation(deferred,categories,categoriesNumber,index));
        }
    }

    function handleSpreadInformation(deferred,categories,categoriesNumber,index) {
        return function(data) {
            var tag = data.description;
            if (!tag) {
                tag = data.title;
            }
            var key = data.id;
            var category = {
                name: tag,
                key: key,
                entities: []
            };
            categories.push(category);

            if ((categoriesNumber - 1) == index) {
                $scope.$apply(function() {
                    deferred.resolve(categories);
                });
            }
        }
    }


};



///////////////
/*
    Drive.prototype.auth = function() {
        var deferred = $q.defer();

        gapi.client.setApiKey(drive.apiKey);
        gapi.auth.authorize({client_id: drive.clientId, scope: drive.scopes, immediate: true}, function() {
            if (authResult && !authResult.error) {
            drive.makeApiCall(deferred);
        } else {
            drive.requestAuth(deferred);
        }
        });
    }



     function requestAuth(deferred) {
        gapi.auth.authorize({client_id: drive.clientId, scope: drive.scopes, immediate: false}, drive.handleAuthResult);

    },

    init : function() {
        drive.checkAuth();
    },

     handleClientLoad : function() {
        gapi.client.setApiKey(drive.apiKey);
        window.setTimeout(drive.checkAuth,1);
    },

    checkAuth : function() {
        gapi.client.setApiKey(drive.apiKey);
        gapi.auth.authorize({client_id: drive.clientId, scope: drive.scopes, immediate: true}, drive.handleAuthResult);
    },

    handleAuthResult : function(authResult) {
        if (authResult && !authResult.error) {
            //console.log("authorized");
            drive.makeApiCall();
        } else {
            drive.requestAuth();
        }
    },

    requestAuth : function(event) {
        gapi.auth.authorize({client_id: drive.clientId, scope: drive.scopes, immediate: false}, drive.handleAuthResult);

    },

    makeApiCall : function() {
      gapi.client.load('drive', 'v2', function() {
          var request = gapi.client.drive.files.get({fileId : drive.fileId});
          request.execute(drive.initSTDB);
        });
    },

    initSTDB : function() {
        drive.listDocsInSTFolder();
    },

    listDocsInSTFolder : function() {
        var request = gapi.client.drive.children.list({folderId : drive.stFolderId, q : "mimeType = 'application/vnd.google-apps.spreadsheet'"});
        request.execute(function(data) {
            var len = 0;
            if (data != null && data.items != null) {
                len = data.items.length;
            }
            if (len == 0) {
                drive.categoriesInitializedCallback(data.items);
            } else {
                $(data.items).each(function(index) {
                   // console.log(index);
                    var id = this.id;
                    var request = gapi.client.drive.files.get({fileId : id});
                    request.execute(function(data) {
                        var tag = data.description;
                        if (!tag) {
                            tag = data.title;
                        }
                        var key = data.id;
                        var category = {name : tag, key : key, entities : []};
                        drive.info.categories.push(category);
                        drive.mapCategoriesByKey[key] = category;

                        callbackIfLast(index, len, drive.info.categories, drive.categoriesInitializedCallback);

                    });
                });
            }
        });
    },


    listSheetsInSpread : function(key, callback) {
        drive.sprApiGet('worksheets/'+key).done(function(data) {
            var entries = data.feed.entry;
            var len = entries.length;
            var category = drive.mapCategoriesByKey[key];
            $(entries).each(function(index) {
                var key = category.key + '_' + index;
                var entity = {};
                entity.key = key;
                entity.name = this.title.$t;
                drive.mapEntitiesByKey[key] = entity;
                category.entities.push(entity);

                callbackIfLast(index, len, category.entities, callback);

            });
            //console.log(data);


        });
    },

    listSheetRows : function(spreadKey, sheetId, callback) {
        spreadKey = "0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE";
        sheetId = "1";
        drive.sprApiGet('list/' + spreadKey+ '/'+sheetId).done(callback);
    },


    sprApiGet : function(url) {
        if (drive.token == "") {
            drive.token = gapi.auth.getToken().access_token;
        }
        return $.get('https://spreadsheets.google.com/feeds/' + url + '/private/full?alt=json&access_token='+drive.token);
    }

}

function callbackIfLast(index, length, data, callback) {
    if ((length-1) == index && callback != null) {
        callback(data);
    }
}


/*
function loadClient() {
    console.log('inside loadClient function');
    var token = gapi.auth.getToken().access_token;
    var urlLocation = ''; //Get this from the URL of your Spreadsheet in the normal interface for Google Drive.

    //This gives a spitout of ALL spreadsheets that the user has access to.
    var url = 'https://spreadsheets.google.com/feeds/spreadsheets/private/full?access_token=' + token;

    //This gives a list of all worksheets inside the Spreadsheet, does not give actual data
    var url = 'https://spreadsheets.google.com/feeds/worksheets/' + urlLocation + '/private/full?access_token=' + token;

    //This gives the data in a list view - change the word list to cells to work from a cell view and see https://developers.google.com/google-apps/spreadsheets/#working_with_cell-based_feeds for details
    var url = 'https://spreadsheets.google.com/feeds/list/' + urlLocation + '/od6/private/full?access_token=' + token;

    console.log(url);
    $.get(url, function(data) {
        console.log(data);
    });

}
*/
