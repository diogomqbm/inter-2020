import * as React from 'react';
import { Box, Card, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';

function factorial(number) {
  var result = 1;

  for (var i = number; i > 0; i--) {
    result *= i;

  }
  return result;
}

function noRequisitions(trafficIntensity, servers) {

  var result = Math.pow(servers * trafficIntensity, servers) / (factorial(servers) * (1 - trafficIntensity));


  for (var n = 0; n < servers; n++) {
    result += Math.pow(servers * trafficIntensity, n) / factorial(n);

  }
  return 1 / result;
}

function cErlang(servers, trafficIntensity) {
  const result = Math.pow(servers * trafficIntensity, servers) / (factorial(servers) * (1 - trafficIntensity));

  return result * noRequisitions(trafficIntensity, servers);
}

function nRequisitions(users, trafficIntensity, servers) {

  if (users <= servers) {
    return (Math.pow(servers * trafficIntensity, users) / factorial(users)) * noRequisitions(trafficIntensity, servers);

  } else {
    return ((Math.pow(trafficIntensity, users) * Math.pow(servers, servers))
      / factorial(servers)) * noRequisitions(trafficIntensity, servers);

  }
}

function waitingRequests(trafficIntensity, servers) {
  return (trafficIntensity * cErlang(servers, trafficIntensity)) / (1 - trafficIntensity);
}

function serviceRequests(trafficIntensity, servers) {
  return servers * trafficIntensity;
}

function numberOfRequests(trafficIntensity, servers) {
  return servers * trafficIntensity + waitingRequests(trafficIntensity, servers);
}

function avgTime(servers, trafficIntensity, processing) {
  const result = cErlang(servers, trafficIntensity) / (servers * (1 - trafficIntensity));
  return (1 + result) * (1 / processing)
}

function avgWaitingTime(trafficIntensity, servers, processing) {
  return cErlang(servers, trafficIntensity) / (servers * processing * (1 - trafficIntensity));
}

function MServers() {
  const [servers, setServers] = React.useState(1);
  const [requisitions, setRequisitions] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [processing, setProcessing] = React.useState(0);

  function trafficIntensity(requisitions, processing, servidor) {
    const result = requisitions / (processing * servidor);

    if (result < 0.0) {
      return 0.0;
    } else if (result > 1.0) {
      return 1.0;
    }

    return result;

  }

  const trafficIntensityNumber = trafficIntensity(requisitions, processing, servers);

  return (
    <Box p={[2, 2]}>
      <Heading>M Servidores</Heading>
      <Heading as='h3'>Fila M/M/m</Heading>
      <Box p={2}>
        <Grid width={[1, 1]} mb={2}>
          <Box>
            <Label htmlFor="requisitions">Requisições</Label>
            <Input
              type="number"
              name="requisitions"
              min="0"
              value={requisitions}
              onChange={e => setRequisitions(e.target.value)}
            />
          </Box>
          <Box>
            <Label htmlFor="processing">Processamento</Label>
            <Input
              type="number"
              name="processing"
              value={processing}
              onChange={e => setProcessing(e.target.value)}
            />
          </Box>
          <Box>
            <Label htmlFor="users">Usuários</Label>
            <Input
              type="number"
              name="users"
              min="0"
              value={users}
              onChange={e => setUsers(e.target.value)}
            />
          </Box>
        </Grid>
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
        <Heading as="h3">{(100 * trafficIntensity(requisitions, processing, servers)).toFixed(2)}%</Heading>
        <Heading>Probabilidade de não existir requisição</Heading>
        <Heading as="h3">{(100 * noRequisitions(trafficIntensity(requisitions, processing, servers), servers)).toFixed(2)}%</Heading>
        <Heading>Probabilidade de n requisições no sistema</Heading>
        <Heading as="h3">{(100 * nRequisitions(users, trafficIntensity(requisitions, processing, servers), servers)).toFixed(2)}%</Heading>
        <Heading>C de Erlang</Heading>
        <Heading as="h3">{cErlang(servers, trafficIntensity(requisitions, processing, servers)).toFixed(2)}</Heading>
        <Heading>Número médio de Requisições em espera</Heading>
        <Heading as="h3">{waitingRequests(trafficIntensity(requisitions, processing, servers), servers).toFixed(2)}</Heading>
        <Heading>Requisições em atendimento</Heading>
        <Heading as="h3">{serviceRequests(trafficIntensity(requisitions, processing, servers), servers).toFixed(2)}</Heading>
        <Heading>Número de requisições</Heading>
        <Heading as="h3">{numberOfRequests(trafficIntensityNumber, servers).toFixed(2)}</Heading>
        <Heading>Utilização</Heading>
        <Heading as="h3">{trafficIntensityNumber.toFixed(2)}</Heading>
        <Heading>Tempo médio de resposta</Heading>
        <Heading as="h3">{avgTime(servers, trafficIntensityNumber, processing).toFixed(2)}</Heading>
        <Heading>Tempo médio de espera na fila</Heading>
        <Heading as="h3">{avgWaitingTime(trafficIntensityNumber, servers, processing).toFixed(2)}</Heading>
      </Card>
    </Box>
  )
}

export default MServers;
