import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label } from 'theme-ui';
import { factorial } from './MServers';

function nRequisitions(user, noUser, ro) {
  return (Math.pow(ro, user) / factorial(user)) * (noUser);
}

function avgUsers(requisitions, processing) {
  return requisitions / processing;
}

function avgTime(processing) {
  return 1 / processing;
}

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

function IServers() {
  const [requisitions, setRequisitions] = React.useState(0);
  const [processing, setProcessing] = React.useState(0);
  const [user, setUser] = React.useState(0);
  const [noUser, setNoUser] = React.useState(0);

  const ro = getTrafficIntensity(requisitions, processing);

  return (
    <Box p={[2, 2]}>
      <Heading>Infinitos Servidores</Heading>
      <Heading as='h3'>Fila M/M/(infinitos)</Heading>
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
          <Box>
            <Label htmlFor="nouser">Probabilidade de 0 usuários</Label>
            <Input
              type="number"
              name="nouser"
              min="0"
              value={noUser}
              onChange={e => setNoUser(e.target.value)}
            />
          </Box>
          <Box>
            <Label htmlFor="user">Quantidade de usuários</Label>
            <Input
              type="number"
              min="0"
              name="user"
              value={user}
              onChange={e => setUser(e.target.value)}
            />
          </Box>
        </Grid>
      </Box>
      <Card sx={{
        borderRadius: '8px',
        padding: '10px',
        border: '1px solid #ccc',
        boxShadow: '0 0 10px #ccc',
      }}>
        <Heading>Ro</Heading>
        <Heading as="h3">{(100 * ro).toFixed(2)}%</Heading>
        <Heading>Número médio de usuários</Heading>
        <Heading as="h3">{avgUsers(requisitions, processing).toFixed(2)}</Heading>
        <Heading>Tempo médio</Heading>
        <Heading as="h3">{avgTime(processing).toFixed(2)}</Heading>
        {user > 0 && noUser > 0 && (
          <>
            <Heading>Probabilidade de ter n usuários</Heading>
            <Heading as="h3">{(100 * (nRequisitions(user, noUser, ro))).toFixed(2)}</Heading>
          </>
        )}
      </Card>
    </Box >
  )
}

export default IServers;
