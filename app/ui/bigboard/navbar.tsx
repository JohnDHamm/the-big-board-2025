'use client'

import { useContext } from "react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

import { UserContext } from "@/app/contexts";
import Logo from "@/app/ui/bigboard/Logo";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const pathname = usePathname();

  const links = [
    { name: 'SELECTIONS', href: '/bigboard/selections'},
    { name: 'PLAYERS', href: '/bigboard/players'},
    { name: 'MY TEAM', href: '/bigboard/my-team'},
  ]
  
  if (user?.isCommish) {
    links.push(
      { name: 'OTHER', href: '/bigboard/other'}
    )
  }

  return (
    <div className="flex w-full justify-evenly p-6 bg-black">
      <div className="w-2xs">
       <Logo />
      </div>
      <div>
        {user ? `hello ${user.name}!` : null}
      </div>
        {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'hover:text-blue-600',
              {
                'text-yellow-300': pathname === link.href,
              },
            )}
          >
            <p className="">{link.name}</p>
          </Link>
        );
      })}
      </div>
  )
}

export default Navbar;
