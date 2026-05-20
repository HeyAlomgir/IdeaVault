"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react"; // অকারণ Menu ইমপোর্ট বাদ দেওয়া হয়েছে
import { FaBars, FaLightbulb, FaSun, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Ideas", path: "/ideas" },
        { label: "Add Idea", path: "/add-idea" },
        { label: "My Ideas", path: "/my-ideas" },
        { label: "My Interactions", path: "/my-interactions" },
    ];

    return (
        <nav className="w-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md text-foreground border-b border-default-200/50 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-foreground p-1 focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2 group cursor-pointer select-none">
                        <div className="flex items-center justify-center bg-amber-100 p-2 rounded-xl border border-amber-100 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-amber-200">
                            <FaLightbulb className="w-5 h-5 text-amber-500 animate-pulse transition-transform duration-300 group-hover:rotate-12" />
                        </div>
                        <span className="font-black text-xl  tracking-tight text-slate-800 transition-colors duration-200 group-hover:text-blue-600">
                            Idea<span className="text-blue-600 font-extrabold">Vault</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop View Menu */}
                <ul className="hidden md:flex gap-6 items-center md:ml-1">
                    {menuItems.map((item, index) => {
                        const isActive = pathname === item.path;
                        return (
                            <li key={index}>
                                <Link
                                    href={item.path}
                                    className={`text-sm font-bold transition-colors  ${isActive
                                            ? "text-blue-600 font-extrabold"
                                            : "text-slate-600 hover:text-blue-600"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side Buttons */}
                <div className="flex items-center gap-2">
                    <Button isIconOnly variant="light" size="sm">
                        <FaSun size={20} />
                    </Button>

                    <Button as={Link} href="/login" color="primary" variant="flat" size="sm" className="font-semibold">
                        Login
                    </Button>

                    <Button as={Link} href="/register" color="primary" variant="solid" size="sm" className="font-semibold hidden sm:flex">
                        Register
                    </Button>
                </div>
            </div>

            {/* Mobile View Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-default-200 absolute top-16 left-0 w-full px-6 py-4 flex flex-col gap-3 shadow-lg z-40">
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        className={`w-full block text-base py-2 font-semibold ${isActive
                                                ? "text-blue-600 font-bold"
                                                : "text-slate-700"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="pt-2 border-t border-default-100 sm:hidden">
                        <Button as={Link} href="/register" color="primary" variant="bordered" className="w-full" onClick={() => setIsMenuOpen(false)}>
                            Register
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
