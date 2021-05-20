import { Switch, Route } from 'react-router-dom';

//components
import Login from './components/Login/Login'
import SingUp from './components/Login/SingUp'
import Inicio from './components/Inicio'

const Main = () => {

    return ( 
        <Switch>
         {/*  <Route exact path="/" component={Inicio} /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/singUp" component={SingUp} /> 
          <Route exact path="/" component={Inicio} />                  
        </Switch>
     );
}
 
export default Main;