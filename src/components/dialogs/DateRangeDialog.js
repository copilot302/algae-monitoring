import React, { useState } from 'react';

const DateRangeDialog = ({ isOpen, onClose, onApply, minDate, maxDate }) => {
  const [selectedDate, setSelectedDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    onApply(selectedDate);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Select Date</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Choose a date:</label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
            max={maxDate}
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateRangeDialog;
