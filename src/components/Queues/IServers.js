import * as React from 'react';
import {Box, Grid, Heading, Input, Label} from 'theme-ui';

function IServers() {
  return (
    <Box p={[2, 2]}>
      <Heading>Infinitos Servidores</Heading>
      <Heading as='h3'>Fila M/M/(infinitos)</Heading>
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
      </Box>
    </Box>
  )
}

export default IServers;
