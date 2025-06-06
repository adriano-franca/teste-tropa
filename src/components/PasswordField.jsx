import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px; // Você pode ajustar a largura conforme necessário
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #E87A3E;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px; // Espaço à direita para o ícone
  border: 1px solid #E0E0E0;
  border-radius: 50px; // Bordas arredondadas para o formato de pílula
  font-size: 1rem;
  background-color: #FFFFFF;
  color: #333;

  &::placeholder {
    color: #A0A0A0;
  }

  &:focus {
    outline: none;
    border-color: #E87A3E;
    box-shadow: 0 0 0 2px rgba(232, 122, 62, 0.2);
  }
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  color: #E87A3E;
`;

const PasswordInput = () => {
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <InputContainer>
      <Label htmlFor="password">Senha</Label>
      <InputWrapper>
        <StyledInput
          id="password"
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Digite aqui"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ToggleButton type="button" onClick={togglePasswordVisibility}>
          {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </ToggleButton>
      </InputWrapper>
    </InputContainer>
  );
};

export default PasswordInput;