import * as React from 'react';
import { Box, Grid, Heading, Input, Label, Slider, Text } from 'theme-ui';

function FinitePopulationIServers() {
  const [processing, setProcessing] = React.useState(0);
  const [requisitions, setRequisitions] = React.useState(0);
  const [servers, setServers] = React.useState(1);
  const [user, setUser] = React.useState(0);

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
        <Label>População</Label>
        <Text p={2} sx={{ fontSize: 4 }}>{servers}</Text>
        <Slider value={servers} onChange={(e) => setServers(e.target.value)} step={1} />
      </Box>
    </Box>
  )
}

export default FinitePopulationIServers;
