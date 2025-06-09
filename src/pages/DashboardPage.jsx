import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import TablePage from '../components/Table';

const AppLayout = styled.div`
  display: flex;
  height: 100vh;
  background-color: #FAFAFA;
`;

const MainContent = styled.main`
  flex-grow: 1;
  overflow-y: auto;
  padding: 32px 48px;
`;

const ContentHeader = styled.div`
  margin-bottom: 24px;
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
  
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch('/eventos.json');
        if (!response.ok) {
          throw new Error('Não foi possível carregar os dados dos eventos.');
        }
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

  const totalPages = Math.ceil(eventos.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTableData = eventos.slice(startIndex, endIndex);

  return (
    <AppLayout>
      <Sidebar 
        user={user}
        onLogout={onLogout}
        activePath={'/eventos'}
      />
      
      <MainContent>
        <ContentHeader>
          <WelcomeMessage>
            Bem vindo de volta, <span>{user.name}</span>
          </WelcomeMessage>
        </ContentHeader>

        {isLoading && <p>Carregando dados dos eventos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <TablePage
            data={currentTableData}
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