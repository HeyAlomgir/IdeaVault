"use client";
import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="w-full bg-[#020617] text-gray-400 border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* title ideavault */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-xl">💡</span>
                        <span className="font-black text-xl tracking-tight">Idea<span className="text-blue-500">Vault</span></span>
                    </div>
                    <p className="text-xs leading-relaxed max-w-xs">
                        The ultimate single-page web platform where creators share, discover, and validate innovative startup ideas collectively.
                    </p>
                </div>

                {/* platform */}
                <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
                    <ul className="flex flex-col gap-2.5 text-xs">
                        <li><Link href="/" className="hover:text-blue-500 transition-colors">Home</Link></li>
                        <li><Link href="/ideas" className="hover:text-blue-500 transition-colors">Ideas</Link></li>
                        <li><Link href="/add-idea" className="hover:text-blue-500 transition-colors">Add Idea</Link></li>
                        <li><Link href="/my-ideas" className="hover:text-blue-500 transition-colors">My Ideas</Link></li>
                        <li><Link href="/my-interactions" className="hover:text-blue-500 transition-colors">My Interactions</Link></li>
                    </ul>
                </div>
                {/* Contact Info */}
                <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
                    <ul className="flex flex-col gap-2.5 text-xs">
                        <li>Email: alomgirhosssain71@gmail.com</li>
                        <li>Phone: +880 1756135199</li>
                        <li>Address: Mymensignh, Bangladesh</li>
                    </ul>
                </div>

                {/*Social Links */}
                <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Follow Us</h4>
                    <div className="flex items-center gap-4 text-lg">
                        <a href="https://x.com" className="hover:text-white">
                            <FaXTwitter />
                        </a>
                        <a href="https://www.facebook.com/alomgir.hossain.938369"  className="hover:text-blue-500">
                            <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/in/alomgir-hossain-web/"  className="hover:text-blue-500">
                            <FaLinkedin />
                        </a>
                        <a href="https://github.com/HeyAlomgir" className="hover:text-white">
                            <FaGithub />
                        </a>
                    </div>
                </div>

            </div>

            {/* copy*/}
            <div className="w-full border-t border-gray-800/60 py-4 bg-[#01040f]">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-[11px] gap-2">
                    <p>&copy; 2026 IdeaVault Platform. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:underline">Privacy Policy</Link>
                        <Link href="#" className="hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
