import React from 'react';
import { NavBar } from '../molecules/';
import { FloatingButton } from '../atoms/';
import { Close } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { Form } from '../organisms';
import { closeWindow } from '../../utils';

function CreateCommand(props) {
  return (
    <Box height={window.innerHeight} bgcolor="#0D0D0D">
      <NavBar />
      <Box display="flex" mt="48px" alignItems="center" justifyContent="center" width={1}>
        <Form {...props.location.state} />
      </Box>
      <FloatingButton onClick={closeWindow}>
        <Close />
      </FloatingButton>
    </Box>
  );
}

export default CreateCommand;
