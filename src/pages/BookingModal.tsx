import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TimeSlotsModal from '../components/TimeSlotsModal';
import '../assets/BookingModal.scss';

interface ParkingSpot {
  id: string;
  address: string;
}

type BusySlotsByDate = {
  [date: string]: number[]; // например: '2024-04-06': [9, 10, 14]
};

interface BookingModalProps {
  spot: ParkingSpot;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ spot, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  // Храним занятые слоты по датам (на практике можно получать с сервера)
  const [busySlotsByDate, setBusySlotsByDate] = useState<BusySlotsByDate>({
    '2024-04-06': [9, 10, 14],
    '2024-04-07': Array.from({ length: 24 }, (_, i) => i), // полностью занят
  });

  const getBusySlots = (date: Date) => {
    const key = date.toISOString().slice(0, 10);
    return busySlotsByDate[key] || [];
  };

  const isDayFullyBusy = (date: Date) => {
    const busy = getBusySlots(date);
    return busy.length === 24;
  };

  const handleBook = (hour: number) => {
    if (!selectedDate) return;
    const key = selectedDate.toISOString().slice(0, 10);
    setBusySlotsByDate((prev) => {
      const prevBusy = prev[key] || [];
      const newBusy = prevBusy.includes(hour) ? prevBusy : [...prevBusy, hour];
      return { ...prev, [key]: newBusy };
    });
    setShowTimeSlots(false);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
  };

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <button className='modal__close' onClick={onClose}>
          ×
        </button>
        <div className='modal__header'>
          <div>
            <b>PARKING PRO</b> <span>Бронирование места {spot.id}</span>
          </div>
          <div>{spot.address}</div>
        </div>
        <Calendar
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          isDayFullyBusy={isDayFullyBusy}
        />
        {showTimeSlots && selectedDate && (
          <TimeSlotsModal
            date={selectedDate}
            spotId={spot.id}
            busySlots={getBusySlots(selectedDate)}
            onBook={handleBook}
            onClose={() => setShowTimeSlots(false)}
          />
        )}
      </div>
    </div>
  );
};

export default BookingModal;
