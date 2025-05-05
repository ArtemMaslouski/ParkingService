import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Authorization from './pages/Authorization';
import ParkingPlaces from './pages/ParkingPlaces';
import BookingModal from './pages/BookingModal';
import { ParkingSpot } from './pages/ParkingPlaces';

const spots: ParkingSpot[] = [
  { id: 'A-01', address: 'ул. Центральная, 1' },
  { id: 'A-02', address: 'ул. Центральная, 1' },
  { id: 'B-01', address: 'ул. Центральная, 2' },
];

const App: React.FC = () => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  return (
    <Router>
      <Routes>
        <Route path='/auth' element={<Authorization />} />
        <Route
          path='/parking'
          element={
            <ProtectedRoute>
              <ParkingPlaces
                parkingSpots={spots}
                onSpotClick={setSelectedSpot}
              />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Navigate to='/auth' />} />
      </Routes>
      {selectedSpot && (
        <BookingModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
    </Router>
  );
};

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to='/auth' />;
  return children;
};

export default App;
