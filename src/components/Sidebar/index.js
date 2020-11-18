import * as React from 'react';
import { Flex } from 'theme-ui';
import Item from './Item';

function Sidebar() {
  return (
    <Flex 
      as='nav' 
      sx={{
        alignItems: 'flex-start', 
        flexDirection: 'column',
        padding: '20px'
      }}
    >
      <Item 
        href="/user/finitecapacitymservers" 
      >
        m-Servidores com Capacidade Finita
      </Item>
      <Item 
        href="/user/finitecapacitypopulationmservers" 
      >
        m-Servidores com Capacidade e População Finitos
      </Item>
      <Item 
        href="/user/finitecapacity" 
      >
        Capacidade Finita
      </Item>
      <Item href="/user/finitepopulationiservers">
        População Finita com Infinitos Servidores
      </Item>
      <Item href="/user/finitepopulationserver">
        População Finita com um Servidor
      </Item>
      <Item href="/user/iservers">
        Infinitos Servidores
      </Item>
      <Item href="/user/mservers">
        m-Servidores
      </Item>
      <Item href="/user/classic">
        O Sistema Clássico
      </Item>
    </Flex>
  ); 
}

export default Sidebar;
