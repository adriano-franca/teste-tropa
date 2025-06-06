import styled from 'styled-components';

const AvatarImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0; // Impede que a imagem encolha
`;

export default function Avatar({ src, alt = "User Avatar" }) {
  return <AvatarImage src={src} alt={alt} />;
}