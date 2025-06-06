import React, { useState } from 'react';
import styled from 'styled-components';

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #E87A3E;
  margin-bottom: 8px;
`;

const SwitchWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr; /* Divide o espaço em duas colunas iguais */
  background-color: #F4F4F4; /* Um fundo cinza claro para o 'trilho' */
  border-radius: 50px;
  border: 1px solid #E0E0E0;
  padding: 2px;
`;

const Highlight = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  height: calc(100% - 4px);
  width: calc(50% - 2px);
  background-color: #E87A3E;
  border-radius: 50px;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => (props.activeIndex === 0 ? '0%' : '100%')});
`;

const SwitchOption = styled.button`
  padding: 10px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: ${props => (props.isActive ? '#FFFFFF' : '#333')};
  cursor: pointer;
  z-index: 2;
  transition: color 0.3s ease-in-out;
  white-space: nowrap;
`;

export default function Switch({ label, options = [], onToggle }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Garante que o componente funcione apenas com 2 opções
  if (options.length !== 2) {
    console.error("O componente Switch foi projetado para exatamente 2 opções.");
    return null;
  }

  const handleToggle = (index) => {
    setActiveIndex(index);
    if (onToggle) {
      onToggle(options[index]);
    }
  };
  
  return (
    <ComponentContainer>
      <Label>{label}</Label>
      <SwitchWrapper>
        <Highlight activeIndex={activeIndex} />
        <SwitchOption
          isActive={activeIndex === 0}
          onClick={() => handleToggle(0)}
        >
          {options[0]}
        </SwitchOption>
        <SwitchOption
          isActive={activeIndex === 1}
          onClick={() => handleToggle(1)}
        >
          {options[1]}
        </SwitchOption>
      </SwitchWrapper>
    </ComponentContainer>
  );
}