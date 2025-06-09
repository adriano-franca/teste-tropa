import React, { useState } from 'react';
import styled from 'styled-components';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  padding: 12px 40px 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 50px;
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

// AQUI COMEÇAM AS MUDANÇAS
// Renomeando para PasswordField para consistência, mas o nome da função não é o problema principal.
export default function PasswordField({ label, ...props }) { // MODIFICAÇÃO 1: Aceitamos 'label' e todas as outras props (como value e onChange) vindas do pai.
  
  // O estado de visibilidade continua sendo um detalhe interno do componente, isso está correto.
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // MODIFICAÇÃO 2: Removemos o estado interno da senha. Agora a LoginPage que vai controlar isso.
  // const [password, setPassword] = useState(''); <<-- REMOVER ESTA LINHA

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <InputContainer>
      {/* Usamos a prop 'label' para tornar o componente mais reutilizável */}
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <StyledInput
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder="Digite aqui"
          
          // MODIFICAÇÃO 3: Repassamos todas as props recebidas (value, onChange, disabled, etc.) para o input real.
          {...props}
        />
        <ToggleButton type="button" onClick={togglePasswordVisibility}>
          {isPasswordVisible ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </ToggleButton>
      </InputWrapper>
    </InputContainer>
  );
};