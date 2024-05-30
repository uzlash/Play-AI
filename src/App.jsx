import { routes } from "./routes";
import {
  Navigate,
  Route,
  // Router,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import "./App.css";
import useGame from "./states/useGame";
import { useEffect } from "react";

function App() {
  const { points, damage, levelData, freeBoosts, activateTurbo, turboTap, turboDamageMultiplier, manager, tap, recharge, rechargeTurbo, rechargeRefill, startManager, energy, energyCap, turboActive, managerActive, managerTap } = useGame();

  useEffect(() => {
    console.log({ points, damage, levelData, freeBoosts, activateTurbo, turboTap, turboDamageMultiplier, manager, tap, recharge, rechargeTurbo, rechargeRefill, startManager, energy, energyCap, turboActive, managerActive, managerTap })
    const intervalId = setInterval(() => {
      recharge();
      rechargeTurbo();
      rechargeRefill()
    }, 999);

    managerTap()
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let intervalId;

    if (managerActive) {
      intervalId = setInterval(() => {
        managerTap();
      }, 1001);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [managerActive, managerTap]);

  return (
    <>
      <Router>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
