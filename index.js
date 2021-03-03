// Your code here
const createEmployeeRecord = (employeeArray) => {
  let employee = {
    firstName: employeeArray[0],
    familyName: employeeArray[1],
    title: employeeArray[2],
    payPerHour: employeeArray[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
  return employee;
};

const createEmployeeRecords = (employeesArray) => {
  let employees = employeesArray.map(createEmployeeRecord);
  return employees;
};

const createTimeInEvent = (employee, timeStamp) => {
  let hour = timeStamp.split(" ")[1];
  let date = timeStamp.split(" ")[0];
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
};

const createTimeOutEvent = (employee, timeStamp) => {
  let hour = timeStamp.split(" ")[1];
  let date = timeStamp.split(" ")[0];
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour),
    date: date,
  });
  return employee;
};

const hoursWorkedOnDate = (employee, date) => {
  let timeIn = employee.timeInEvents.find((x) => x.date === date);
  let timeOut = employee.timeOutEvents.find((x) => x.date === date);
  let result = (timeOut.hour - timeIn.hour) / 100;
  return result;
};

const wagesEarnedOnDate = (employee, date) => {
  let hours = hoursWorkedOnDate(employee, date);
  let wages = hours * employee.payPerHour;
  return wages;
};

const allWagesFor = (employee) => {
  let eligableDates = employee.timeInEvents.map(function (e) {
    return e.date;
  });
  let payable = eligableDates.reduce(function (memo, date) {
    return memo + wagesEarnedOnDate(employee, date);
  }, 0);
  return payable;
};

const findEmployeeByFirstName = (employees, firstName) => {
  let employee = employees.find((e) => e.firstName === firstName);
  return employee;
};

const calculatePayroll = (employees) => {
  let sum = employees.map((e) => allWagesFor(e));
  return sum.reduce((num, sum) => num + sum);
};
