import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos e Layout
import { GlobalStyle } from './styles/GlobalStyles';

// Componentes
import Button from './components/Button';
import InputField from './components/InputField';
import PasswordInput from './components/PasswordField';
import InputWithAvatar from './components/InputWithAvatar';
import ColorInput from './components/ColorInput';
import DateInput from './components/DateInput';
import DropdownSearch from './components/DropdownSearch';
import SelectInput from './components/SelectInput';
import Switch from './components/Switch';
import Sidebar from './components/Sidebar';
import EventosPage from './components/EventosPage';
import ContextMenu from './components/ContextMenu';

import AvatarTeste from './assets/perfil.jpg';
import logoUrl from './assets/logo.png';

const opcoesDropDown = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];
const opcoesSelect = [
  { value: 'opcao1', label: 'Opção 1' },
  { value: 'opcao2', label: 'Opção 2' },
];
const modalidades = ["Por equipes", "Individuais"];
const dadosDosEventos = [
  { id: 1, nome: 'Clube do Laço Coração Pantaneiro', equipes: 10, status: 'Ativo', data: '09 a 11 de Junho' },
  { id: 2, nome: 'ExpoAgro de Dourados', equipes: 25, status: 'Ativo', data: '15 a 18 de Junho' },
  { id: 3, nome: 'Festa do Peão de Barretos', equipes: 150, status: 'Encerrado', data: '20 a 25 de Maio' },
];

const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #FAFAFA;
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 32px;
`;

const ShowcaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
  margin-bottom: 48px;
`;


function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleModalidadeChange = (selected) => {
    console.log("Modalidade alterada para:", selected);
  };
  const handleView = () => alert("Visualizar item");
  const handleEdit = () => alert("Editar item");
  const handleRemove = () => alert("Remover item");

  const currentUser = {
    name: "Adriano França",
    role: "Administrador",
    avatarUrl: AvatarTeste
  };

  return (
    <>
      <GlobalStyle />
      <AppLayout>
        <Sidebar logoUrl={logoUrl} user={currentUser} activePath={'/eventos'} />
        
        <MainContent>
          <ShowcaseContainer>
            <InputField label="Nome completo" placeholder="Digite aqui seu nome" />
            <PasswordInput label="Senha"/>
            <InputWithAvatar label="Selecione seu avatar" avatarSrc={AvatarTeste} fileUploadId="chat-message"/>
            <ColorInput label="Escolha uma cor"/>
            <DateInput label="Data de nascimento"/>
            <DropdownSearch label="Escolha uma das opções" options={opcoesDropDown} placeholder="Selecione..."/>
            <SelectInput label="Selecione uma opção" options={opcoesSelect} placeholder="Selecione..."/>
            <Switch
              label="Modalidades"
              options={modalidades}
              onToggle={handleModalidadeChange}
            />
            <Button>Enviar</Button>
          </ShowcaseContainer>

          <EventosPage
            data={dadosDosEventos}
            pagination={{
              currentPage: currentPage,
              totalPages: 5,
              onPageChange: (page) => setCurrentPage(page)
            }}
          />
        </MainContent>
      </AppLayout>
    </>
  );
}

export default App;