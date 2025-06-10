import React, { useState } from 'react';
import styled from 'styled-components';

import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import Button from '../components/Button';
import logoUrl from '../assets/logo.png';
import illutstrationUrl from '../assets/assetLogin.png'

const LoginPageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #F8F9FA;
  font-family: Arial, sans-serif;
`;

const LoginCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 750px;
  background: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  overflow: hidden;
`;

const FormPanel = styled.div`
  flex: 1;
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const IllustrationPanel = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFEFE3; /* Tom de laranja mais claro, como na imagem */
`;

const Illustration = styled.img`
  max-width: 80%;
`;

const Logo = styled.img`
  height: 28px;
  width: 60%;
  margin-bottom: 24px;
  align-self: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #E87A3E;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #A0A0A0;
  margin: 0 0 32px 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
  try{
    const response = await fetch('/users.json');
    const users = await response.json();

    console.log('Usuários carregados do JSON:', users);

    const foundUser = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (foundUser) {
      onLoginSuccess(foundUser);
    } else {
      alert('E-mail ou senha incorretos.');
    }

  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    alert('Ocorreu um erro ao tentar fazer login. Tente novamente.');
  } finally {
    setIsLoading(false);
  }
};
  return (
    <LoginPageWrapper>
      <LoginCard>
        <FormPanel>
          <Logo src={logoUrl} alt="Logo" />
          <Title>Bem-vindo de volta</Title>
          <Subtitle>Entre com sua conta para acessar o painel.</Subtitle>

          <StyledForm onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="E-mail"
              placeholder="Digite seu e-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <PasswordField
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button primary type="submit" style={{ marginTop: '16px' }} disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Enviar'}
            </Button>
          </StyledForm>
        </FormPanel>

        <IllustrationPanel>
          <Illustration src={illutstrationUrl} alt="Ilustração de login" />
        </IllustrationPanel>
      </LoginCard>
    </LoginPageWrapper>
  );
}