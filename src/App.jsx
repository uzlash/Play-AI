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
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { points, damage, levelData, freeBoosts, activateTurbo, turboTap, turboDamageMultiplier, manager, tap, recharge, rechargeTurbo, rechargeRefill, startManager, energy, energyCap, turboActive, managerActive, managerTap } = useGame();
  const [loadingImages, setLoadingImage] = useState();
  
  useEffect(() => {
    const preloadImages = (urls) => {
      let loadedCount = 0;
      const total = urls.length;

      urls.forEach(url => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === total) {
            setLoadingImage(false);
          }
        };
      });
    };

    preloadImages(['/loader.gif', '/miner.gif']);
  }, []);
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


  if(loadingImages) return <LoadingScreen />;

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
