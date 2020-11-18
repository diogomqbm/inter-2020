import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';
import { getTrafficIntensity } from './IServers';
import { factorial } from './MServers';


function noRequisitions(population, requisitions, processing) {

  var result = 0;
  for (var n = 0; n <= population; n++) {

    result += Math.pow(requisitions / processing, n) *
      (factorial(population) / factorial(population - n));
  }
  return 1.0 / result;
}

function nRequisitions(user, population, requisitions, processing, noRequisitions) {
  if (user <= population) {
    return Math.pow(requisitions / processing, user) *
      (factorial(population) / factorial(population - user)) *
      noRequisitions;
  } else {
    return 0.0;
  }
}

function utilization(trafficIntensity, population, avgUsers) {
  return trafficIntensity * (population - avgUsers);
}

function avgUsersQueue(population, requisitions, processing, noRequisitions) {
  return population - ((requisitions - processing) / requisitions) *
    (1 - noRequisitions);
}

function avgUsers(avgUsersQueue, noRequisitions) {
  return avgUsersQueue + (1 - noRequisitions);
}

function avgWaitingTime(requisitions, population, avgUsersQueue, avgUsers) {
  return avgUsersQueue / (requisitions * (population - avgUsers));
}

function avgResponseTime(processing, avgWaitingTime) {
  return avgWaitingTime + 1.0 / processing;
}

function receivingRate(processing, noRequisitions) {
  return processing * (1 - noRequisitions);
}

function FinitePopulationServer() {
  const [population, setPopulation] = React.useState(1);
  const [requisitions, setRequisitions] = React.useState(0);
  const [processing, setProcessing] = React.useState(0);
  const [user, setUser] = React.useState(0);

  const ro = getTrafficIntensity(requisitions, processing);
  const noReq = noRequisitions(population, requisitions, processing);
  const avgUsersQ = avgUsersQueue(population, requisitions, processing, noReq);
  const usersAvg = avgUsers(avgUsersQ, noReq);
  const waitingTime = avgWaitingTime(requisitions, population, avgUsersQ, usersAvg);

  return (
    <Box p={[2, 2]}>
      <Heading>População Finita com um servidor</Heading>
      <Heading as='h3'>Fila M/M/1//K</Heading>
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
        <Heading as="h3">{(100 * ro).toFixed(2)}%</Heading>
        <Heading>Probabilidade de nenhum usuário</Heading>
        <Heading as="h3">{(100 * noReq).toFixed(2)}%</Heading>
        <Heading>Probabilidade de n usuários</Heading>
        <Heading as="h3">{(100 * nRequisitions(user, population, requisitions, processing, noReq)).toFixed(2)}%</Heading>
        <Heading>Utilização</Heading>
        <Heading as="h3">{(utilization(ro, population, usersAvg)).toFixed(2)}%</Heading>
        <Heading>Qtd média de usuários na fila</Heading>
        <Heading as="h3">{(avgUsersQ).toFixed(2)}%</Heading>
        <Heading>Qtd média de usuários no sistema</Heading>
        <Heading as="h3">{(usersAvg).toFixed(2)}%</Heading>
        <Heading>Tempo média de espera</Heading>
        <Heading as="h3">{(waitingTime).toFixed(2)}%</Heading>
        <Heading>Tempo média de resposta</Heading>
        <Heading as="h3">{(avgResponseTime(processing, waitingTime)).toFixed(2)}%</Heading>
        <Heading>Taxa de recebimento</Heading>
        <Heading as="h3">{(receivingRate(processing, noReq)).toFixed(2)}%</Heading>
      </Card>
    </Box>
  )
}

export default FinitePopulationServer;
