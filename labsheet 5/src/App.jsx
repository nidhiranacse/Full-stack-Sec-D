import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import MultiStepWizard from './components/wizard/MultiStepWizard';

function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'wizard'

  return (
    <div className="lab-app-container">
      {/* Top Header */}
      <header className="lab-header">
        <span className="badge-tag">React.js Syllabus Module</span>
        <h1>Lab Sheet 05: Form Validation Architecture & Controlled Inputs</h1>
        <p>
          Controlled component state pipelines, dynamic regex security filters, interactive badges,
          and multi-step wizard state encapsulation.
        </p>

        {/* Tab Navigator */}
        <div className="tab-switcher">
          <button
            onClick={() => setActiveTab('login')}
            className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
          >
            <span>🔐 Task 5.1 & 5.2: Controlled Login & Password Strength</span>
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`tab-btn ${activeTab === 'wizard' ? 'active' : ''}`}
          >
            <span>🧙 Task 5.3: Multi-Step Onboarding Wizard</span>
          </button>
        </div>
      </header>

      {/* Main View Container */}
      <main className="lab-main-view">
        {activeTab === 'login' ? <LoginForm /> : <MultiStepWizard />}
      </main>

      {/* Footer */}
      <footer className="lab-footer">
        <p>Lab Sheet 05 Implementation • React 18 & Vite • Controlled Component Architecture</p>
      </footer>
    </div>
  );
}

export default App;
