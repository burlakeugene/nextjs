import Dashboard from '@/providers/Dashboard';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Dashboard>{children}</Dashboard>
);

export default Layout;
