import * as React from 'react';
import { Flex, NavLink } from 'theme-ui';
import Item from './Item';

function isUrlMatching(location) {
  return window.location.pathname === location; 
}

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
        href="/finitecapacitymservers" 
      >
        m-Servidores com Capacidade Finita
      </Item>
      <Item 
        href="/finitecapacitypopulationmservers" 
      >
        m-Servidores com Capacidade e População Finitos
      </Item>
      <Item 
        href="/finitecapacity" 
      >
        Capacidade Finita
      </Item>
      <Item href="/finitepopulationiservers">
        População Finita com Infinitos Servidores
      </Item>
      <Item href="/finitepopulationserver">
        População Finita com um Servidor
      </Item>
      <Item href="/iservers">
        Infinitos Servidores
      </Item>
      <Item href="/mservers">
        m-Servidores
      </Item>
      <Item href="/">
        O Sistema Clássico
      </Item>
    </Flex>
  ); 
}

export default Sidebar;
