import React from 'react';
import { Button } from '../atoms';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const List = ({ commands, deleteCommands }) => {
  return (
    <Box color="white" height="560px" maxHeight="560px" overflow="auto">
      {commands.map((command, key) => (
        <Box
          key={key}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          height="56px"
        >
          <Box component="h3" maxWidth="40%" color="#d3d3d3">
            {command.name}
          </Box>
          <Box>
            <Button
              component={Link}
              to={{
                pathname: '/',
                state: {
                  nameToSet: command.name,
                  codeToSet: command.code,
                  uuidToSet: command.uuid,
                },
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                deleteCommands(command.uuid);
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default List;
