import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #D9632B;
  color: white;
  border: none;
  border-radius: 9999px; /* formato oval */
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b85222;
  }
`;

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}
