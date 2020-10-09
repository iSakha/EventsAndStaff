var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
var tmp;



//========================================   function doGet   =================================================================
function doGet(e) {

  //Logger.log(e.parameter);
   
 var v = e.parameter.v;
 if (v == null) {
   return loadForm('page_0');
 }else {
 return loadForm(v);
 }
  
}

//========================================   function loadForm   =================================================================
function loadForm(_page) {

  var ss = SpreadsheetApp.openByUrl(url);
  var shEvnt = ss.getSheetByName('Events');
  var shStff = ss.getSheetByName('Staff');
    
  if( (shEvnt.getLastRow() > 1) && (shStff.getLastRow() > 1)) {
  
  var eventList = shEvnt.getRange(2, 2, shEvnt.getRange('A1').getDataRegion().getLastRow() - 1).getValues();
  var staffList = shStff .getRange(2, 2, shStff .getRange('B1').getDataRegion().getLastRow() - 1).getValues();
 
  var htmlEventListArray = eventList .map(function(r){return '<option>' + r[0] + '</option>';}).join('');
  var htmlStaffListArray = staffList .map(function(r){return '<option>' + r[0] + '</option>';}).join('');
  
  tmp = HtmlService.createTemplateFromFile(_page);
  
  tmp.eventList = htmlEventListArray;
  tmp.staffList  = htmlStaffListArray;
  
} else {

  tmp = HtmlService.createTemplateFromFile(_page);
  
}  
  return tmp.evaluate();
}


//function include(_filename) {
//  return HtmlService.createHtmlOutputFromFile(_filename).getContent();
//}


//========================================   function getEventID   =================================================================
function getEventID(_index) {

  var ss = SpreadsheetApp.openByUrl(url);
  var shEvnt = ss.getSheetByName('Events');
  var shStff = ss.getSheetByName('Staff');
  
  var event_id = shEvnt.getRange(_index + 1, 1).getValue();
  
  var staffNeeded = shEvnt.getRange(_index + 1, 6).getValue();
  var staffRegistered = shEvnt.getRange(_index + 1, 8).getValue();
  var staffConfirmed = shEvnt.getRange(_index + 1, 9).getValue();
  
  var staff = [staffNeeded, staffRegistered, staffConfirmed];

  Logger.log(staff);
  
  return(staff);
  
}

