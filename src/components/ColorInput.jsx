import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPalette } from 'react-icons/fa';

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

const PickerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  clip: rect(0 0 0 0);
`;

const StyledLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 50px;
  background-color: #FFFFFF;
  cursor: pointer;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  ${HiddenInput}:focus + & {
    outline: none;
    border-color: #E87A3E;
    box-shadow: 0 0 0 2px rgba(232, 122, 62, 0.2);
  }
`;

const PickerText = styled.span`
  font-size: 1rem;
  color: #A0A0A0;
`;

const PickerIcon = styled.div`
  color: ${props => props.color};
  display: flex;
  align-items: center;
  transition: color 0.2s ease-in-out;
`;

export default function ColorInput({ label, id = 'color-picker', initialColor = '#E87A3E', onChange }) {
  const [color, setColor] = useState(initialColor);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <ComponentContainer>
      <Label htmlFor={id}>{label}</Label>
      <PickerWrapper>
        <HiddenInput
          id={id}
          type="color"
          value={color}
          onChange={handleColorChange}
        />
        <StyledLabel htmlFor={id}>
          <PickerText>Selecione...</PickerText>
          <PickerIcon color={color}>
            <FaPalette size={20} />
          </PickerIcon>
        </StyledLabel>
      </PickerWrapper>
    </ComponentContainer>
  );
}