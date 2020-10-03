
function write_to_DB(_data, _id) {

  var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
  
  var ss = SpreadsheetApp.openByUrl(url);
  var sh = ss.getSheetByName('Events');
  
  var staffRegistered = 0;
  var staffConfirmed = 0;

  _data.endDate.setDate(_data.endDate.getDate() - 1);
  
  sh.appendRow([_id, _data.title, _data.location, _data.startDate, _data.endDate, _data.numberOfStaff, _data.notes, staffRegistered, staffConfirmed]);

}


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

function addPerson(_pers) {

  var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
  var ss = SpreadsheetApp.openByUrl(url);
  var sh = ss.getSheetByName('Staff');

  sh.appendRow([_pers.id, _pers.name]);
  
}


function createStaffSpreadsheet(_staff_ID) {

  var folder = DriveApp.getFolderById("1-YRer_07CVDFaWRSpB8j3iZTg2pJyOi0");
  var ss = SpreadsheetApp.create(_staff_ID);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  
  }
  
function createEventSpreadsheet(_event_ID) {

  folder = DriveApp.getFolderById("16XQff1_JO0T4Vkalb0mPwCz_Uy7Q76Q6");
  var ss = SpreadsheetApp.create(_event_ID);
  DriveApp.getFileById(ss.getId()).moveTo(folder);
  var sh = ss.getSheetByName('Sheet1');
  sh.setName('Registered');
  
  sh.getRange('A1').setValue('staff_ID');
  sh.getRange('B1').setValue('staff_Name');
  
  ss.insertSheet('Confirmed');
  
  sh = ss.getSheetByName('Confirmed');
  sh.getRange('A1').setValue('staff_ID');
  sh.getRange('B1').setValue('staff_Name');
  
  }
  
function addPersonToEventSheet(_eventIndex, _staffIndex) {

  _eventIndex = 1;
  _staffIndex = 1;

  var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
  var ss_dtb = SpreadsheetApp.openByUrl(url);
  var shEvent = ss_dtb.getSheetByName('Events');
  var shStaff = ss_dtb.getSheetByName('Staff');
  
  var urlEvent = shEvent.getRange(_eventIndex + 1, 10).getValue();
  var urlStaff = shStaff.getRange(_staffIndex + 1, 3).getValue();
  var nameStaff = shStaff.getRange(_staffIndex + 1, 2).getValue();
  var idStaff = shStaff.getRange(_staffIndex + 1, 1).getValue();

  var ssEvent = SpreadsheetApp.openByUrl(urlEvent);
  var sh = ssEvent.getSheetByName('Registered');
  
  var record = {};
  record.staffID = idStaff;
  record.staffName = nameStaff;
  
  sh.appendRow([record.staffID, record.staffName]);
  
  
  Logger.log(idStaff);
  
}
  
  
