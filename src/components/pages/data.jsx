import React, { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { NavBar } from '../molecules/';
import { List } from '../organisms';
import { Button } from '../atoms';
import { getCommands, deleteCommand } from '../../utils';

const CommandsList = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const commands = getCommands();
    setCommands(commands);
  }, []);

  const deleteCommands = (uuid) => {
    const commands = deleteCommand(uuid);
    setCommands(commands);
  };

  const copyToClipboard = () => {
    const app = document.getElementById('app');
    const textArea = document.createElement('textarea');
    const filteredCommands = commands.map((command) => ({
      name: command.name,
      code: command.code,
    }));
    const commandsToCopy = JSON.stringify(filteredCommands);

    app.appendChild(textArea);

    textArea.value = commandsToCopy;
    textArea.select();
    document.execCommand('copy');

    app.removeChild(textArea);

    alert('All commands are in your clipboard');
  };

  return (
    <Box height={window.innerHeight} bgcolor="#0D0D0D">
      <NavBar />
      <List commands={commands} deleteCommands={deleteCommands} />
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
