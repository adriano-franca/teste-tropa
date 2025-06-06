import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronDown } from 'react-icons/fi';

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

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 50px;
  font-size: 1rem;
  background-color: #FFFFFF;
  color: ${props => (props.hasValue ? '#333' : '#A0A0A0')};
  box-sizing: border-box;
  cursor: pointer;

  /* Remove a seta padrão do navegador */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    outline: none;
    border-color: #E87A3E;
    box-shadow: 0 0 0 2px rgba(232, 122, 62, 0.2);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0A0A0;
  pointer-events: none; /* Permite que o clique passe para o select */
`;

export default function SelectInput({ label, options = [], placeholder, ...props }) {
  const [value, setValue] = useState('');

  const handleOnChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <ComponentContainer>
      <Label htmlFor={props.id}>{label}</Label>
      <SelectWrapper>
        <StyledSelect
          value={value}
          onChange={handleOnChange}
          hasValue={!!value}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder || 'Selecione...'}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
        <IconWrapper>
          <FiChevronDown size={20} />
        </IconWrapper>
      </SelectWrapper>
    </ComponentContainer>
  );
}