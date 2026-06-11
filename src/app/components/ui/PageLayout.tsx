import React from "react";
import { useLocation } from "react-router";
import { BottomNav } from "../shared/BottomNav";

interface PageLayoutProps {
  children: React.ReactNode;
  showBottomNav?: boolean;
  navActiveItem?: string;
  className?: string;
  fullWidth?: boolean;
  withTopBar?: boolean; // Accounts for a sticky top header
}

export function PageLayout({
  children,
  showBottomNav = false,
  navActiveItem,
  className = "",
  fullWidth = false,
  withTopBar = false
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-[#0A0A0A] w-full flex justify-center overflow-x-hidden ${className}`}>
      <div 
        className={`w-full bg-white dark:bg-black relative flex flex-col shadow-2xl overflow-x-hidden
          ${fullWidth ? 'max-w-none' : 'max-w-[480px] lg:max-w-[1200px] lg:px-8'} 
          ${withTopBar ? 'pt-14' : ''} 
          ${showBottomNav ? 'pb-24 lg:pb-8' : 'pb-8'}
        `}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex-1 w-full max-w-[1200px] mx-auto">
          {children}
        </div>
        {showBottomNav && (
          <div className="lg:hidden">
            <BottomNav active={navActiveItem || "home"} />
          </div>
        )}
      </div>
    </div>
  );
}
