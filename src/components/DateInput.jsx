import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { FaCalendarAlt } from 'react-icons/fa';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

const DateInputContainer = styled.div`
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

const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker__input-container {
    position: relative;
  }

  input {
    width: 100%;
    padding: 12px 16px 12px 44px;
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
  }
  
  .react-datepicker__calendar-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    padding: 0;
    margin: 0;
    width: 18px;
    height: 18px;
  }
`;

export default function DateInput({ label, ...props }) {
  const [date, setDate] = useState(null);

  return (
    <DateInputContainer>
      <Label>{label}</Label>
      <DatePickerWrapper>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          placeholderText="DD/MM/AAAA"
          dateFormat="dd/MM/yyyy"
          locale="pt-BR"
          showIcon
          icon={<FaCalendarAlt size={18} color="#A0A0A0" />}
          {...props}
        />
      </DatePickerWrapper>
    </DateInputContainer>
  );
}