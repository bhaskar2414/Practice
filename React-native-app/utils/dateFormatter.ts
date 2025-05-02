export const formatDate = (date: Date): string => {
  const months = [
    'જાન્યુઆરી', 'ફેબ્રુઆરી', 'માર્ચ', 'એપ્રિલ', 'મે', 'જૂન',
    'જુલાઈ', 'ઓગસ્ટ', 'સપ્ટેમ્બર', 'ઓક્ટોબર', 'નવેમ્બર', 'ડિસેમ્બર'
  ];
  
  const days = [
    'રવિવાર', 'સોમવાર', 'મંગળવાર', 'બુધવાર',
    'ગુરુવાર', 'શુક્રવાર', 'શનિવાર'
  ];
  
  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day}, ${dayOfMonth} ${month}, ${year}`;
};