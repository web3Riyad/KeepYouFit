

import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-4 my-8">
        <div className="flex w-full flex-row items-center justify-between">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </div>
      </footer>
    );
};

export default Footer;