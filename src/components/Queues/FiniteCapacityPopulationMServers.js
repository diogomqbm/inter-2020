
import * as React from 'react';
import {Box, Grid, Heading, Input, Label, Slider, Text} from 'theme-ui';

function FiniteCapacityPopulationMServers() {
  const [servers, setServers] = React.useState(1);
  const [queue, setQueue] = React.useState(1);
  return (
    <Box p={[2, 2]}>
      <Heading>m-Servidores com Capacidade e População Finitos</Heading>
      <Heading as='h3'>Fila M/M/m/B/K</Heading>
      <Box p={2}>
        <Grid width={[1, 1]} mb={2}>
          <Box>
            <Label htmlFor="requisitions">Requisições</Label>
            <Input type="number" name="requisitions"/>
          </Box>
          <Box>
            <Label htmlFor="processing">Processamento</Label>
            <Input type="number" name="processing"/>
          </Box>
        </Grid>
        <Label>Tamanho da Fila</Label>
        <Text p={2} sx={{ fontSize: 4}}>{queue}</Text>
        <Slider value={queue} onChange={(e) => setQueue(e.target.value)} step={1}/>
        <Label>Servidores</Label>
        <Text p={2} sx={{ fontSize: 4}}>{servers}</Text>
        <Slider value={servers} onChange={(e) => setServers(e.target.value)} step={1}/>
      </Box>
    </Box>
  )
}

export default FiniteCapacityPopulationMServers;
