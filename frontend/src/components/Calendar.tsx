import React, { useState } from 'react';
import '../assets/Calendar.scss';

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  isDayFullyBusy: (date: Date) => boolean;
}

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const monthNames = [
  'ЯНВАРЬ',
  'ФЕВРАЛЬ',
  'МАРТ',
  'АПРЕЛЬ',
  'МАЙ',
  'ИЮНЬ',
  'ИЮЛЬ',
  'АВГУСТ',
  'СЕНТЯБРЬ',
  'ОКТЯБРЬ',
  'НОЯБРЬ',
  'ДЕКАБРЬ',
];

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onSelectDate,
  isDayFullyBusy,
}) => {
  // Инициализация на апрель 2024, как в макете
  const initialMonth = 3; // апрель (0-индексация)
  const initialYear = 2024;

  const [currentMonth, setCurrentMonth] = useState<number>(initialMonth);
  const [currentYear, setCurrentYear] = useState<number>(initialYear);

  const days = daysInMonth(currentYear, currentMonth);

  // Календарь с понедельника
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const weeks = [];
  let dayNum = 1 - startOffset;
  while (dayNum <= days) {
    weeks.push(
      Array.from({ length: 7 }).map(() => {
        const currentDay = dayNum > 0 && dayNum <= days ? dayNum : null;
        dayNum++;
        return currentDay;
      })
    );
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div>
      <div className='calendar__header'>
        <button onClick={handlePrevMonth}>&lt; Назад</button>
        <span>
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button onClick={handleNextMonth}>Вперёд &gt;</button>
      </div>
      <table className='calendar'>
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Вс</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, wi) => (
            <tr key={wi}>
              {week.map((day, di) => {
                if (!day) return <td key={di}></td>;
                const dateObj = new Date(currentYear, currentMonth, day);
                const isBusy = isDayFullyBusy(dateObj);
                return (
                  <td
                    key={di}
                    className={isBusy ? 'calendar__busy' : 'calendar__free'}
                    onClick={() => !isBusy && onSelectDate(dateObj)}
                  >
                    <span style={{ fontSize: 22 }}>
                      {isBusy ? (
                        <span style={{ color: '#e74c3c' }}>×</span>
                      ) : (
                        <span style={{ color: '#27ae60' }}>✓</span>
                      )}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
