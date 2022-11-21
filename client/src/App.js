import './App.css';

import Landing from './components/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';

import { Route } from 'react-router-dom';
import Edit from './components/Edit/Edit';

function App() {
  return (
    <div className="App">

      <Route exact path="/">
        <Landing />
      </Route>

      <Route exact path="/pokemons">
        <Home />
      </Route>

      <Route exact path="/pokemons/:id" component={Detail}>
      </Route>

      <Route exact path="/form" component={Form}>
      </Route>

      <Route exact path="/pokemons/edit/:id" component={Edit}>
      </Route>

    </div>
  );
}

export default App;
