const electron = require("electron");
const ipc = require("node-ipc");
const { exec } = require("child_process");
const path = require("path");

const program = path.join(__dirname, "./main.js");

exec(`${electron} ${program}`);
// exec("bash-shortcut-creator");

ipc.config.id = "runner";

ipc.serve(() => {
  ipc.server.on("run", (data, _socket) => {
    exec(data, (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
});

ipc.server.start();
