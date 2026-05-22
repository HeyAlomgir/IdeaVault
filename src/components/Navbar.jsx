"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Button } from "@heroui/react";
import { FaBars, FaLightbulb, FaTimes } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathname = usePathname();

    const menuItems = [
        { label: "Home", path: "/" },
        { label: "Ideas", path: "/ideas" },
        { label: "Add Idea", path: "/add-idea" },
        { label: "My Ideas", path: "/my-ideas" },
        { label: "My Interactions", path: "/my-interactions" },
        { label: "My Profile", path: "/profile" },
    ];

    const { data: session } = authClient.useSession();

    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut({});
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">

            <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Left Side */}
                    <div className="flex items-center gap-3 lg:gap-8">

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-black dark:text-white"
                        >
                            {isMenuOpen ? (
                                <FaTimes size={22} />
                            ) : (
                                <FaBars size={22} />
                            )}
                        </button>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                        >
                            <div className="flex items-center justify-center bg-amber-100 border border-amber-200 rounded-xl p-2 shadow-sm transition-all duration-300 group-hover:scale-105">
                                <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 animate-pulse group-hover:rotate-12 transition-transform duration-300" />
                            </div>

                            <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-800 dark:text-white">
                                Idea
                                <span className="text-blue-600">
                                    Vault
                                </span>
                            </h1>
                        </Link>

                        {/* Desktop Menu */}
                        <ul className="hidden md:flex items-center gap-3 lg:gap-5">
                            {menuItems.map((item, index) => {
                                const isActive = pathname === item.path;

                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.path}
                                            className={`text-sm lg:text-[15px] font-semibold transition-colors duration-300 ${isActive
                                                    ? "text-blue-600"
                                                    : "text-slate-700 dark:text-slate-300 hover:text-blue-600"
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Auth Section */}
                        {user ? (
                            <div className="hidden sm:flex items-center gap-2 lg:gap-3">

                                <Avatar className="w-8 h-8 lg:w-9 lg:h-9">
                                    <Avatar.Image
                                        src={user?.image && user.image !== "" ? user.image : "https://pravatar.cc"}
                                        alt={user?.name}
                                    />
                                    <Avatar.Fallback>
                                        {user?.name?.charAt(0)}
                                    </Avatar.Fallback>
                                </Avatar>

                                <Button
                                    onClick={handleSignOut}
                                    color="danger"
                                    size="sm"
                                    className="rounded-md text-xs sm:text-sm"
                                >
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2 lg:gap-3">

                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors"
                                >
                                    Login
                                </Link>

                                <Link href="/signup">
                                    <Button
                                        size="sm"
                                        color="primary"
                                        className="text-xs sm:text-sm rounded-md"
                                    >
                                        SignUP
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile + Tablet Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen
                        ? "max-h-[700px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
            >
                <div className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 px-4 py-5 shadow-lg">

                    {/* Mobile Links */}
                    <ul className="flex flex-col gap-1">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.path;

                            return (
                                <li key={index}>
                                    <Link
                                        href={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
                                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                                                : "text-slate-700 dark:text-slate-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Divider */}
                    <div className="my-4 border-t border-zinc-200 dark:border-zinc-800"></div>

                    {/* Mobile Auth */}
                    {user ? (
                        <div className="flex items-center justify-between gap-3">

                            <div className="flex items-center gap-3">
                                <Avatar className="w-9 h-9">
                                    <Avatar.Image
                                        src={user?.image && user.image !== "" ? user.image : "https://pravatar.cc"}
                                        alt={user?.name}
                                    />
                                    <Avatar.Fallback>
                                        {user?.name?.charAt(0)}
                                    </Avatar.Fallback>
                                </Avatar>

                                <div>
                                    <p className="text-sm font-semibold text-black dark:text-white">
                                        {user?.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>

                            <Button
                                onClick={handleSignOut}
                                color="danger"
                                size="sm"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">

                            <Link href="/login">
                                <Button
                                    fullWidth
                                    variant="bordered"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link href="/signup">
                                <Button
                                    fullWidth
                                    color="primary"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
