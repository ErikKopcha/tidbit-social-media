import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react'
import Discover from '../Discover'
import SuggestedAccounts from '../SuggestedAccounts'
import Footer from '../Footer'

import {
  SidebarContent,
  ButtonToggleSidebar,
  SidebarNavigation,
  NormalizeLink,
  LogInWrap,
  ButtonGoogleLogin
} from './Sidebar.styled';

const Sidebar = (): JSX.Element => {
  const [showSidebar, setShowSidebar] = useState(false);
  const userProfile = false;

  return (
    <div>
      <ButtonToggleSidebar
        onClick={() => setShowSidebar((prev) => !prev) }
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </ButtonToggleSidebar>

      {showSidebar && (
        <SidebarContent>
          <SidebarNavigation>
            <Link href="/">
              <NormalizeLink>
                <AiFillHome />
                <p>For You</p>
              </NormalizeLink>
            </Link>
          </SidebarNavigation>

          {!userProfile && (
            <LogInWrap>
              <p>Log in to like and comment videos</p>
              <div>
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <ButtonGoogleLogin
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log In
                    </ButtonGoogleLogin>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </LogInWrap>
          )}

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </SidebarContent>
      )}
    </div>
  )
}

export default Sidebar;