import { Poppins } from 'next/font/google';
import Link from 'next/link';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500'] });

const Hero = () => {
  return (
    <section
      className="relative min-h-[70vh] 800px:min-h-[80vh] bg-no-repeat bg-cover bg-center flex-type-1"
      style={{
        backgroundImage:
          'url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)',
      }}
    >
      <div className="section w-[90%] 800px:w-[60%]">
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-bold capitalize">
          Best Collection for <br /> home Decoration
        </h1>
        <p className={`${poppins.className} mt-5 text-[#000000ba]`}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi iste
          architecto facilis veniam autem recusandae, laborum assumenda expedita
          corporis. Necessitatibus ipsa eum voluptatum fuga quod debitis
          temporibus unde iste nemo?
        </p>
        <Link href="/products" className="inline-block">
          <div className="btn mt-5">
            <span
              className={`${poppins.className} text-[#fff] text-[18px] font-[500]`}
            >
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
