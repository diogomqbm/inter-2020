import * as React from 'react';
import {Box, Button, Flex, Input, Label} from 'theme-ui';

function Login() {
  return (
    <Flex sx={{
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh'
    }}>
      <Box as="form">
        <Label htmlFor='username'>Username</Label>
        <Input
          name="username" 
          id="username"
          mb={3}
        />
        <Label htmlFor='password'>Password</Label>
        <Input
          name="password" 
          id="password"
          type="password"
          mb={3}
        />
        <Button>
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default Login;
