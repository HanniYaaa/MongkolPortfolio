'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/50 border-b border-neutral-800">
      <div className="max-w-full mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Logo (ฝั่งซ้าย) - แก้ให้คลิกได้เพื่อกลับไปบนสุด */}
        <Link href="#home" className="text-2xl font-bold text-white tracking-tighter cursor-pointer hover:opacity-80 transition-opacity">
          Portfolio<span className="text-teal-400">.</span>
        </Link>

        {/* Menu Links (ฝั่งขวา) */}
        <div className="hidden md:flex items-center gap-10">
          {/* เปลี่ยนจาก PROJECT เป็น WORK เพื่อให้ตรงกับ id="work" ใน page.tsx */}
          {['HOME', 'ABOUT', 'SKILLS', 'PROJECT', 'CONTACT'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-bold tracking-widest text-neutral-400 hover:text-teal-400 transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;