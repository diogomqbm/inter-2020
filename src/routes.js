import Queues from './components/Queues'
import FiniteCapacity from './components/Queues/FiniteCapacity';
import FiniteCapacityMServers from './components/Queues/FiniteCapacityMServers';
import FiniteCapacityPopulationMServers from './components/Queues/FiniteCapacityPopulationMServers';
import FinitePopulationIServers from './components/Queues/FinitePopulationIServers';
import FinitePopulationServer from './components/Queues/FinitePopulationServer';
import IServers from './components/Queues/IServers';
import MServers from './components/Queues/MServers';

const routes = [
  {
    path: '/',
    exact: true,
    component: Queues
  },
  {
    path: '/mservers',
    component: MServers
  },
  {
    path: '/iservers',
    component: IServers
  },
  {
    path: '/finitepopulationserver',
    component: FinitePopulationServer
  },
  {
    path: '/finitepopulationiservers',
    component: FinitePopulationIServers
  },
  {
    path: '/finitecapacity',
    component: FiniteCapacity
  },
  {
    path: '/finitecapacitymservers',
    component: FiniteCapacityMServers
  },
  {
    path: '/finitecapacitypopulationmservers',
    component: FiniteCapacityPopulationMServers
  }
]

export default routes;
