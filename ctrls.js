function CategoriesCtrl($scope, $http) {
     $scope.categories = [];
    
    $scope.handleCategories = function(categories) {
        $scope.categories = categories;
        $scope.$apply();
    }
    
    $scope.init = function() {
        drive.categoriesInitializedCallback = $scope.handleCategories;
        
        drive.init();
    }
    
    $scope.init();

    
    
    
}

function EntityCtrl($scope, $http) {
    $scope.rawData = '{"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Morning Star"},"link":[{"rel":"alternate","type":"text/html","href":"https://spreadsheets.google.com/ccc?key\u003d0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full?alt\u003djson"}],"author":[{"name":{"$t":"Giovanni.Lucifugo"},"email":{"$t":"giovanni.lucifugo@gmail.com"}}],"openSearch$totalResults":{"$t":"6"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cokwr"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"dataRow"},"content":{"type":"text","$t":"data: {armour : 9}"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cokwr"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cokwr/128nb4f04d"}],"gsx$_d415a":{"$t":"dataRow"},"gsx$data":{"$t":"{armour : 9}"},"gsx$level":{"$t":""},"gsx$systemdata":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cpzh4"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Row: 3"},"content":{"type":"text","$t":"level: 0, systemdata: {name : scafo, defBlockDam:5, nBlocks:5, blocks : []}, {name : equipaggio, defBlockDam:5, nBlocks:5, blocks : []} {name : massa, defBlockDam:5, nBlocks:5, blocks : []}"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cpzh4"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cpzh4/kd5h8kd446a9h"}],"gsx$data":{"$t":""},"gsx$level":{"$t":"0"},"gsx$systemdata":{"$t":"{name : scafo, defBlockDam:5, nBlocks:5, blocks : []}, {name : equipaggio, defBlockDam:5, nBlocks:5, blocks : []} {name : massa, defBlockDam:5, nBlocks:5, blocks : []}"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cre1l"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Row: 4"},"content":{"type":"text","$t":"level: 1"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cre1l"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/cre1l/e1k3b"}],"gsx$data":{"$t":""},"gsx$level":{"$t":"1"},"gsx$systemdata":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/chk2m"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Row: 5"},"content":{"type":"text","$t":"level: 2"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/chk2m"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/chk2m/e965g"}],"gsx$data":{"$t":""},"gsx$level":{"$t":"2"},"gsx$systemdata":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ciyn3"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Row: 6"},"content":{"type":"text","$t":"level: 3"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ciyn3"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ciyn3/egi7l"}],"gsx$data":{"$t":""},"gsx$level":{"$t":"3"},"gsx$systemdata":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ckd7g"},"updated":{"$t":"2013-03-18T16:41:26.363Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Row: 7"},"content":{"type":"text","$t":"level: 4"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ckd7g"},{"rel":"edit","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full/ckd7g/eo4a0"}],"gsx$data":{"$t":""},"gsx$level":{"$t":"4"},"gsx$systemdata":{"$t":""}}]}}';
    $scope.entity = {};
    $scope.massageData = function(rawData) {
        $(rawData.feed.entry).each(function() {
            if (this.title.$t == "dataRow") {
                $scope.entity.data = $.parseJSON(this.content.$t).data;
            }
            else {
                if ($scope.entity.systems == null) {
                    $scope.entity.systems = [];
                }
                var system = $.parseJSON(this.content.$t);
                $scope.entity.systems.push(system);
            }
        });
    }
    drive.listSheetRows()
    $.get("https://spreadsheets.google.com/feeds/list/0AtIYt_R27UabdDBKTDlETDhmOENyakc2UGdxeDRCdFE/1/private/full?access_token=ya29.AHES6ZT4Zw_UxM3nlI2g98apuNRhVndxX5gIpd9TPpfOLvxPymDTzt9S0w&alt=json").done($scope.massageData);
    //$scope.massageData($.parseJSON($scope.rawData));
}
