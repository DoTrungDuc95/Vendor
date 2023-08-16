import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { RxCross1 } from 'react-icons/rx';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { useDebounce } from 'use-debounce';
import { productData } from '@/static-data';
import { ProductType } from '@/types';

import Dropdown from './Dropdown';
import Nav from './Nav';
import Cart from '@/components/cart/Cart';
import Wishlist from '../wishlist/Wishlist';

const Header = () => {
  const { data: session } = useSession();

  const [isDropdown, setIsDropdown] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const [term, setTerm] = useState('');
  const [debounceTerm] = useDebounce(term, 2000);

  const searchData = useMemo(() => {
    if (!debounceTerm) return [];
    return productData.filter((p) =>
      p.name.toLowerCase().includes(debounceTerm.toLowerCase())
    );
  }, [debounceTerm]);

  useEffect(() => {
    const set = () => {
      if (window.scrollY > 70) setIsScroll(true);
      else setIsScroll(false);
    };

    window.addEventListener('scroll', set);

    return () => {
      window.removeEventListener('scroll', set);
    };
  }, []);

  const router = useRouter();

  if (
    router.pathname === '/login' ||
    router.pathname === '/signup' ||
    router.pathname === '/_error'
  )
    return null;

  return (
    <section>
      <div className="section">
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex 800px:justify-between 800px:items-center">
          <div>
            <Link href="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="search..."
              className="h-[40px] w-full px-2 pr-10 border-gray-500 focus:border-blue-400 border-2 outline-none rounded-md"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
            <AiOutlineSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-2xl cursor-pointer" />
            {searchData?.length > 0 && (
              <div className="absolute w-full bg-slate-50 shadow-lg z-[9] p-4">
                {searchData.map((data: ProductType) => (
                  <Link key={data.id} href={`/products/${data.id}`}>
                    <div className="flex items-center py-3" title={data.name}>
                      <img
                        src={`${data.image_Url[0]?.url}`}
                        alt=""
                        className="w-[40px] h-[40px] mr-[16px]"
                      />
                      <span className="truncate">{data.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="btn">
            <Link href={'/'}>
              <span className="text-[#fff] flex-type-1">
                Become Seller{' '}
                <IoIosArrowForward className="ml-1" color="#fff" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          isScroll ? 'shadow-lg fixed top-0 z-10' : ''
        } transition hidden 800px:flex 800px:items-center 800px:justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div className="relative section flex-type-1 justify-between">
          <div>
            <div className="relative  h-[60px] w-[270px] mt-[10px] hidden 1000px:block">
              <BiMenuAltLeft className="absolute text-3xl top-[20%] left-2 " />

              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                onClick={() => setIsDropdown((p) => !p)}
              >
                All Categories
              </button>

              <IoIosArrowDown
                size={20}
                className={`absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer transition-all duration-200 ${
                  isDropdown ? 'rotate-180 ' : ''
                }`}
              />

              {isDropdown && <Dropdown setIsDropdown={setIsDropdown} />}
            </div>
          </div>

          <div className="flex-type-1">
            <Nav />
          </div>

          <div className="flex">
            <div
              className="flex-type-1"
              onClick={() => setIsWishlistOpen(true)}
            >
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {}}
                title="wishlist"
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {2}
                </span>
              </div>
            </div>

            <div className="flex-type-1" onClick={() => setIsCartOpen(true)}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => {}}
                title="cart"
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {5}
                </span>
              </div>
            </div>

            <div className="flex-type-1">
              <div className="relative cursor-pointer mr-[15px]">
                {session && session.user ? (
                  <Link href="/profile">
                    {session.user.avatar.url ? (
                      <img
                        src={session.user.avatar.url}
                        className="w-[35px] h-[35px] rounded-full"
                        alt=""
                      />
                    ) : (
                      <span className="grid place-content-center text-white text-[20px] font-bold w-[35px] h-[35px] rounded-full bg-green-400">
                        {session.user.name[0]}
                      </span>
                    )}
                  </Link>
                ) : (
                  <Link href="/login" title="login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCartOpen && <Cart onClose={setIsCartOpen} />}

      {isWishlistOpen && <Wishlist onClose={setIsWishlistOpen} />}

      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link href="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setIsCartOpen(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {5}
              </span>
            </div>
          </div>
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-auto">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setOpen(false);
                    }}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {2}
                    </span>
                  </div>
                </div>

                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  onChange={(e) => setTerm(e.target.value)}
                  value={term}
                />
                {searchData.length > 0 && (
                  <div className="absolute bg-[#fff] z-10 shadow-lg w-full left-0 p-3 overflow-y-auto">
                    {searchData.map((i) => (
                      <Link
                        href={`/products/${i.id}`}
                        className="mb-4 block"
                        onClick={() => setOpen(false)}
                        key={i.id}
                      >
                        <div className="flex items-center">
                          <img
                            src={i.image_Url[0]?.url}
                            alt=""
                            className="w-[50px] mr-2"
                          />
                          <h5 className="truncate">{i.name}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Nav closeSidebar={setOpen} />

              <div className="btn ml-4 !rounded-[4px]">
                <Link href="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>

              <div className="flex w-full justify-center absolute bottom-8">
                {session ? (
                  <div onClick={() => setOpen(false)}>
                    <Link href="/profile">
                      {session.user.avatar.url ? (
                        <img
                          src={`${session?.user.avatar?.url}`}
                          alt=""
                          className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                        />
                      ) : (
                        <span className="grid place-content-center text-white text-[30px] font-bold w-[60px] h-[60px] rounded-full bg-green-400">
                          {session.user.name[0]}
                        </span>
                      )}
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[18px] pr-[10px] text-[#000000b7]"
                    >
                      Login /
                    </Link>

                    <Link
                      href="/sign-up"
                      className="text-[18px] text-[#000000b7]"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
