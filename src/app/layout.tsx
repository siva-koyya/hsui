
import './globals.css'
import { DashboardHeader } from '@/components/Dashboard/DashboardHeader';
import ReduxProvider from '../pages/ReduxProvider';
import AdminDashboard from '@/components/Admin/AdminDashboard';


export const metadata = {
  title: 'My App',
  description: 'Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
        <AdminDashboard />
        <DashboardHeader />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
}
