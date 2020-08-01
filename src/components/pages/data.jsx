import React from 'react';
import { Box } from '@material-ui/core';
import { NavBar } from '../molecules/';
import { List } from '../organisms';

const CommandsList = () => {
  return (
    <Box height={window.innerHeight} bgcolor="#0D0D0D">
      <NavBar />
      <List />
    </Box>
  );
};

export default CommandsList;
