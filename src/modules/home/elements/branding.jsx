import { partners } from "@/app/configs/constants";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const Branding = () => {
  return (
    <div className="border-t border-b border-[#000] py-10">
      <h3 className="uppercase text-xl md:text-2xl text-center max-w-3xl mx-auto font-[400] z-20 relative">
        CREATED BY NIGHT OWLS TEAM
      </h3>
      <div className="w-full text-center pt-1">
        <h3 className="uppercase bg-[#F091DD] rounded p-2 text-xl md:text-2xl text-center inline-block font-medium z-20 relative">
          NOW POWERING FOR &apos; TOP NEWSLETTERS
        </h3>
      </div>
      <Marquee className="w-full flex justify-around">
        {partners.map((i) => (
          <div key={i.url} className="mx-3 md:mx-8">
            <Image
              src={i.url}
              width={200}
              height={200}
              alt="partner"
              className="w-[150px] md:w-[180px]"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Branding;
