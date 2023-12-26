export function convertTimeStringToDate(timeString) {
  const [hours, minutes] = timeString.split(":");
  const currentDate = new Date();
  currentDate.setHours(parseInt(hours, 10));
  currentDate.setMinutes(parseInt(minutes, 10));
  currentDate.setSeconds(0);
  return currentDate;
}
