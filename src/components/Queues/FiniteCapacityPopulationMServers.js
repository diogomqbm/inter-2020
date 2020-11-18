import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';
import { factorial } from './MServers';

function trafficIntensity(requisitions, processing, servers) {
  var result = requisitions / (processing * servers);

  if (result < 0)
    return 0.0;
  else if (result > 1)
    return 1;

  return result;
}

function nRequisitions(user, population, servers, trafficIntensity, noRequisitions) {

  if (population <= servers - 1) {
    return (population / user) * trafficIntensity * noRequisitions;
  }
  else {
    var result = factorial(user) / (factorial(servers) * Math.pow(servers, user - servers));

    return result * (population / user) * trafficIntensity * noRequisitions;
  }
}

function utilization(noRequisitions) {
  return 1 - noRequisitions;
}

function avgUsers(servers, population, trafficIntensity, noRequisitions) {
  var result = 0;
  for (var i = 1; i <= servers; i++) {
    result += i * nRequisitions(i, population, servers, trafficIntensity, noRequisitions);
  }
  return result;
}

function receivingRate(requisitions, population, avgUsers) {
  return requisitions * (population - avgUsers);
}

function avgUsersQueue(avgUsers, rr) {
  return avgUsers / rr;
}

function avgResponseTime(requisitions, population, rowB, avgUsers, nRequisitions) {
  return avgUsers / requisitions * (population - avgUsers - (population - rowB) * nRequisitions);
}


function FiniteCapacityPopulationMServers() {
  const [processing, setProcessing] = React.useState(0);
  const [requisitions, setRequisitions] = React.useState(0);
  const [servers, setServers] = React.useState(1);
  const [queue, setQueue] = React.useState(1);
  const [population, setPopulation] = React.useState(1);
  const [user, setUser] = React.useState(0);
  const [noUser, setNoUser] = React.useState(0);

  const ro = trafficIntensity(requisitions, processing, servers);
  const nReq = nRequisitions(user, population, servers, ro, noUser);
  const utils = utilization(noUser);
  const usersAvg = avgUsers(servers, population, ro, noUser);
  const rr = receivingRate(requisitions, population, usersAvg);
  const avgUsersQ = avgUsersQueue(usersAvg, rr);
  const responseTime = avgResponseTime(requisitions, population, queue, usersAvg, nReq);

  return (
    <Box p={[2, 2]}>
      <Heading>m-Servidores com Capacidade e População Finitos</Heading>
      <Heading as='h3'>Fila M/M/m/B/K</Heading>
      <Box p={2}>
        <Grid width={[1, 1]} mb={2}>
          <Box>
            <Label htmlFor="requisitions">Requisições</Label>
            <Input
              value={requisitions}
              onChange={e => setRequisitions(e.target.value)}
              type="number"
              min="0"
              name="requisitions"
            />
          </Box>
          <Box>
            <Label htmlFor="processing">Processamento</Label>
            <Input
              type="number"
              name="processing"
              min="0"
              value={processing}
              onChange={e => setProcessing(e.target.value)}
            />
          </Box>
        </Grid>
        <Grid width={[1, 1]} mb={2}>
          <Box mb={3}>
            <Label htmlFor="user">Usuários</Label>
            <Input
              value={user}
              onChange={e => setUser(e.target.value)}
              type="number"
              min="0"
              name="user"
            />
          </Box>
          <Box mb={3}>
            <Label htmlFor="nouser">Probabilidade de 0 usuários</Label>
            <Input
              value={noUser}
              onChange={e => setNoUser(e.target.value)}
              type="number"
              min="0"
              name="nouser"
            />
          </Box>
        </Grid>
        <Label>Tamanho da Fila</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{queue}</Text>
        <Slider value={queue} onChange={(e) => setQueue(e.target.value)} step={1} />
        <Label>Servidores</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{servers}</Text>
        <Slider value={servers} onChange={(e) => setServers(e.target.value)} step={1} />
        <Label>População</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{population}</Text>
        <Slider value={population} onChange={(e) => setPopulation(e.target.value)} step={1} />
      </Box>
      <Card sx={{
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px #ccc',
      }}>
        <Heading>Ro</Heading>
        <Heading>{(100 * ro).toFixed(2)}%</Heading>
        <Heading>Probabilidade de n usuários no sistema</Heading>
        <Heading>{(100 * nReq).toFixed(2)}%</Heading>
        <Heading>Utilização</Heading>
        <Heading>{utils.toFixed(2)}</Heading>
        <Heading>Taxa de recebimento</Heading>
        <Heading>{rr.toFixed(2)}</Heading>
        <Heading>Qtd média de usuários no sistema</Heading>
        <Heading>{usersAvg.toFixed(2)}</Heading>
        <Heading>Qtd média de usuários na fila</Heading>
        <Heading>{avgUsersQ.toFixed(2)}</Heading>
        <Heading>Tempo médio de resposta</Heading>
        <Heading>{responseTime.toFixed(2)}</Heading>
      </Card>
    </Box>
  )
}

export default FiniteCapacityPopulationMServers;
