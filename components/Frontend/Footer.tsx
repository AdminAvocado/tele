"use client";
import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import React from "react";

export default function Footer() {
  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: "/join/doctors",
          name: "List your Service",
        },
        {
          href: "/onboarding/resume",
          name: "Resume your Application",
        },
        {
          href: "javascript:void()",
          name: "Team",
        },
        {
          href: "javascript:void()",
          name: "Careers",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: "javascript:void()",
          name: "contact",
        },
        {
          href: "javascript:void()",
          name: "Support",
        },
        {
          href: "javascript:void()",
          name: "Docs",
        },
        {
          href: "javascript:void()",
          name: "Pricing",
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: "javascript:void()",
          name: "Terms",
        },
        {
          href: "javascript:void()",
          name: "License",
        },
        {
          href: "javascript:void()",
          name: "Privacy",
        },
        {
          href: "javascript:void()",
          name: "About US",
        },
      ],
    },
  ];

  const socialLinks = [
    {
      title: "Linkedin",
      href: "https://www.linkedin.com/",
      icon: Linkedin,
      color: "text-blue-600",
    },
    {
      title: "Youtube",
      href: "https://www.youtube.com/",
      icon: Youtube,
      color: "text-red-600",
    },
  ];

  return (
    <footer className="text-gray-500 bg-white dark:bg-slate-950 px-4 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; {new Date().getFullYear()} Avocado Bytes
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={i}
                  className="w-10 h-10 border rounded-full flex items-center justify-center"
                >
                  <a href={item.href} className={item.color}>
                    <Icon className="w-6 h-6" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
