import React, { useState } from 'react';
import ParkingPlaces, { ParkingSpot } from './pages/ParkingPlaces';
import BookingModal from './pages/BookingModal';

const spots: ParkingSpot[] = [
  { id: 'A-01', address: 'ул. Центральная, 1' },
  { id: 'A-02', address: 'ул. Центральная, 1' },
  { id: 'B-01', address: 'ул. Центральная, 2' },
];

const App: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  return (
    <div>
      <ParkingPlaces parkingSpots={spots} onSpotClick={setSelectedSpot} />
      {selectedSpot && (
        <BookingModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </div>
  );
};

export default App;
