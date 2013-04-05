function Drive($scope, $q, $http) {

    ///////////////////////
    this.login = function() {
        var deferred = $q.defer();
        // Step 2: Reference the API key
        gapi.client.setApiKey($scope.drive.apiKey);
        window.setTimeout(function() {
            checkAuth(deferred);
        }, 1);
        return deferred.promise;
    };

     this.listCategories = function() {
        var deferred = $q.defer();
        makeApiCall(function() {
            listSpreadsInFolder(deferred,$scope.drive.stFolderId);
        })
        return deferred.promise;
    };

     this.listEntities = function(spreadId) {
        var deferred = $q.defer();
        makeApiCall(function() {
            listSheetsInSpread(deferred,spreadId);
        });
        return deferred.promise;
    }

    this.fetchEntityDetails = function(spreadId, sheetIndex) {
        var deferred = $q.defer();
        makeApiCall(function() {
            getSheetFeed(deferred,spreadId, sheetIndex)
        });
        return deferred.promise;
    }
    ////////////////////

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


    function listSpreadsInFolder(deferred, folderId) {

        var request = gapi.client.drive.children.list({
            folderId: folderId,
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

    function handleSpreadInformation(deferred,categories,numberOfSpreads,index) {
        return function(data) {
            var tag = data.description;
            if (!tag) {
                tag = data.title;
            }
            var spreadId = data.id;
            var category = {
                name: tag,
                spreadId : spreadId,
                entities: []
            };
            categories.push(category);

            if ((numberOfSpreads - 1) == index) {
                $scope.$apply(function() {
                    deferred.resolve(categories);
                });
            }
        }
    }

     function listSheetsInSpread(deferred, spreadId) {
        spreadApiGet('worksheets/'+spreadId).success(function(data) {
            var entries = data.feed.entry;
            var numberOfSheets = entries.length;
            var entities = [];
            angular.forEach(entries, getSheetInformation(deferred, entities, numberOfSheets, spreadId));
        });
    }

    function getSheetInformation(deferred, entities, numberOfSheets, spreadId) {
        return function(data, index) {

            var newEntity = {};
            newEntity.spreadId = spreadId;
            newEntity.sheetId = index+1;
            newEntity.name = data.title.$t;
            entities.push(newEntity);
            if ((numberOfSheets-1) == index) {
                deferred.resolve(entities);
            }
        }
    }

    function getSheetFeed(deferred, spreadId, sheetId) {
        //list or cells
        spreadApiGet('cells/' + spreadId+ '/'+sheetId).success(function(data) {
            var cells = data.feed.entry;
            var numberOfCells = cells.length;
            var cellMatrix = [[]];

            angular.forEach(cells, fillCellMatrix(cellMatrix));

            var details = makeDetailsFromCellMatrix(cellMatrix);


            deferred.resolve(details);
        });
    }

    function newWeapon(row) {
        var weapon = {};
        weapon.name = row[2];
        weapon.size = row[3];
        weapon.n = row[4];
        weapon.ab = row[5];
        weapon.ap = row[6];
        weapon.ad = row[7];
        weapon.limits = row[8];
        weapon.arcs = row[9];
        weapon.rof = row[10];
        weapon.range = row[11];
        return weapon;
    }

    function newSubsystem(row) {
        var newSubsystem = {name : row[2], blocks : []};
        for (var i=3; i<row.length; i++) {
            var squares = row[i];
            if (squares != null && squares.length > 0) {
                var squaresObj = angular.fromJson(squares);
                var block = [];
                for (var j=0;j<squaresObj.length; j++) {
                    block.push({value : squaresObj[j]});
                }
                newSubsystem.blocks.push(block);
            }
        }
        return newSubsystem;
    }

    function makeDetailsFromCellMatrix(cellMatrix) {
        var entityDetails = {systems : []};
        var currentSection = "generic";
        for (var r = 0; r<cellMatrix.length; r++) {
            var row = cellMatrix[r];
            if (row[0] == "data") {
                entityDetails.data = angular.fromJson(row[1]);
            } else if (row[0] == "system") {
                var newSystem = {level : row[1], subsystems : []};
                entityDetails.systems.push(newSystem);
                currentSection = "system";
            } else if (row[0] == "weapons") {
               entityDetails.weapons = [];
                currentSection = "weapons";
            } else if (currentSection == "system") {
                var subsystemName = row[2];
                if (subsystemName != null) {
                    var newSubsystem = newSubsystem(row);

                    var l = entityDetails.systems.length;
                    entityDetails.systems[l-1].subsystems.push(newSubsystem);
                }
            } else if (currentSection == "weapons") {
                var weaponName = row[2];
                if (weaponName != null) {
                    var newWeapon = newWeapon(row);

                    entityDetails.weapons.push(newWeapon);
                }
            }
        }
        return entityDetails;
    }
                                               /*
                                               * Name	Size	N°	AB	AP	AD	Limits	Archs	ROF	Range
                                                ML AP	9	5	12	4	8	-1/0	PP/SS	1	*/
    function fillCellMatrix(cellMatrix) {
        return function(cell,index) {
            var row = parseInt(cell.gs$cell.row);
            var col = parseInt(cell.gs$cell.col);
            var inputValue = cell.gs$cell.inputValue;
            resizeMatrix(cellMatrix, row, col);
            cellMatrix[row-1][col-1] = inputValue;
        }
    }

    function resizeMatrix(matrix, row, col) {
        var colSize = matrix[0].length;
        var rowSize = matrix.length;
        var colDiff = col-colSize;
        var rowDiff = row-rowSize;
        for (var i=0;i<colDiff; i++) {
            addMatrixCol(matrix);
        }
        for (var i=0;i<rowDiff; i++) {
            addMatrixRow(matrix);
        }
    }

    function addMatrixRow(matrix) {
        var colSize = matrix[0].length;
        matrix.push(new Array(colSize));
    }

    function addMatrixCol(matrix) {
        var rowSize = matrix.length;
        for(var i=0;i<rowSize; i++) {
            matrix[i].push(null);
        }
    }

    function tryJsonParse(input) {
        var result = {};
        try {
            result =  angular.fromJson(input);
        } catch (e) {

        }
        return result;
    }

    function spreadApiGet(url) {
     /*   if (drive.token == "") {
            drive.token = gapi.auth.getToken().access_token;
        }*/
        return $http.get('https://spreadsheets.google.com/feeds/' + url + '/private/full?alt=json&access_token='+gapi.auth.getToken().access_token);
    }



};

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
