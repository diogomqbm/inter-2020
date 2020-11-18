import * as React from 'react';
import {Box, Grid, Heading, Input, Label, Slider, Text} from 'theme-ui';

function FinitePopulationIServers() {
  const [servers, setServers] = React.useState(1);
  return (
    <Box p={[2, 2]}>
      <Heading>População Finita com infinitos servidor</Heading>
      <Heading as='h3'>Fila M/M/(infinitos)//K</Heading>
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
        <Label>População</Label>
        <Text p={2} sx={{ fontSize: 4}}>{servers}</Text>
        <Slider value={servers} onChange={(e) => setServers(e.target.value)} step={1}/>
      </Box>
    </Box>
  )
}

export default FinitePopulationIServers;
