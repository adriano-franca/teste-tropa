import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom'; // Importe o createPortal
import styled from 'styled-components';
import { FiMoreVertical, FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';

const MenuWrapper = styled.div`
  position: relative;
  display: inline-block;
  font-family: Arial, sans-serif;
`;

const TriggerButton = styled.button`
  background: transparent;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F7F7F7;
  }
`;

const MenuList = styled.ul`
  position: fixed; /* O menu agora tem posição fixa para flutuar sobre tudo */
  list-style: none;
  padding: 8px;
  margin: 0;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: max-content;
  z-index: 2000; /* Z-index alto para garantir a sobreposição */
  border: 1px solid #F0F0F0;
  transform: translateX(-100%); /* Alinha o menu à direita do botão */
`;

const MenuItem = styled.li`
  &:not(:last-child) {
    border-bottom: 1px solid #F0F0F0;
  }
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background-color: transparent;
  color: ${props => (props.isDestructive ? '#E53E3E' : '#333')};

  &:hover {
    background-color: #F7F7F7;
  }
`;

export default function ContextMenu({ onView, onEdit, onRemove }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  const menuActions = [
    { label: 'Visualizar', icon: <FiEye size={18} />, action: onView },
    { label: 'Editar', icon: <FiEdit2 size={18} />, action: onEdit },
    { label: 'Remover', icon: <FiTrash2 size={18} />, action: onRemove, isDestructive: true },
  ];

  const handleToggle = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = 160; // Altura aproximada do seu menu

      const topPosition = spaceBelow < menuHeight 
        ? rect.top - menuHeight + window.scrollY 
        : rect.bottom + window.scrollY;

      setPosition({
        top: topPosition,
        left: rect.right + window.scrollX,
      });
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClose = () => setIsOpen(false);
    if (isOpen) {
      window.addEventListener("mousedown", handleClose);
    }
    return () => window.removeEventListener("mousedown", handleClose);
  }, [isOpen]);
  
  const handleActionClick = (action) => {
    if (action) action();
    setIsOpen(false);
  };

  const MenuPortal = ({ children }) => createPortal(children, document.body);

  return (
    <MenuWrapper>
      <TriggerButton ref={triggerRef} onClick={handleToggle}>
        <FiMoreVertical size={20} color="#555" />
      </TriggerButton>

      {isOpen && (
        <MenuPortal>
          <MenuList 
            style={{ top: `${position.top}px`, left: `${position.left}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {menuActions.map((item, index) => (
              <MenuItem key={index}>
                <MenuButton 
                  onClick={() => handleActionClick(item.action)}
                  isDestructive={item.isDestructive}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </MenuButton>
              </MenuItem>
            ))}
          </MenuList>
        </MenuPortal>
      )}
    </MenuWrapper>
  );
}