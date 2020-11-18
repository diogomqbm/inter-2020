import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';

function nRequisitions(user, population, requisitions, processing) {
  if (user <= population) {
    return (Math.pow((requisitions / processing), user) *
      (population / user)) /
      Math.pow(1.0 + (requisitions / processing), population);
  }
  else {
    return 0.0;
  }
}

function noRequisitions(requisitions, processing, population) {

  var result = 1.0 + (requisitions / processing);
  return 1.0 / (Math.pow(result, population));
}

function ro(population, requisitions, processing) {
  var result = (population * requisitions) / (1 + requisitions / processing);

  if (result >= 1.0) {
    return 1.0;
  } else if (result <= 0.0) {
    return 0.0;
  }
  return result;
}

function avgUser(population, requisitions, processing) {
  var result = (population * (requisitions / processing));

  return result / (1.0 + requisitions / processing);
}


function FinitePopulationIServers() {
  const [processing, setProcessing] = React.useState(0);
  const [requisitions, setRequisitions] = React.useState(0);
  const [population, setPopulation] = React.useState(1);
  const [user, setUser] = React.useState(0);

  const trafficIntensity = ro(population, requisitions, processing);
  const noReq = noRequisitions(requisitions, processing, population);
  const nReq = nRequisitions(user, population, requisitions, processing);
  const userAvg = avgUser(population, requisitions, processing);

  return (
    <Box p={[2, 2]}>
      <Heading>População Finita com infinitos servidor</Heading>
      <Heading as='h3'>Fila M/M/(infinitos)//K</Heading>
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
        <Heading as="h3">{(100 * trafficIntensity).toFixed(2)}%</Heading>
        <Heading>Probabilidade de nenhum usuário no sistema</Heading>
        <Heading as="h3">{(100 * noReq).toFixed(2)}%</Heading>
        <Heading>Probabilidade de n usuários no sistema</Heading>
        <Heading as="h3">{(100 * nReq).toFixed(2)}%</Heading>
        <Heading>Qtd média de usuários no sistema</Heading>
        <Heading as="h3">{userAvg.toFixed(2)}%</Heading>
      </Card>
    </Box>
  )
}

export default FinitePopulationIServers;
