import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import Inspector from './Inspector';
import './Layout.css';

const navItems = [
  { label: 'Outputs', to: '/outputs' },
  { label: 'Characters', to: '/characters' },
  { label: 'Shots', to: '/shots' },
  { label: 'Run', to: '/run' },
  { label: 'Exports', to: '/exports' },
  { label: 'Settings', to: '/settings' }
];

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="app-shell">
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">RG</span>
        <div>
          <h1>RefGenTop</h1>
          <p>Creator Suite</p>
        </div>
      </div>
      <nav>
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className="nav-link">
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>Local mode</span>
        <div className="status-pill">Gemini 3</div>
      </div>
    </aside>
    <main className="workspace">{children}</main>
    <Inspector />
  </div>
);

export default Layout;
