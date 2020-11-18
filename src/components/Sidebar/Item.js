import * as React from 'react';
import {NavLink} from 'theme-ui';

function isUrlMatching(location) {
  return window.location.pathname === location; 
}

function Item(props) {
  const { children, href } = props;
  return (
    <NavLink 
      href={href} 
      p={2}
      mt={3}
      backgroundColor={isUrlMatching(href) ? 'primary' : 'white'}
      color={isUrlMatching(href) ? 'white': 'text'}
      sx={{
        borderRadius: '8px',
        boxShadow: '0 0 10px #ccc',
        transition: 'transform 0.3s',
        width: '350px',
          '&:hover': {
            color: isUrlMatching(href) ? 'white' : 'text',
            transform: 'translateY(4px)'
          },
        }}
      >
        {children}
      </NavLink>
  )
}

export default Item;
