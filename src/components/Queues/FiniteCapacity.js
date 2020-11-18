import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';
import { getTrafficIntensity } from './IServers';

function noRequisitions(trafficIntensity, rowB) {
  return (1 - trafficIntensity) / (1 - Math.pow(trafficIntensity, rowB + 1));
}

function NRequisitions(user, rowB, noRequisitions, ro) {

  if (user <= rowB) {
    return noRequisitions * Math.pow(ro, user);
  }
  else
    return 0.0;

}

function utilization(trafficIntensity, NRequisitions) {
  return trafficIntensity * (1 - NRequisitions);
}

function receivingRate(processing, NRequisitions) {
  return processing * (1 - NRequisitions);
}

function lossRate(processing, NRequistions) {
  return processing * NRequistions;
}

function avgUsers(trafficIntensity, rowB) {
  var result = (rowB + 1) * Math.pow(trafficIntensity, rowB + 1);

  return (trafficIntensity / (1 - trafficIntensity)) - (result / (1 - Math.pow(trafficIntensity, rowB + 1)));
}

function avgUsersQueue(trafficIntensity, rowB) {
  var result = 1 + rowB * Math.pow(trafficIntensity, rowB);

  return (trafficIntensity / (1 - trafficIntensity)) - trafficIntensity * (result / (1 - Math.pow(trafficIntensity, rowB + 1)));
}

function avgResponseTime(processing, avgUsers, NRequisitions) {
  return avgUsers / (processing * (1 - NRequisitions));
}

function avgWaitingTime(processing, NRequisitions, avgUsersQueue) {
  return avgUsersQueue / (processing * (1 - NRequisitions));
}

function FiniteCapacity() {
  const [processing, setProcessing] = React.useState(0);
  const [requisitions, setRequisitions] = React.useState(0);
  const [user, setUser] = React.useState(0);
  const [rowB, setRowB] = React.useState(1);

  const ro = getTrafficIntensity(requisitions, processing);
  const noReq = noRequisitions(ro, rowB);
  const nReq = NRequisitions(user, rowB, noReq, ro);
  const utils = utilization(ro, nReq);
  const rr = receivingRate(processing, nReq);
  const lr = lossRate(processing, nReq);
  const usersAvg = avgUsers(ro, rowB);
  const avgUsersQ = avgUsersQueue(ro, rowB);
  const responseTime = avgResponseTime(processing, usersAvg, nReq);
  const waitingTime = avgWaitingTime(processing, nReq, avgUsersQ);

  return (
    <Box p={[2, 2]}>
      <Heading>Capacidade Finita</Heading>
      <Heading as='h3'>Fila M/M/1/B</Heading>
      <Box p={2} pl={0}>
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
        <Text p={2} sx={{ fontSize: 4 }}>{rowB}</Text>
        <Slider value={rowB} onChange={(e) => setRowB(e.target.value)} step={1} />
      </Box>
      <Card sx={{
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px #ccc',
      }}>
        <Heading>Ro</Heading>
        <Heading>{(100 * ro).toFixed(2)}%</Heading>
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

export default FiniteCapacity;
