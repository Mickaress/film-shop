import React from 'react';
import Logo from './Logo';
import UserActions from './UserActions';
import Container from '@/components/layout/Container';

const Header = () => {
  return (
    <header className="bg-white py-5">
      <Container className="flex justify-between">
        <Logo />
        <UserActions />
      </Container>
    </header>
  );
};

export default Header;
