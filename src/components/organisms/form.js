import React, { useState } from "react";
import { Input, Button } from "../atoms";
import { FormControl } from "@material-ui/core";

function Form() {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const handleSubmit = () => {
    window.ipcRenderer.send("createCommand", form);
  };

  return (
    <>
      <FormControl>
        <Input
          label="Name"
          variant="outlined"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          multiline
          rows={8}
          width="500px"
          label="Code"
          variant="outlined"
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Enviar
        </Button>
      </FormControl>
    </>
  );
}

export default Form;
