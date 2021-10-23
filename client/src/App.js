import './App.css';
import {useRoutes} from "./pages/routes";
import {BrowserRouter} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";




function App() {

    const {idSess, user, login, logout} = useAuth()
    const isAuthenticated = !!idSess

  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={
        {isAuthenticated, user, login, logout}
    }>
        <div className="App">
            <BrowserRouter>
                {routes}
            </BrowserRouter>
        </div>
    </AuthContext.Provider>
  );
}

export default App;
