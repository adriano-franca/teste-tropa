import React from 'react';
import styled from 'styled-components';

import Avatar from './Avatar';
import FileUpload from './FileUpload';

const ComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-family: Arial, sans-serif;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #E87A3E;
  margin-bottom: 8px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

export default function InputWithAvatar({ label, avatarSrc, fileUploadId, ...props }) {
  return (
    <ComponentContainer>
      <Label htmlFor={fileUploadId}>{label}</Label>
      <InputRow>
        <Avatar src={avatarSrc} />
        <FileUpload id={fileUploadId} {...props} />
      </InputRow>
    </ComponentContainer>
  );
}