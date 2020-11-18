import Queues from './components/Queues'
import FiniteCapacity from './components/Queues/FiniteCapacity';
import FiniteCapacityMServers from './components/Queues/FiniteCapacityMServers';
import FiniteCapacityPopulationMServers from './components/Queues/FiniteCapacityPopulationMServers';
import FinitePopulationIServers from './components/Queues/FinitePopulationIServers';
import FinitePopulationServer from './components/Queues/FinitePopulationServer';
import IServers from './components/Queues/IServers';
import MServers from './components/Queues/MServers';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';

const routes = [
  {
    path: '/user',
    component: User,
    routes: [
  {
    path: '/user/classic',
    component: Queues
  },
  {
    path: '/user/mservers',
    component: MServers
  },
  {
    path: '/user/iservers',
    component: IServers
  },
  {
    path: '/user/finitepopulationserver',
    component: FinitePopulationServer
  },
  {
    path: '/user/finitepopulationiservers',
    component: FinitePopulationIServers
  },
  {
    path: '/user/finitecapacity',
    component: FiniteCapacity
  },
  {
    path: '/user/finitecapacitymservers',
    component: FiniteCapacityMServers
  },
  {
    path: '/user/finitecapacitypopulationmservers',
    component: FiniteCapacityPopulationMServers
  },
    ]
  },
  {
    path: '/',
    exact: true,
    component: Login
  },
  {
    path: '/signup',
    exact: true,
    component: Signup
  }
]

export default routes;
