import { routes } from "./routes";
import {
  Navigate,
  Route,
  // Router,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import "./App.css";

function App() {
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
