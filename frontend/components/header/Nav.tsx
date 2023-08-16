import { navItems } from '@/static-data';
import Link from 'next/link';

type NavProps = {
  closeSidebar?: (val: boolean) => void;
};

const Nav = ({ closeSidebar }: NavProps) => {
  return (
    <nav className="block 800px:flex-type-1">
      {navItems.map((navItem) => (
        <div
          key={navItem.id}
          onClick={() => {
            if (closeSidebar) closeSidebar(false);
          }}
        >
          <Link
            href={navItem.url}
            className={`block text-black 800px:text-white pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
          >
            {navItem.title}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
