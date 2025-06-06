import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  font-family: Arial, sans-serif;
  position: relative;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #E87A3E;
  margin-bottom: 8px;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #E0E0E0;
  border-radius: ${props => (props.isOpen ? '16px 16px 0 0' : '50px')};
  font-size: 1rem;
  background-color: #FFFFFF;
  color: #333;
  box-sizing: border-box;
  transition: border-radius 0.1s ease-in-out;

  &:focus {
    outline: none;
    border-color: #E87A3E;
    box-shadow: 0 0 0 2px rgba(232, 122, 62, 0.2);
  }
`;

const Icon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0A0A0;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  list-style: none;
  padding: 8px 0;
  margin: 0;
  background-color: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-top: none;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  color: #E87A3E;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #F7F7F7;
  }
`;

export default function DropdownSearch({ label, options = [], onSelect, placeholder = "Buscar" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  const handleSelect = (option) => {
    setSearchTerm(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <ComponentContainer ref={wrapperRef}>
      <Label>{label}</Label>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          isOpen={isOpen && filteredOptions.length > 0}
        />
        <Icon>
          <FiSearch size={20} />
        </Icon>
      </InputWrapper>
      {isOpen && filteredOptions.length > 0 && (
        <DropdownList>
          {filteredOptions.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </ComponentContainer>
  );
}