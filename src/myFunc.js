//  Global variables 'url_dtb'- url of database spreadsheet, 'ss_dtb' - database spreadsheet
//  shEvent,shStaff - sheets in database spreadsheet

var url_dtb = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
var ss_dtb = SpreadsheetApp.openByUrl(url_dtb);
var shEvent = ss_dtb.getSheetByName('Events');
var shStaff = ss_dtb.getSheetByName('Staff');

//========================================   function write Event to_DB   =================================================================
function write_to_DB(_data, _id) {
  
  var staffRegistered = 0;
  var staffConfirmed = 0;

  _data.endDate.setDate(_data.endDate.getDate() - 1);
  
  shEvent.appendRow([_id, _data.title, _data.location, _data.startDate, _data.endDate, _data.numberOfStaff, _data.notes, staffRegistered, staffConfirmed]);
  
//  var color_r = shEvent.getRange('a1').getBackgroundObject().asRgbColor().getRed();
//  var color_g = shEvent.getRange('a1').getBackgroundObject().asRgbColor().getGreen();
//  var color_b = shEvent.getRange('a1').getBackgroundObject().asRgbColor().getBlue();
//  Logger.log('red: ' + color_r + ' green: ' + color_g + ' blue: ' + color_b);

  var monthIndex = _data.startDate.getMonth();
//  Logger.log(month);
  var sheets = ss_dtb.getSheets();
  var shMonth = sheets[monthIndex + 2];
  shMonth.appendRow([_id, _data.title, _data.location, _data.startDate, _data.endDate, _data.numberOfStaff, _data.notes, staffRegistered, staffConfirmed]);
//  Logger.log(shMonth.getName());
}

//========================================   function createEvent   =================================================================
function createEvent(_event) {

  var calendar = CalendarApp.getCalendarById('9pqgeoe0s2n22jlftlkt2fa73g@group.calendar.google.com');
  
_event.startDate = new Date(_event.startDate);
_event.endDate = new Date(_event.endDate);

_event.endDate.setDate(_event.endDate.getDate() + 1);


  var event = calendar.createAllDayEvent(_event.title, _event.startDate, _event.endDate);

  var eventID = event.getId();
  
  write_to_DB(_event, eventID);
  
  createEventSpreadsheet(eventID);
}

//========================================   function addPerson   =================================================================
function addPerson(_pers) {

  shStaff.appendRow([_pers.id, _pers.name]);
  
}

//========================================   function createStaffSpreadsheet   =================================================================
function createStaffSpreadsheet(_staff_ID) {

  var folder = DriveApp.getFolderById("1-YRer_07CVDFaWRSpB8j3iZTg2pJyOi0");
  var ss = SpreadsheetApp.create(_staff_ID);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  
  }
  
//========================================   function createEventSpreadsheet   =================================================================  
function createEventSpreadsheet(_event_ID) {

  folder = DriveApp.getFolderById("16XQff1_JO0T4Vkalb0mPwCz_Uy7Q76Q6");
  var ss = SpreadsheetApp.create(_event_ID);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  
  var event_ss_url = ss.getUrl();
  shEvent.getRange(shEvent.getLastRow(), 10).setValue(event_ss_url);
  
  var sh = ss.getSheetByName('Sheet1');
  sh.setName('Registered');
  
  sh.getRange('A1').setValue('staff_ID');
  sh.getRange('B1').setValue('staff_Name');
  sh.getRange('A1:B1').setBackgroundRGB(255, 229, 153);
  sh.getRange('A1:B1').setFontWeight("bold");
  
  ss.insertSheet('Confirmed');
  
  sh = ss.getSheetByName('Confirmed');
  sh.getRange('A1').setValue('staff_ID');
  sh.getRange('B1').setValue('staff_Name');
  sh.getRange('A1:B1').setBackgroundRGB(255, 229, 153);
  sh.getRange('A1:B1').setFontWeight("bold");
    
  }

//========================================   function addPersonToEventSheet   =================================================================
function addPersonToEventSheet(_eventIndex, _staffIndex) {

  var urlEvent = shEvent.getRange(_eventIndex + 1, 10).getValue();
  var urlStaff = shStaff.getRange(_staffIndex + 1, 3).getValue();
  var nameStaff = shStaff.getRange(_staffIndex + 1, 2).getValue();
  var idStaff = shStaff.getRange(_staffIndex + 1, 1).getValue();
  

//      Write pre-registered Staff to Event spreadsheet

  var ssEvent = SpreadsheetApp.openByUrl(urlEvent);
  var sh = ssEvent.getSheetByName('Registered');
  
  var record = {};
  record.staffID = idStaff;
  record.staffName = nameStaff;
  
  sh.appendRow([record.staffID, record.staffName]);
  
  var numReg = shEvent.getRange(_eventIndex + 1, 8).getValue();
  //numReg = parsInt(numReg);
  numReg++;
  Logger.log(numReg);
  shEvent.getRange(_eventIndex + 1, 8).setValue(numReg);
  
//  Logger.log(idStaff);
  
}
  
function getListMonthEvents(_monthIndex) {
//  _monthIndex = 0;
  var sheets = ss_dtb.getSheets();
  var shMonth = sheets[_monthIndex + 1];
     
   var eventList = [];
   
   var lastRowNum = shMonth.getLastRow(); 
   
   
   for (var i = 2;i <= lastRowNum;i++) {
     var event = shMonth.getRange(i, 2).getValue();
     eventList.push(event);
   }
   Logger.log(eventList);
  return(eventList);
 
}
