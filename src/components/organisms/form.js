import React, { useState } from "react";
import { Input, Button } from "../atoms";
import { FormControl } from "@material-ui/core";

function Form(props) {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  useState(() => {
    console.log(props);
    const { nameToSet, codeToSet } = props;
    if (nameToSet && codeToSet) {
      setForm({
        name: nameToSet,
        code: codeToSet,
      });
    }
    console.log(nameToSet, codeToSet);

    return () => {
      props.location.state = null;
    };
  }, []);

  const handleSubmit = () => {
    setForm({
      name: "",
      code: "",
    });
    window.ipcRenderer.send("createCommand", form);
  };

  return (
    <>
      <FormControl>
        <Input
          label="Name"
          variant="outlined"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          multiline
          rows={8}
          width="500px"
          label="Code"
          variant="outlined"
          value={form.code}
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
