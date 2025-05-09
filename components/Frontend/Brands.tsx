import React from "react";

export type SingleImageProps = {
  href: string;
  imgSrc: string;
  Alt: string;
};
const Brands = () => {
  return (
    <>
      <section className="bg-slate-100 text-slate-800 py-10  lg:py-[60px]">
        <h2 className="text-center pb-6 scroll-m-20 text-2xl font-semibold tracking-tight">
          Aseguradoras
        </h2>
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="flex flex-wrap items-center justify-center">
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://avocadobytes.com/tele/bbva.png"
                />
                <SingleImage
                  href="#"
                  Alt="Brand Image"
                  imgSrc="https://avocadobytes.com/tele/oceanica.png"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;

const SingleImage = ({ href, imgSrc, Alt }: SingleImageProps) => {
  return (
    <>
      <a
        href={href}
        className="mx-4 flex w-[150px] items-center justify-center  2xl:w-[180px]"
      >
        <img src={imgSrc} alt={Alt} className="w-full h-10" />
      </a>
    </>
  );
};
