const closeWindow = () => {
  window.ipcRenderer.send('killWindow');
};

const createCommand = (command) => {
  window.ipcRenderer.send('createCommand', command);
};

const getCommands = () => {
  const commands = window.ipcRenderer.sendSync('getCommandsData');
  return commands;
};

const deleteCommand = (uuid) => {
  const commands = window.ipcRenderer.sendSync('deleteCommand', uuid);
  return commands;
};

export { closeWindow, createCommand, getCommands, deleteCommand };
