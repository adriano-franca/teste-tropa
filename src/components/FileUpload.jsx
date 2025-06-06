import React, { useState } from 'react';
import styled from 'styled-components';
import { FiUpload } from 'react-icons/fi';

const FileUploadContainer = styled.div`
  position: relative;
  width: 300px;
  font-family: Arial, sans-serif;
`;

const HiddenInput = styled.input`
  display: none;
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

const UploadText = styled.span`
  font-size: 1rem;
  color: ${props => (props.hasFile ? '#333' : '#A0A0A0')};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
`;

const UploadIcon = styled.div`
  color: #E87A3E;
  display: flex;
  align-items: center;
`;

export default function FileUpload({ id = "file-upload", ...props }) {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  return (
    <FileUploadContainer>
      <HiddenInput
        id={id}
        type="file"
        onChange={handleFileChange}
        {...props}
      />
      <StyledLabel htmlFor={id}>
        <UploadText hasFile={!!fileName}>
          {fileName || "Escolher arquivo"}
        </UploadText>
        <UploadIcon>
          <FiUpload size={20} />
        </UploadIcon>
      </StyledLabel>
    </FileUploadContainer>
  );
}