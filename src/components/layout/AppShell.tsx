import { Outlet } from 'react-router-dom';
import { SideMenu, BottomNav } from './Navigation';
import { TopBar } from './TopBar';

export function AppShell() {
  return (
    <div className="flex h-screen bg-background">
      <SideMenu />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="mx-auto max-w-5xl p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
