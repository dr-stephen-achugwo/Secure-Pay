import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-2">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Payment Gateway. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Built with ❤️ by Naman Kumar Singh
        </p>
      </div>
    </footer>
  );
};

export default Footer;