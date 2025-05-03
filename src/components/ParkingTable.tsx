import React from 'react';
import { ParkingSpot } from '../pages/ParkingPlaces';
import '../assets/ParkingTable.scss';

interface ParkingTableProps {
  parkingSpots: ParkingSpot[];
  onSpotClick: (spot: ParkingSpot) => void;
}

const ParkingTable: React.FC<ParkingTableProps> = ({
  parkingSpots,
  onSpotClick,
}) => (
  <div className='parking-card'>
    <div className='parking-card__header'>
      <span className='parking-card__title'>PARKING</span>
    </div>
    <div className='parking-card__body'>
      <h2 className='parking-card__subtitle'>Список парковочных мест</h2>
      <div className='parking-table__container'>
        <table className='parking-table'>
          <thead>
            <tr>
              <th>Парковочное место</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {parkingSpots.map((spot) => (
              <tr
                key={spot.id}
                onClick={() => onSpotClick(spot)}
                style={{ cursor: 'pointer' }}
              >
                <td>{spot.id}</td>
                <td>{spot.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='parking-card__footer'>
        Всего мест: {parkingSpots.length}
      </div>
    </div>
  </div>
);

export default ParkingTable;
