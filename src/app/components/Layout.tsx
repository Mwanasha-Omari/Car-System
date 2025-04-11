'use client';
import Sidebar from '../Sidebar/page';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default Layout;
