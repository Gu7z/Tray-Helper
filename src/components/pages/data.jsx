import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { NavBar } from '../molecules/';
import { List } from '../organisms';
import { Button } from '../atoms';
import { getCommands } from '../../utils';

const CommandsList = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const commands = getCommands();
    const filteredCommands = commands.map((command) => ({
      name: command.name,
      code: command.code,
    }));
    const commandsToCopy = JSON.stringify(filteredCommands);

    setCommands(commandsToCopy);
  }, []);

  const copyToClipboard = () => {
    const app = document.getElementById('app');
    const textArea = document.createElement('textarea');
    textArea.value = commands;

    app.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    app.removeChild(textArea);
    alert('All commands are in your clipboard');
  };

  return (
    <Box height={window.innerHeight} bgcolor="#0D0D0D">
      <NavBar />
      <List />
      {commands.length && (
        <Box
          width={1}
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bottom={0}
          height="56px"
        >
          <Button
            onClick={() => {
              copyToClipboard();
            }}
          >
            Copy to clipboard
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CommandsList;
