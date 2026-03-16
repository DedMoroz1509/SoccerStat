export const formatScore = (score) => {
  if (!score) return '- : -';
  
  const parts = [];
  
  const fullTimeHome = score.fullTime?.home ?? '-';
  const fullTimeAway = score.fullTime?.away ?? '-';
  parts.push(`${fullTimeHome}:${fullTimeAway}`);
  
  if (score.extraTime?.home != null && score.extraTime?.away != null) {
    parts.push(`(${score.extraTime.home}:${score.extraTime.away})`);
  }
  
  if (score.penalties?.home != null && score.penalties?.away != null) {
    parts.push(`(${score.penalties.home}:${score.penalties.away})`);
  }
  
  return parts.join(' ');
};

export const formatStatus = (status) => {
  if (!status) return 'Неизвестно';
  
  const statusMap = {
    'SCHEDULED': 'Запланирован',
    'LIVE': 'В прямом эфире',
    'IN_PLAY': 'В игре',
    'PAUSED': 'Пауза',
    'FINISHED': 'Завершен',
    'POSTPONED': 'Отложен',
    'SUSPENDED': 'Приостановлен',
    'CANCELED': 'Отменен'
  };
  
  return statusMap[status] || status;
};