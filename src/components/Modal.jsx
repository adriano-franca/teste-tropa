import React from 'react';
import styled from 'styled-components';
import { FiX } from 'react-icons/fi';
import Button from './Button';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background: #FFFFFF;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 450px;
  position: relative;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  transform: ${props => (props.isOpen ? 'translateY(0)' : 'translateY(-20px)')};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  color: #333;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: #A0A0A0;
`;

const ModalBody = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;

const ModalFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
`;

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen && !document.hidden) return null;

  const handleOverlayClick = () => {
    if (onClose) {
        onClose();
    }
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>
            <FiX size={24} />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
        <ModalFooter>
          <Button primary onClick={onClose}>OK</Button>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
}