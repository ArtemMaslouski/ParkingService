import React from 'react';
import ParkingTable from '../components/ParkingTable';

export interface ParkingSpot {
  id: string;
  address: string;
}

interface ParkingPlacesProps {
  parkingSpots: ParkingSpot[];
  onSpotClick: (spot: ParkingSpot) => void;
}

const ParkingPlaces: React.FC<ParkingPlacesProps> = ({
  parkingSpots,
  onSpotClick,
}) => {
  return <ParkingTable parkingSpots={parkingSpots} onSpotClick={onSpotClick} />;
};

export default ParkingPlaces;
