import Notes from '../Notes/Notes';
import { Switch, Route } from 'react-router-dom';
import Greetings from '../Greetings/Greetings';

const App = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/'>
                    <Greetings />
                </Route>

                <Route path='/notes'>
                    <Notes />
                </Route>
            </Switch>
        </div>
    );
};

export default App;
