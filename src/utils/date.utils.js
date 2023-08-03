function getMSFromTimeUnit(date) {
  const [ value, unit ] = date;

  switch (unit) {
  case 'seconds':
    return value * 1000;
  case 'minutes':
    return value * 60 * 1000;
  case 'hours':
    return value * 60 * 60 * 1000;
  case 'days':
    return value * 24 * 60 * 60 * 1000;
  case 'weeks':
    return value * 7 * 24 * 60 * 60 * 1000;
  case 'months':
    return value * 30 * 24 * 60 * 60 * 1000;
  case 'years':
    return value * 365 * 24 * 60 * 60 * 1000;
  default:
    return 0;
  }
}

function getYearObjectFromInput(inputValue) {
  let yearObject = null;

  if(inputValue) {
    const inputDate = new Date(inputValue);
    yearObject = {
      day: inputDate.getDate(),
      month: inputDate.getMonth(),
      year: inputDate.getFullYear()
    };
  }

  return yearObject;
}

function getInputValueFromYearObject(yearObject) {
  return `${yearObject.year}-${String(yearObject.month + 1).padStart(2, '0')}-${String(yearObject.day).padStart(2, '0')}`;
}

function elapsedTime(timestamp) {
  let currentTime = Date.now();
  let elapsedMs = Math.max(0, currentTime - timestamp);
  let elapsedSeconds = Math.floor(elapsedMs / 1000);

  if (elapsedSeconds < 60) {
    return elapsedSeconds + "s";
  } else if (elapsedSeconds < 3600) {
    return Math.floor(elapsedSeconds / 60) + "min";
  } else if (elapsedSeconds < 86400) {
    return Math.floor(elapsedSeconds / 3600) + "h";
  } else if (elapsedSeconds < 2592000) {
    return Math.floor(elapsedSeconds / 86400) + "d";
  } else if (elapsedSeconds < 31104000) {
    return Math.floor(elapsedSeconds / 2592000) + "m";
  } else {
    return Math.floor(elapsedSeconds / 31104000) + "y";
  }
}

function getDateInStringFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}

function getMonthYearFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${month} ${year}`;
}

function getNextInvoiceDate() {
  let date = new Date();

  date.setMonth(date.getMonth() + 1);
  date.setDate(1);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return '1 ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}

function getTimeOfMessageFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function getChatTimestamp(timestamp) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
  const messageDate = new Date(timestamp);
  const now = new Date();

  // If the timestamp is from today
  if (now.toDateString() === messageDate.toDateString()) {
    return "Today";
  }

  // If the timestamp is from yesterday
  let yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  if (yesterday.toDateString() === messageDate.toDateString()) {
    return "Yesterday";
  }

  // If the timestamp is from this week
  let startOfWeek = new Date();
  startOfWeek.setDate(now.getDate() - now.getDay());
  if (messageDate >= startOfWeek) {
    return daysOfWeek[messageDate.getDay()];
  }

  // If the timestamp is from this year
  let startOfYear = new Date(new Date().getFullYear(), 0, 1);
  if (messageDate >= startOfYear) {
    return `${messageDate.getDate()} ${monthsOfYear[messageDate.getMonth()]}`;
  }

  // If the timestamp is from another year
  return `${messageDate.getDate()} ${monthsOfYear[messageDate.getMonth()]} ${messageDate.getFullYear()}`;
}

function getTimestampOneYearLater(timestamp) {
  let givenDate = new Date(timestamp);
  givenDate.setFullYear(givenDate.getFullYear() + 1);
  return givenDate.getTime();
}

function isSameDay(timestamp1, timestamp2) {
  // convert timestamps to date objects
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  // compare year, month, and date
  return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

const DateUtils = {
  getMSFromTimeUnit,
  getYearObjectFromInput,
  getInputValueFromYearObject,
  elapsedTime,
  getDateInStringFromTimestamp,
  getMonthYearFromTimestamp,
  getNextInvoiceDate,
  getTimeOfMessageFromTimestamp,
  getChatTimestamp,
  getTimestampOneYearLater,
  isSameDay
};

export default DateUtils;