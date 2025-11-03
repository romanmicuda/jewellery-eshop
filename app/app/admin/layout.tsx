'use client'

import { AppSidebar } from "@/components/AppSideBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminProvider } from "../contexts/AdminContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <AdminProvider>
          <Header />
          {children}
          <Footer />
        </AdminProvider>
      </div>
  );
}
