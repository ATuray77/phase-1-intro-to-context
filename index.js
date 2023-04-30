// Your code here


function createEmployeeRecord(employeeData){
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(employeeData) {
  return employeeData.map(function (data1) {
    return createEmployeeRecord(data1)
  })
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date, 
    })
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date, 
    })
    return employeeRecord;
  }

  function hoursWorkedOnDate(employeeRecord, dateOnForm) {
    let inEvent = employeeRecord.timeInEvents.find(function(e) {
      return e.date === dateOnForm
    })

    let outEvent = employeeRecord.timeOutEvents.find(function(e) {
      return e.date === dateOnForm
    })
    return (outEvent.hour - inEvent.hour) / 100
  }

  function wagesEarnedOnDate(employeeRecord, dateOnForm) {
    let earnedWage = hoursWorkedOnDate(employeeRecord, dateOnForm) * employeeRecord.payPerHour
    return parseFloat(earnedWage.toString())
  }

  function allWagesFor(employeeRecord) {
    let recordedDates = employeeRecord.timeInEvents.map(function(e) {
      return e.date
    })
    let paytoReceive = recordedDates.reduce(function(memo, d) {
      return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)
    return paytoReceive;
  }

  function findEmployeeByFirstName(employeeData, firstName) {
    return employeeData.find(function(rec) {
      return rec.firstName === firstName
    })
  }

  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(memo, rec) {
      return memo + allWagesFor(rec)
    }, 0)
  }