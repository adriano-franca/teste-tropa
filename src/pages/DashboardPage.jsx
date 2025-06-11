import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { FiMenu } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import TablePage from '../components/Table';
import Modal from '../components/Modal';

const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #FAFAFA;
  position: relative;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 32px 48px;
  transition: filter 0.3s ease-in-out;

  @media (max-width: 992px) {
    padding: 24px;
  }
`;

const ContentHeader = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const MenuToggleButton = styled.button`
  display: none;
  background: #fff;
  border: 1px solid #E0E0E0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 998;

  @media (max-width: 992px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
  z-index: 999;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;

const WelcomeMessage = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 0;

  span {
    font-weight: bold;
  }
`;

export default function DashboardLayout({ user, onLogout }) {
  const [eventos, setEventos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchEventos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/eventos.json');
        if (!response.ok) throw new Error('Erro ao carregar dados.');
        const data = await response.json();
        setEventos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventos();
  }, []);

  const filteredEventos = useMemo(() => {
    if (!searchQuery) return eventos;
    return eventos.filter(evento =>
      evento.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [eventos, searchQuery]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredEventos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTableData = filteredEventos.slice(startIndex, endIndex);

  const openModal = (title, message) => {
    setModalContent({ title, message });
    setIsModalOpen(true);
    setIsSidebarOpen(false);
  };

  const handleMenuItemClick = (menuItem) => {
    if (menuItem.path !== '/eventos') {
      openModal('Em Desenvolvimento', `A tela "${menuItem.label}" ainda está sendo construída.`);
    }
  };
  
  const handleNewClick = () => {
    openModal('Funcionalidade Indisponível', 'A criação de um novo evento será implementada em breve.');
  };
  
  const handleViewClick = (item) => {
    openModal('Funcionalidade Indisponível', `A visualização detalhada para o evento "${item.nome}" será implementada em breve.`);
  };

  const handleEditClick = (item) => {
    openModal('Funcionalidade Indisponível', `A edição para o evento "${item.nome}" será implementada em breve.`);
  };

  const handleRemoveClick = (item) => {
    openModal('Ação Indisponível', `A remoção para o evento "${item.nome}" será implementada em breve.`);
  };
  
  const handleEditProfileClick = () => {
    openModal('Funcionalidade Indisponível', 'A tela para alterar dados do perfil será implementada em breve.');
  };

  return (
    <AppLayout>
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalContent.title}
      >
        <p>{modalContent.message}</p>
      </Modal>

      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      
      <Sidebar 
        user={user}
        onLogout={onLogout}
        onEditProfile={handleEditProfileClick}
        activePath={'/eventos'}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
      
      <MainContent>
        <ContentHeader>
          <MenuToggleButton onClick={() => setIsSidebarOpen(true)}>
            <FiMenu size={20} />
          </MenuToggleButton>
          <WelcomeMessage>
            Bem vindo de volta, <span>{user.name}</span>
          </WelcomeMessage>
        </ContentHeader>

        {isLoading && <p>Carregando dados...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <TablePage
            onNewClick={handleNewClick}
            onViewClick={handleViewClick}
            onEditClick={handleEditClick}
            onRemoveClick={handleRemoveClick}
            data={currentTableData}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            pagination={{
              currentPage: currentPage,
              totalPages: totalPages,
              onPageChange: (page) => setCurrentPage(page)
            }}
          />
        )}
      </MainContent>
    </AppLayout>
  );
}