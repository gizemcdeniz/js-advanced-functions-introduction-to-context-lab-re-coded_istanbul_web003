const createEmployeeRecord = (employeeRecorded) => {
    const newRec = {
        firstName : employeeRecorded[0],
        familyName : employeeRecorded[1],
        title : employeeRecorded[2],
        payPerHour : employeeRecorded[3],
        timeInEvents: [],
        timeOutEvents: []
    }
   
    return newRec;
}

const createEmployeeRecords = (employeeRecorded) => {
    const arrOfRecs = employeeRecorded.map(empolyee => createEmployeeRecord(empolyee));

    return arrOfRecs;
}

const createTimeInEvent = (employeeRecorded, date) => {
    const newDate = date.split(' ');

    employeeRecorded.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    })

    return employeeRecorded;
}

const createTimeOutEvent = (employeeRecorded, date) => {
    const newDate = date.split(' ');

    employeeRecorded.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(newDate[1]),
        date: newDate[0]
    })

    return employeeRecorded;
}

const hoursWorkedOnDate = (employeeRecorded, date) => {
    for (let i = 0; i<employeeRecorded.timeInEvents.length; i++) {
        if(employeeRecorded.timeInEvents[i].date === date){
            return (employeeRecorded.timeOutEvents[i].hour - employeeRecorded.timeInEvents[i].hour) /100;
        }

    }
}

const allWagesFor = (employee) =>{
    return employee.timeInEvents.map(function (e){
        return e.date;
    }).reduce (function (acc,current){
        return acc + wagesEarnedOnDate(employee,current)
    },0)
  }

const wagesEarnedOnDate = (employee,date) =>{
    return hoursWorkedOnDate(employee,date) * employee.payPerHour;
  }
  


  
  const findEmployeeByFirstName = (arr,name) => {
      return arr.find((el)=>{
          return el.firstName===name;
      })
  }
  const calculatePayroll = (arr) => {
    return arr.map((employee) => {
        return allWagesFor(employee);
    }).reduce(function (acc,curr){
        return acc + curr;
    },0);
}