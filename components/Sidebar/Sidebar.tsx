import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GoogleLogin } from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import { useState } from 'react'
import {
  ButtonToggleSidebar,
  SidebarContent,
  SidebarNavigation,
  NormalizeLink
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
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400">Log in to like and comment videos</p>
              <div className="pr-4">
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#F51997] border-[1px]
                      border-[#F51997] font-semibold px-6 py-3 rounded-md
                      outline-none w-full mt-3 hover:text-white hover:bg-[#F51997]"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log In
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          )}

        </SidebarContent>
      )}
    </div>
  )
}

export default Sidebar;