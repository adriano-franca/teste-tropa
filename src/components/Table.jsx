import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiPlus, FiSearch } from 'react-icons/fi';
import ContextMenu from './ContextMenu';

const PageWrapper = styled.div`
  padding: 32px;
  background-color: #FAFAFA;
  font-family: Arial, sans-serif;
`;
const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap; 
  gap: 16px;
`;
const PageTitle = styled.h1`
  font-size: 1.75rem;
  color: #E87A3E;
  margin: 0;
`;
const ActionsContainer = styled.div`
  display: flex;
  gap: 16px;
`;
const SearchWrapper = styled.div`
  position: relative;
  width: 250px;
`;
const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 40px;
  border-radius: 50px;
  border: 1px solid #E0E0E0;
  background-color: #FFFFFF;
  font-size: 0.9rem;
  &:focus { outline: none; border-color: #E87A3E; }
`;
const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #A0A0A0;
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  background-color: ${props => (props.primary ? '#E87A3E' : '#E0E0E0')};
  color: ${props => (props.primary ? '#FFFFFF' : '#555')};
  
  &:hover { opacity: 0.9; }
`;
const TableWrapper = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #F0F0F0;
  border-radius: 16px;
`;

const ScrollableContainer = styled.div`
  overflow-x: auto;
  border-radius: 16px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
`;

const TableHead = styled.thead`
  th {
    padding: 16px;
    text-align: left;
    font-size: 0.8rem;
    color: #E87A3E;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
`;
const TableRow = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #F0F0F0;
  }
`;
const TableCell = styled.td`
  padding: 16px;
  font-size: 0.95rem;
  color: #333;
  vertical-align: middle;
  white-space: nowrap;
`;
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
  gap: 8px;
  padding: 16px;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const PageNumbersContainer = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CurrentPageIndicator = styled.span`
  display: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;

  @media (max-width: 768px) {
    display: block;
  }
`;

const PageButton = styled.button`
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  cursor: pointer;
  font-weight: 500;
  background-color: ${props => (props.isActive ? '#E87A3E' : '#FFFFFF')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#555')};
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const StatusBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => {
      switch (props.status) {
        case 'Ativo': return '#28A745';
        case 'Encerrado': return '#DC3545';
        case 'Agendado': return '#FFC107';
        default: return '#6C757D';
      }
    }};
  }
`;

export default function TablePage({
  data = [],
  pagination = {},
  searchQuery,
  onSearchChange,
  onNewClick,
  onViewClick,
  onEditClick,
  onRemoveClick,
}) {
  const { currentPage, totalPages, onPageChange } = pagination;
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleMenuToggle = (rowId) => {
    setOpenMenuId(prevId => (prevId === rowId ? null : rowId));
  };

  useEffect(() => {
    const handleCloseMenus = () => setOpenMenuId(null);
    window.addEventListener('click', handleCloseMenus);
    window.addEventListener('scroll', handleCloseMenus, true);

    return () => {
      window.removeEventListener('click', handleCloseMenus);
      window.removeEventListener('scroll', handleCloseMenus, true);
    };
  }, []);

  const columns = [
    { key: 'nome', header: 'Nome do evento' },
    { key: 'equipes', header: 'Total de equipes' },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => <StatusBadge status={row.status}>{row.status}</StatusBadge>
    },
    { key: 'data', header: 'Data' },
    { 
      key: 'actions', 
      header: '',
      style: { textAlign: 'right', width: '50px' },
      render: (row) => (
        <ContextMenu
          isOpen={openMenuId === row.id}
          onToggle={() => handleMenuToggle(row.id)}
          onView={() => {
            onViewClick(row);
            setOpenMenuId(null);
          }}
          onEdit={() => {
            onEditClick(row);
            setOpenMenuId(null);
          }}
          onRemove={() => {
            onRemoveClick(row);
            setOpenMenuId(null);
          }}
        />
      )
    },
  ];

  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Todos eventos</PageTitle>
        <ActionsContainer>
          <SearchWrapper>
            <SearchIcon size={18} />
            <SearchInput
              placeholder="Buscar eventos"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </SearchWrapper>
          <Button primary onClick={onNewClick}>
            <FiPlus size={20} />
            Inserir novo
          </Button>
        </ActionsContainer>
      </PageHeader>
      
      <TableWrapper>
        <ScrollableContainer>
          <StyledTable>
            <TableHead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.header}</th>
                ))}
              </tr>
            </TableHead>
            <tbody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell 
                      key={col.key} 
                      style={col.style}
                    >
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </ScrollableContainer>
        {totalPages > 1 && (
          <PaginationWrapper>
            <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </PageButton>
            <PageNumbersContainer>
              {[...Array(totalPages).keys()].map(num => (
                <PageButton
                  key={num + 1}
                  isActive={currentPage === num + 1}
                  onClick={() => onPageChange(num + 1)}
                >
                  {num + 1}
                </PageButton>
              ))}
            </PageNumbersContainer>
            <CurrentPageIndicator>
              {currentPage} / {totalPages}
            </CurrentPageIndicator>
            <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Próxima
            </PageButton>
          </PaginationWrapper>
        )}
      </TableWrapper>
    </PageWrapper>
  );
}