import React from 'react';
import styled from 'styled-components';
import {
  FiGrid, FiCalendar, FiClock, FiUsers, FiUser, FiLogOut, FiX
} from 'react-icons/fi';
import logoImage from '../assets/logo.png';

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
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0;
    transform: translateX(${props => (props.isOpen ? '0' : '-100%')});
    box-shadow: 4px 0px 15px rgba(0,0,0,0.1);
  }
`;

const TopSection = styled.div``;
const BottomSection = styled.div``;

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const ContainerLogo = styled.div``;

const Logo = styled.img`
  display: block;
  height: 32px;
  max-width: 100%;
  margin: 0;
`;

const CloseButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  @media (max-width: 992px) {
    display: block;
  }
`;

const MenuHeader = styled.h3`
  font-size: 0.75rem;
  color: #A0A0A0;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 12px;
  margin-bottom: 8px;
`;

const NavList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default function Sidebar({ user = {}, activePath, onLogout, isOpen, onClose, onMenuItemClick, onEditProfile }) {
  const menuItems = [
    { label: 'Dashboard', icon: <FiGrid size={20} />, path: '/dashboard' },
    { label: 'Eventos', icon: <FiCalendar size={20} />, path: '/eventos' },
    { label: 'Equipes', icon: <FiClock size={20} />, path: '/equipes' },
    { label: 'Inscrições', icon: <FiUsers size={20} />, path: '/inscricoes' },
  ];

  const userActions = [
    { label: 'Alterar dados', icon: <FiUser size={18} />, action: onEditProfile },
    { label: 'Sair', icon: <FiLogOut size={18} />, action: onLogout },
  ];

  const handleLinkClick = (e, item) => {
    e.preventDefault();
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <TopSection>
        <SidebarHeader>
          <ContainerLogo>
            <Logo src={logoImage} alt="Logo" />
          </ContainerLogo>
          <CloseButton onClick={onClose}>
            <FiX size={24} color="#555" />
          </CloseButton>
        </SidebarHeader>
        <MenuHeader>Menu</MenuHeader>
        <NavList>
          {menuItems.map(item => (
            <li key={item.label}>
              <NavLink 
                href={item.path} 
                isActive={activePath === item.path}
                onClick={(e) => handleLinkClick(e, item)}
              >
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