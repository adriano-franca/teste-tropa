import React from 'react';
import styled from 'styled-components';
// Importando os ícones que vamos usar
import {
  FiGrid, FiCalendar, FiClock, FiUsers, FiUser, FiLogOut
} from 'react-icons/fi';

// --- Containers Principais ---
const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  width: 260px;
  background-color: #FFFFFF;
  padding: 24px;
  border-right: 1px solid #F0F0F0;
  font-family: Arial, sans-serif;
  flex-shrink: 0;
`;

const TopSection = styled.div``;
const BottomSection = styled.div``;

// --- Logo ---
const Logo = styled.img`
  height: 32px;
  margin-bottom: 32px;
`;

// --- Navegação Principal ---
const MenuHeader = styled.h3`
  font-size: 0.75rem;
  color: #A0A0A0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 12px;
  margin-bottom: 8px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;

  background-color: ${props => (props.isActive ? '#E87A3E' : 'transparent')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#555555')};

  &:hover {
    background-color: ${props => (props.isActive ? '#D9632B' : '#F7F7F7')};
  }
`;

// --- Seção do Perfil ---
const Separator = styled.hr`
  border: none;
  border-top: 1px solid #F0F0F0;
  margin: 20px 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
  color: #333;
`;

const UserRole = styled.span`
  font-size: 0.8rem;
  color: #A0A0A0;
`;

const UserActionsList = styled.div`
  margin-top: 16px;
`;

// --- Componente Principal ---
export default function Sidebar({ logoUrl, user, activePath }) {
  const menuItems = [
    { label: 'Dashboard', icon: <FiGrid size={20} />, path: '/dashboard' },
    { label: 'Eventos', icon: <FiCalendar size={20} />, path: '/eventos' },
    { label: 'Equipes', icon: <FiClock size={20} />, path: '/equipes' },
    { label: 'Inscrições', icon: <FiUsers size={20} />, path: '/inscricoes' },
  ];

  const userActions = [
    { label: 'Alterar dados', icon: <FiUser size={18} />, action: () => alert('Abrir modal de dados...') },
    { label: 'Sair', icon: <FiLogOut size={18} />, action: () => alert('Saindo...') },
  ];

  return (
    <SidebarContainer>
      <TopSection>
        <Logo src={logoUrl} alt="Logo" />
        <MenuHeader>Menu</MenuHeader>
        <NavList>
          {menuItems.map(item => (
            <li key={item.label}>
              <NavLink href={item.path} isActive={activePath === item.path}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </NavList>
      </TopSection>

      <BottomSection>
        <Separator />
        <ProfileWrapper>
          <Avatar src={user.avatarUrl} alt="Avatar" />
          <UserDetails>
            <UserName>{user.name}</UserName>
            <UserRole>{user.role}</UserRole>
          </UserDetails>
        </ProfileWrapper>
        <UserActionsList>
          {userActions.map(action => (
             <NavLink key={action.label} onClick={action.action}>
              {action.icon}
              <span>{action.label}</span>
            </NavLink>
          ))}
        </UserActionsList>
      </BottomSection>
    </SidebarContainer>
  );
}