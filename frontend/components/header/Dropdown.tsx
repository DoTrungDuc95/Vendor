import { categoriesData } from '@/static-data';
import Link from 'next/link';

type DropdownProps = {
  setIsDropdown: (value: boolean) => void;
};

const Dropdown = ({ setIsDropdown }: DropdownProps) => {
  const handlerClick = () => {
    setIsDropdown(false);
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-lg">
      {categoriesData.map((category) => (
        <Link key={category.id} href={`/products?category=${category.title}`}>
          <div
            onClick={handlerClick}
            className="flex-type-1 hover:bg-slate-300 transition"
          >
            <img
              src={category.image_Url}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none',
              }}
              alt=""
            />
            <span className="m-3 cursor-pointer select-none">
              {category.title}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Dropdown;
