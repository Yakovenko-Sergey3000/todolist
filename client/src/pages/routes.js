import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./login";
import Registration from "./registration";
import TodoList from "./todo-list";



export  const useRoutes = isAuthenticated => {


    if(isAuthenticated) {
        return(
            <Switch>

                <Route path='/app'>
                    { <TodoList/>}
                </Route>
                <Redirect to="/app"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/login'>
                <Login />
            </Route>
            <Route path='/registration'>
                <Registration/>
            </Route>
            <Redirect to="/login"/>
        </Switch>
    )
}