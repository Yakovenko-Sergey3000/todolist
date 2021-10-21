import './App.css';
import {useRoutes} from "./pages/routes";
import {BrowserRouter} from "react-router-dom";


function App() {
  const routes = useRoutes(false)
  return (
    <div className="App">
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </div>
  );
}

export default App;
