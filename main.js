 
 
 $(function() {
     //drive.ping();
     drive.categoriesInitializedCallback = drive.listSheetRows;
     
     drive.init();
          
     
     $('#loadEntities').click(loadEntities);
     

 });
 /*
 function initCategories() {     
     var data = drive.info.categories;
     $(data).each(function() {
        $("#selectCategory").append($("<option></option>")
         .attr("value",this.key)
         .text(this.name));        
     });     
   //  console.log("category loaded");
     
 }
  
 
 function loadEntities() {
     var key = $("#selectCategory").val();
     $("#selectEntity").children().remove();
     updateEntitiesByKey(key);
 } 
 
 function updateEntitiesByKey(key) {
     drive.listSheetsInSpread(key, initEntities);
 }
 
 function initEntities(data) {
     $(data).each(function() {
        $("#selectEntity").append($("<option></option>")
         .attr("value",this.key)
         .text(this.name));        
     });
     
     
     //console.log("entities loaded");
 }
 */