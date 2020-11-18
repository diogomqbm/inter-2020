import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Box, Grid, Text} from 'theme-ui';
import Sidebar from './components/Sidebar';
import routes from './routes';

function App() {
  return (
    <Box>
      <Text as="h1" p={5}>Análise de desempenho</Text>
      <Grid width={[ null, 150 ]} pl={3} pr={5}>
        <Router>
          <Sidebar />
          <Switch>
            {routes.map(r => (
              <Route key={r.path} {...r} />
            ))} 
          </Switch>
        </Router>
      </Grid>
    </Box>
  );
}

export default App;
