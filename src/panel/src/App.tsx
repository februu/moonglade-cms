
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard.tsx';
import Content from './components/Content.tsx';
import Documentation from './components/Documentation.tsx';
import Settings from './components/Settings.tsx';
import Site from './components/Site.tsx';
import Media from './components/Media.tsx';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="h-screen w-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      { activeSection === 'dashboard' && <Dashboard /> }
      { activeSection === 'site' && <Site /> }
      { activeSection === 'content' && <Content /> }
      { activeSection === 'media' && <Media /> }
      { activeSection === 'documentation' && <Documentation /> }
      { activeSection === 'settings' && <Settings /> }
      
    </div>
  )
}

export default App
