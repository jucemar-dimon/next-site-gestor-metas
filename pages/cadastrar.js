import React, { useState } from "react";
import {
  Button,
  Jumbotron,
  Container,
  FormGroup,
  Label,
  Form,
  Input,
  Alert,
} from "reactstrap";

import Menu from "../components/Menu";

function cadastrar() {
  const [meta, setMeta] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [response, setResponse] = useState({
    formSave: false,
    type: "",
    message: "",
  });

  const onChangeInput = (e) =>
    setMeta({ ...meta, [e.target.name]: e.target.value });

  const sendMeta = async (e) => {
    e.preventDefault();

    setResponse({ formSave: true });
    try {
      const res = await fetch("http://localhost:8080/metas", {
        method: "POST",
        body: JSON.stringify(meta),
        headers: { "Content-Type": "application/json" },
      });

      const responseEnv = await res.json();
      if (responseEnv.erro) {
        setResponse({
          formSave: false,
          type: "error",
          message: responseEnv.message,
        });
      } else {
        setResponse({
          formSave: false,
          type: "success",
          message: responseEnv.message,
        });
      }
    } catch (erro) {
      setResponse({
        formSave: false,
        type: "error",
        message: "Houve um problema ao cadastrar a sua meta. Tente mais tarde",
      });
    }
  };

  return (
    <>
      <Menu />
      <Jumbotron fluid className="form">
        <Container>
          <style>
            {`.form{
  background-color:#171941;
  color:#bf38ac;
  padding-top:30px;
  padding-bottom:150px;
  margin-bottom:0rem !important;

}`}
          </style>
          <h1 className="display-4 text-center">Cadastrar minha meta</h1>
          <hr />
          {response.type === "error" ? (
            <Alert color="danger">{response.message}</Alert>
          ) : (
            ""
          )}
          {response.type === "success" ? (
            <Alert color="success">{response.message}</Alert>
          ) : (
            ""
          )}

          <form onSubmit={sendMeta}>
            <FormGroup>
              <Label>Nome</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Nome da meta"
                onChange={onChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Descrição </Label>
              <Input
                type="text"
                name="description"
                id="description"
                placeholder="Descrição da meta"
                onChange={onChangeInput}
              />
            </FormGroup>
            <FormGroup>
              <Label>Status </Label>
              <Input
                type="text"
                name="status"
                id="status"
                placeholder="Status da meta"
                onChange={onChangeInput}
              />
            </FormGroup>

            {response.formSave ? (
              <Button color="danger" type="submit" disabled={true}>
                Enviando...
              </Button>
            ) : (
              <Button color="primary" type="submit" outline>
                Cadastrar
              </Button>
            )}
          </form>
        </Container>
      </Jumbotron>
    </>
  );
}

export default cadastrar;
