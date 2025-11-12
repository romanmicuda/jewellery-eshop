'use client'

import { AppSidebar } from "@/components/AppSideBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardProvider } from "../contexts/DashboardContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <DashboardProvider>
          <Header />
          {children}
          <Footer />
        </DashboardProvider>
      </div>
  );
}
