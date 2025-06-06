import styled from 'styled-components';

const InputContainer = styled.div`
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

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 50px;
  font-size: 1rem;
  background-color: #FFFFFF;
  color: #333;
  box-sizing: border-box;

  &::placeholder {
    color: #A0A0A0;
  }

  &:focus {
    outline: none;
    border-color: #E87A3E;
    box-shadow: 0 0 0 2px rgba(232, 122, 62, 0.2);
  }
`;

export default function InputField({ id, label, placeholder, ...props }) {
  return (
    <InputContainer>
      <Label htmlFor={id}>{label}</Label>
      <StyledInput id={id} placeholder={placeholder} {...props} />
    </InputContainer>
  );
}