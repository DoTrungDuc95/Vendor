import { brandingData, categoriesData } from '@/static-data';
import { useRouter } from 'next/router';

const Categories = () => {
  const router = useRouter();
  return (
    <section>
      <div className="session hidden sm:block">
        <div className="grid grid-cols-2 gap-6 800px:gap-2 800px:grid-cols-4 1000px:gap-0 my-12 p-5 bg-white rounded-md shadow-lg">
          {brandingData.map((brand) => (
            <div key={brand.id} className="flex items-start">
              <img src={brand.icon} className="w-[36px]" />
              <div className="px-3">
                <label className="font-bold text-sm md:text-base">
                  {brand.title}
                </label>
                <p className="text-xs md:text-sm">{brand.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section bg-white p-6 my-12 rounded-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-[20px] xl:grid-cols-4 xl:gap-[30px]">
          {categoriesData.map((category) => (
            <article
              key={category.id}
              onClick={() =>
                router.push(`/products?categoty=${category.title}`)
              }
              className="h-[100px] border p-4 border-solid border-[#ccc] flex-type-1 justify-between rounded-md cursor-pointer overflow-hidden"
            >
              <label
                className={`sm:text-[18px] leading-[1.3] capitalize font-bold cursor-pointer`}
              >
                {category.title}
              </label>
              <img
                src={category.image_Url}
                className="w-[100px] sm:w-[120px] object-cover"
                alt=""
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
