/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useMemo } from "react";
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@tma.js/sdk-react';
import { useIntegration } from '@tma.js/react-router-integration';
import { routes } from "./routes";

function App() {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    if (viewport) {
      return bindViewportCSSVars(viewport);
    }
  }, [viewport]);
  const navigator = useMemo(() => initNavigator(
    'app-navigation-state',
    { hashMode: 'default' },
  ), []);
  const [location, reactNavigator] = useIntegration(navigator);

  useEffect(() => {
    miniApp.ready();
  }, []);

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);

  return (
    <>
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          {routes.map((route) => <Route key={route.path} {...route} />)}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
