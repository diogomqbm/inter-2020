import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';
import { factorial } from './MServers';

function ro(requisitions, processing, servers) {
  const result = requisitions / (processing * servers);

  if (result < 0)
    return 0.0;
  else if (result > 1)
    return 1;

  return result;
}

function noRequisitions(trafficIntensity, rowB, servers) {

  var result = (1 - Math.pow(trafficIntensity, rowB - servers + 1))
    * (Math.pow(servers * trafficIntensity, servers));

  result = 1 + result / (factorial(servers) * (1 - trafficIntensity));


  for (var i = 1; i < servers; i++) {
    result += Math.pow(servers * trafficIntensity, i) / factorial(i);
  }

  return 1 / result;
}

function nRequisitions(user, servers, requisitions, processing, noRequisitions) {
  if (user < servers) {
    return Math.pow(requisitions / processing, user)
      * (1.0 / factorial(user)
        * noRequisitions);

  } else {
    return (Math.pow(servers, servers) / factorial(servers))
      * Math.pow(requisitions / processing, user)
      * noRequisitions;
  }
}

function utilization(trafficIntensity, nRequisitions) {
  return trafficIntensity * (1 - nRequisitions);
}

function receivingRate(requisitions, nRequisitions) {
  return requisitions * (1 - nRequisitions);
}

function lossRate(requisitions, nRequisitions) {
  return requisitions * nRequisitions;
}

function avgUsers(rowB, nRequisitions) {
  var result = 0;

  for (var i = 1; i <= rowB; i++) {
    result += i * nRequisitions;
  }
  return result;
}

function avgUsersQueue(servers, nRequisitions, rowB) {
  var result = 0;

  for (var i = servers + 1; i <= rowB; i++) {
    result += (i - servers) * nRequisitions;
  }
  return result;
}

function avgResponseTime(requisitions, avgUsers, nRequisitions) {
  return avgUsers / (requisitions * (1 - nRequisitions));
}

function avgWaitingTime(requisitions, avgUsersQueue, nRequisitions) {
  return avgUsersQueue / (requisitions * (1 - nRequisitions));
}

function FiniteCapacityMServers() {
  const [processing, setProcessing] = React.useState(0);
  const [requisitions, setRequisitions] = React.useState(0);
  const [servers, setServers] = React.useState(1);
  const [queue, setQueue] = React.useState(1);
  const [user, setUser] = React.useState(0);

  const trafficIntensity = ro(requisitions, processing, servers);
  const noReq = noRequisitions(trafficIntensity, queue, servers);
  const nReq = nRequisitions(user, servers, requisitions, processing, noReq);
  const utils = utilization(trafficIntensity, nReq);
  const rr = receivingRate(requisitions, nReq);
  const lr = lossRate(requisitions, nReq);
  const usersAvg = avgUsers(queue, nReq);
  const avgUsersQ = avgUsersQueue(servers, nReq, queue);
  const responseTime = avgResponseTime(requisitions, usersAvg, nReq);
  const waitingTime = avgWaitingTime(requisitions, avgUsersQ, nReq);

  return (
    <Box p={[2, 2]}>
      <Heading>m-Servidores com Capacidade Finita</Heading>
      <Heading as='h3'>Fila M/M/m/B</Heading>
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
        <Label>Tamanho da Fila</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{queue}</Text>
        <Slider value={queue} onChange={(e) => setQueue(e.target.value)} step={1} />
        <Label>Servidores</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{servers}</Text>
        <Slider value={servers} onChange={(e) => setServers(e.target.value)} step={1} />
      </Box>
      <Card sx={{
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px #ccc',
      }}>
        <Heading>Ro</Heading>
        <Heading>{(100 * trafficIntensity).toFixed(2)}%</Heading>
        <Heading>Probabilidade de nenhum usuário no sistema</Heading>
        <Heading>{(100 * noReq).toFixed(2)}%</Heading>
        <Heading>Probabilidade de n usuários no sistema</Heading>
        <Heading>{(100 * nReq).toFixed(2)}%</Heading>
        <Heading>Utilização</Heading>
        <Heading>{utils.toFixed(2)}</Heading>
        <Heading>Taxa de recebimento</Heading>
        <Heading>{rr.toFixed(2)}</Heading>
        <Heading>Taxa de Perda</Heading>
        <Heading>{lr.toFixed(2)}</Heading>
        <Heading>Qtd média de usuários no sistema</Heading>
        <Heading>{usersAvg.toFixed(2)}</Heading>
        <Heading>Qtd média de usuários na fila</Heading>
        <Heading>{avgUsersQ.toFixed(2)}</Heading>
        <Heading>Tempo médio de resposta</Heading>
        <Heading>{responseTime.toFixed(2)}</Heading>
        <Heading>Tempo médio de espera</Heading>
        <Heading>{waitingTime.toFixed(2)}</Heading>
      </Card>
    </Box>
  )
}

export default FiniteCapacityMServers;
