import Link from 'next/link';
import { useRouter } from 'next/router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/all';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import logo from '../../assets/images/logo.png';

import {
  NavbarStyled,
  LogoWrap,
  Logo,
} from './Navbar.styled';

const Navbar = (): JSX.Element => {
  return (
    <NavbarStyled>
      <LogoWrap>
        <Logo
          width={50}
          src={logo.src}
          alt='TidBit'
        />

        <p>TIDBIT</p>
      </LogoWrap>
    </NavbarStyled>
  )
}

export default Navbar;