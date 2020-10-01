var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
var urlG_sheet = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
var tmp;

function doGet(e) {

  //Logger.log(e.parameter);
   
 var v = e.parameter.v;
 if (v == null) {
   return loadForm('page_0');
 }else {
 return loadForm(v);
 }

  
}

function loadForm(_page) {

  var ss = SpreadsheetApp.openByUrl(url);
  var shEvnt = ss.getSheetByName('Events');
  var shStff = ss.getSheetByName('Staff');
  
  var eventList = shEvnt.getRange(2, 2, shEvnt.getRange('A1').getDataRegion().getLastRow() - 1).getValues();
  var staffList = shStff .getRange(2, 2, shStff .getRange('B1').getDataRegion().getLastRow() - 1).getValues();
  
  tmp = HtmlService.createTemplateFromFile(_page);
  
  var htmlEventListArray = eventList .map(function(r){return '<option>' + r[0] + '</option>';}).join('');
  var htmlStaffListArray = staffList .map(function(r){return '<option>' + r[0] + '</option>';}).join('');
  
  tmp.eventList = htmlEventListArray;
  tmp.staffList  = htmlStaffListArray;
  
  return tmp.evaluate();
}


function include(_filename) {
  return HtmlService.createHtmlOutputFromFile(_filename).getContent();
}