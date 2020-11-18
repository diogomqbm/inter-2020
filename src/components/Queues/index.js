import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label } from 'theme-ui';

function getTrafficIntensity(requisitions, processing) {
  const result = requisitions / processing;
  if (result < 0.0) {
    return 0.0;
  }
  else if (result > 1.0) {
    return 1.0;
  }

  return result;
}

function Queues() {
  const [requisitions, setRequisitions] = React.useState(0);
  const [processing, setProcessing] = React.useState(0);
  const [trafficIntensity, setTrafficIntensity] = React.useState(0);
  const [users, setUsers] = React.useState(0);

  React.useEffect(() => {
    if (requisitions > 0 && processing > 0) {
      setTrafficIntensity(getTrafficIntensity(requisitions, processing));
    }
  }, [requisitions, processing, setTrafficIntensity, trafficIntensity]);

  return (
    <Box p={[2, 2]}>
      <Heading>O Sistema Clássico</Heading>
      <Heading as='h3'>Fila M/M/1</Heading>
      <Box p={2}>
        <Grid width={[1, 1]} mb={2}>
          <Box>
            <Label htmlFor="requisitions">Requisições</Label>
            <Input value={requisitions} type="number" min="0" name="requisitions" onChange={e => setRequisitions(e.target.value)} />
          </Box>
          <Box>
            <Label htmlFor="processing">Processamento</Label>
            <Input value={processing} type="number" min="0" name="processing" onChange={e => setProcessing(e.target.value)} />
          </Box>
          <Box>
            <Label htmlFor="users">Usuários</Label>
            <Input value={users} type="number" min="0" name="users" onChange={e => setUsers(e.target.value)} />
          </Box>
        </Grid>
      </Box>

      <Card sx={{
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px #ccc',
      }}>
        <Heading>Intensidade de tráfego</Heading>
        <Heading as="h3">{(100 * trafficIntensity).toFixed(2)}%</Heading>
        <Heading>Probabilidade de não ter nenhum usuário</Heading>
        <Heading as="h3">{(100 * (1 - trafficIntensity)).toFixed(2)}%</Heading>
        <Heading>Probabilidade de 1 ou mais usuários no sistema</Heading>
        <Heading as="h3">{100 * trafficIntensity.toFixed(2)}%</Heading>
        {users > 0 && (
          <>
            <Heading>Probabilidade de n usuários no sistema</Heading>
            <Heading as="h3">{(Math.pow(trafficIntensity, users) * (100 * (1 - trafficIntensity))).toFixed(2)}%</Heading>
            <Heading>Probabilidade de n ou mais usuários no sistema</Heading>
            <Heading as="h3">{100 * nMoreUser(trafficIntensity, users).toFixed(2)}%</Heading>
          </>
        )}
        <Heading>Tempo médio</Heading>
        <Heading as="h3">{avgTime(processing, trafficIntensity).toFixed(2)}</Heading>
        <Heading>Quantidade média de usuários</Heading>
        <Heading as="h3">{avgUser(trafficIntensity).toFixed(2)}</Heading>
        <Heading>Quantidade média de requisições</Heading>
        <Heading as="h3">{avgRequisition(trafficIntensity).toFixed(2)}</Heading>
      </Card>
    </Box>
  )
}

function nMoreUser(trafficIntensity, users) {
  return Math.pow(trafficIntensity, users);
}

function avgTime(processing, trafficIntensity) {
  return 1 / (processing * (1 - trafficIntensity));
}

function avgUser(trafficIntensity) {
  return trafficIntensity / (1 - trafficIntensity);
}

function avgRequisition(trafficIntensity) {
  return Math.pow(trafficIntensity, 2) / (1 - trafficIntensity);
}


export default Queues;
