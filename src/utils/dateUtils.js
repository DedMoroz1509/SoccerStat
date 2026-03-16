export const formatDate = (utcDateString) => {
  if (!utcDateString) return '';
  const date = new Date(utcDateString);
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const formatTime = (utcDateString) => {
  if (!utcDateString) return '';
  const date = new Date(utcDateString);
  return date.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const formatDateForAPI = (dateString) => {
  if (!dateString) return '';
  const cleanDate = dateString.replace(/\s/g, '');
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) {
    return cleanDate;
  }
  return '';
};