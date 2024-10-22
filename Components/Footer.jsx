import { assets } from "@/Assets/assets";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center">
      <Image src={assets.logo_light} alt="Logo" width={130} />
      <p className="text-white text-sm">
        &copy; {new Date().getFullYear()} Articular. All rights reserved.
      </p>
      <div className="flex">
        <Image src={assets.facebook_icon} alt="Facebook" width={40} />
        <Image src={assets.twitter_icon} alt="Twitter" width={40} />
        <Image src={assets.googleplus_icon} alt="Google Plus" width={40} />
      </div>
    </div>
  );
};

export default Footer;
