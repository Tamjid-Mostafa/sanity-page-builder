"use client";

import React, { createContext, useContext, ReactNode } from "react";

interface NavbarContextType {
  isAtTop: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({
  children,
  isAtTop,
}: {
  children: ReactNode;
  isAtTop: boolean;
}) => {
  return (
    <NavbarContext.Provider value={{ isAtTop }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
};
