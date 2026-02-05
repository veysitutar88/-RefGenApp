import '../styles/ui.css';

const SettingsPage = () => (
  <section>
    <div className="page-header">
      <div>
        <h2 className="page-title">Settings</h2>
        <p className="page-subtitle">UISessionState and runtime preferences (stubbed).</p>
      </div>
    </div>
    <div className="card">
      <h3 className="section-title">Local Session</h3>
      <p className="page-subtitle">
        Persistence is stored in <code>refgen-top-app/data/*.json</code>. No authentication required.
      </p>
      <div className="form-grid">
        <div className="input-field">
          <label>Theme</label>
          <select defaultValue="dark">
            <option value="dark">Dark</option>
          </select>
        </div>
        <div className="input-field">
          <label>Model Mode</label>
          <select defaultValue="gemini-3-pro">
            <option value="gemini-3-pro">Gemini 3 Pro</option>
            <option value="gemini-3-flash">Gemini 3 Flash</option>
            <option value="gemini-3-nano">Gemini 3 Nano</option>
          </select>
        </div>
      </div>
    </div>
  </section>
);

export default SettingsPage;
