'use client'

import { useContext } from "react";
import { usePathname } from 'next/navigation';

import { UserContext } from "@/app/contexts";
import Logo from "@/app/ui/bigboard/Logo";

import {
  Container,
  LogoContainer,
  MobileTabIcon,
  Tab,
  TabBlock,
  TabsContainer,
  TabLink,
} from './Navbar.styles';

interface Props {
  disabled?: boolean;
}

const Navbar: React.FC<Props> = ({ disabled = false }) => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();

  const links = [
    { name: 'SELECTIONS', href: '/bigboard/selections', mobileAbbv: 'S'},
    { name: 'PLAYERS', href: '/bigboard/players', mobileAbbv: 'P'},
    { name: 'MY TEAM', href: '/bigboard/my-team', mobileAbbv: 'T'},
  ]
  
  if (user?.isCommish) {
    links.push(
      { name: 'MORE', href: '/bigboard/more', mobileAbbv: 'M'}
    )
  }

  return (
    <div>
      {disabled ? (
        <Container>
          <LogoContainer>
            <Logo />
          </LogoContainer>
        </Container>
      ) : (
        <Container>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          <TabsContainer>
            {links.map((link) => {
              return (
                <TabLink key={link.href} href={link.href}>
                  <TabBlock>
                    <MobileTabIcon $active={pathname === link.href}>{link.mobileAbbv}</MobileTabIcon>
                    <Tab $active={pathname === link.href}>{link.name}</Tab>
                  </TabBlock>
                </TabLink>
              );
            })}
          </TabsContainer>
        </Container>
      )}
    </div>
  );  
}

export default Navbar;
