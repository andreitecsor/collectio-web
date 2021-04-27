import {Route, Switch} from 'react-router-dom';
import Header from "./components/header/header.component";
import AuthPage from "./pages/authpage/authpage.component";

import './App.css';

function App() {
    return (
        <div>
            {/*<Header/>*/}
            <Switch>
                <Route exact path='/' component={AuthPage}/>
                {/*<Route exact path='/auth' component={AuthPage}/>*/}
            </Switch>
        </div>
    );
}

export default App;
