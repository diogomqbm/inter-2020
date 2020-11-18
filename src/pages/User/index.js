import * as React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import {Box, Grid, Text} from 'theme-ui';
import Sidebar from '../../components/Sidebar';
import routes from '../../routes';

function getUserRoutes() {
  return routes.find(r => r.path === '/user').routes;
}

function User() {
  return ( 
    <Box>
      <Text as="h1" p={5}>Análise de desempenho</Text>
      <Grid width={[ null, 150 ]} pl={3} pr={5}>
        <Sidebar />
        <Router>
          <Switch>
            {getUserRoutes().map(r => (
              <Route key={r.path} {...r} />
            ))} 
          </Switch>
        </Router>
      </Grid>
    </Box>
  );
};

export default User;
