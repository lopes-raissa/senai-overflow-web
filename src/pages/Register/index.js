import { Container, FormLogin, Header, Button, Body } from "./styles";
import Input from "../../components/Input";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { api } from "../../services/api";

function Register() {

  const history = useHistory();

  const [student, setStudent] = useState({
    ra:"",
    name:"",
    email:"",
    password:"",
    validPassword:"",
  });

  const handleInput = (e) => {
    setStudent({...student, [e.target.id]: e.target.value });
  };

  const validPassword = () => student.password === student.validPassword;

  const buttonDisabled = () => {
    const {ra, name, email, password} = student;

    if (!ra || !name || !email || !password || !validPassword()) return true;

    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validPassword()) return alert("As senhas precisam ser iguais!");

    try {

      const {ra, name, email, password} = student;

      const response = await api.post("/student", {
        ra,
        name, 
        email, 
        password
      });

      console.log(response);

      history.push("/home");
      
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  };

  return (
    <Container>
      <FormLogin onSubmit={handleSubmit}>
        <Header>
          <h1>Bem-vindo ao Senai Overflow</h1>
          <h2>INFORME OS SEUS DADOS</h2>
        </Header>
        <Body>
          <Input id="ra"
           label="RA" 
           type="text" 
           value={student.ra}
           handler={handleInput} 
           />
          <Input
           id="name" 
           label="Nome" 
           type="text"
           value={student.name}
           handler={handleInput}
            />
          <Input
           id="email"
           label="E-mail"
           type="email"
           value={student.email}
           handler={handleInput} 
            />
          <Input 
           id="password" 
           label="Senha"
           type="password"
           value={student.password}
           handler={handleInput} />
          <Input
            id="validPassword"
            label="Confirmar senha"
            type="password"
            onBlur={(e) => {
              if (!validPassword()) alert("As senhas precisam ser iguais");
              e.target.focus();
            }}
            value={student.validPassword}
            handler={handleInput}
          />
          <Button disabled={buttonDisabled}>Entrar</Button>
          <Link to="/">Ou, se já tem cadastro, clique para voltar</Link>
        </Body>
      </FormLogin>
    </Container>
  );
}

export default Register;
