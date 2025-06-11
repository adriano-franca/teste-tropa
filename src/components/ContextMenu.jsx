import React, { useState, useRef, useEffect } from 'react';
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
  position: absolute;
  right: 0;
  list-style: none;
  padding: 8px;
  margin: 0;
  background-color: #FFFFFF;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: max-content;
  z-index: 10;
  border: 1px solid #F0F0F0;
  
  top: ${props => props.position.top};
  bottom: ${props => props.position.bottom};
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
  const [position, setPosition] = useState({ top: 'calc(100% + 4px)', bottom: 'auto' });
  const wrapperRef = useRef(null);
  const menuRef = useRef(null);

  const handleToggle = () => {
    if (!isOpen && wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - wrapperRect.bottom;
      const menuHeight = 160;

      if (spaceBelow < menuHeight) {
        setPosition({ top: 'auto', bottom: 'calc(100% + 4px)' });
      } else {
        setPosition({ top: 'calc(100% + 4px)', bottom: 'auto' });
      }
    }
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleActionClick = (action) => {
    if (action) action();
    setIsOpen(false);
  };

  const menuActions = [
    { label: 'Visualizar', icon: <FiEye size={18} />, action: onView },
    { label: 'Editar', icon: <FiEdit2 size={18} />, action: onEdit },
    { label: 'Remover', icon: <FiTrash2 size={18} />, action: onRemove, isDestructive: true },
  ];

  return (
    <MenuWrapper ref={wrapperRef}>
      <TriggerButton onClick={handleToggle}>
        <FiMoreVertical size={20} color="#555" />
      </TriggerButton>

      {isOpen && (
        <MenuList ref={menuRef} position={position}>
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
      )}
    </MenuWrapper>
  );
}