export default function getDateInFormat() {
  const currentDate = new Date();

  const month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month}/${date}/${year}`;

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const isAM = hours < 12;

  const formattedHours = hours % 12 || 12; // convert to 12-hour format
  const formattedMinutes = minutes.toString().padStart(2, '0'); // add leading zero if necessary
  const ampm = isAM ? 'AM' : 'PM';
  
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return [formattedDate, formattedTime];
}