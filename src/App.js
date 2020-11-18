import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map(r => (
          <Route key={r.path} {...r} />
        ))} 
      </Switch>
    </Router>
  );
}

export default App;
