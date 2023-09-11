import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import AuthPage from '../AuthPage/AuthPage';
import NewPurchasePage from '../NewPurchasePage/NewPurchasePage';
import PurchaseHistoryPage from '../PurchaseHistoryPage/PurchaseHistoryPage';
import './App.css';

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <Routes>
            {/* Route components in here */}
            <Route path="/purchases/new" element={<NewPurchasePage user={user} setUser={setUser} />} />
            <Route path="/purchases" element={<PurchaseHistoryPage />} />
            {/* redirect to /purchases/new if path in address bar hasn't matched a <Route> above */}
            <Route path="/*" element={<Navigate to="/purchases/new" />} />
          </Routes>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}

export default App;
