import React from 'react';
import '../assets/TimeSlotsModal.scss';

interface TimeSlotsModalProps {
  date: Date;
  spotId: string;
  busySlots: number[];
  onBook: (hour: number) => void;
  onClose: () => void;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

const TimeSlotsModal: React.FC<TimeSlotsModalProps> = ({
  date,
  spotId,
  busySlots,
  onBook,
  onClose,
}) => {
  const formattedDate = date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='modal-overlay'>
      <div className='modal timeslots-modal'>
        <button className='modal__close' onClick={onClose}>
          ×
        </button>
        <div className='modal__header'>
          <b>PARKING PRO</b> <span>Бронирование места {spotId}</span>
        </div>
        <div className='modal__subheader'>{formattedDate}</div>
        <div className='timeslots-list'>
          {hours.map((hour) => {
            const isBusy = busySlots.includes(hour);
            const label = `${hour.toString().padStart(2, '0')}:00 - ${(hour + 1)
              .toString()
              .padStart(2, '0')}:00`;
            return (
              <button
                key={hour}
                className={`timeslot-btn ${isBusy ? 'busy' : 'free'}`}
                disabled={isBusy}
                onClick={() => !isBusy && onBook(hour)}
              >
                {label}
                {isBusy ? (
                  <span className='timeslot-cross'>×</span>
                ) : (
                  <span className='timeslot-check'>✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimeSlotsModal;
