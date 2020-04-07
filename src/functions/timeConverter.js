export default function timeConverter(
  UNIX_timestamp,
  showYear,
  showMonth,
  showDate,
  showHour,
  showMin,
  showSec
) {
  var a = new Date(UNIX_timestamp * 1000);

  var months = [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpnień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = "";

  if (typeof showDate != "undefined") time += date + " ";
  if (typeof showMonth != "undefined") time += month + " ";
  if (typeof showYear != "undefined") time += year + " ";
  if (typeof showHour != "undefined") time += hour;
  if (typeof showMin != "undefined") {
    if (showHour) {
      time += ":" + min;
    } else {
      time += min;
    }
  }
  if (typeof showSec != "undefined") {
    if (showMin) {
      time += ":" + sec;
    } else {
      time += sec;
    }
  }

  return time;
}
