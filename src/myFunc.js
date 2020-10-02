
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
  
}

function addPerson(_pers) {

  var url = 'https://docs.google.com/spreadsheets/d/1uvpi8N92RaCmbMFvbsABk3L4xKtkVUBwbRxrsmIY64o/edit#gid=0';
  var ss = SpreadsheetApp.openByUrl(url);
  var sh = ss.getSheetByName('Staff');

  sh.appendRow([_pers.id, _pers.name]);
  
}
