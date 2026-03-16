import { useState, useEffect, useRef } from 'react';
import { Form } from 'react-bootstrap';

function DateFilter({ onFilter }) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const cleanDateFrom = dateFrom?.trim() || '';
    const cleanDateTo = dateTo?.trim() || '';

    if (cleanDateFrom && cleanDateTo) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(cleanDateFrom) && dateRegex.test(cleanDateTo)) {
        onFilter(cleanDateFrom, cleanDateTo);
      }
    } else if (!cleanDateFrom && !cleanDateTo) {
      onFilter(null, null);
    }
  }, [dateFrom, dateTo, onFilter]);

  const handleDateFromChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setDateFrom(value);
  };

  const handleDateToChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setDateTo(value);
  };

  return (
    <div className="date-filter-wrapper mb-4">
      <div className="date-filter-content">
        <span className="filter-label">Матчи с</span>
        <Form.Control
          type="date"
          value={dateFrom}
          onChange={handleDateFromChange}
          className="filter-input"
        />
        <span className="filter-label">по</span>
        <Form.Control
          type="date"
          value={dateTo}
          onChange={handleDateToChange}
          className="filter-input"
        />
      </div>
    </div>
  );
}

export default DateFilter;