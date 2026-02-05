import { useEffect, useState } from 'react';
import { fetchCharacters, fetchShots, runPipeline } from '../lib/api';
import type { IdentitySpec, OutputRecord, ShotSpec } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';
import './RunPage.css';

const RunPage = () => {
  const { setSelection } = useSelection();
  const [characters, setCharacters] = useState<IdentitySpec[]>([]);
  const [shots, setShots] = useState<ShotSpec[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState('');
  const [selectedShot, setSelectedShot] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [latestOutput, setLatestOutput] = useState<OutputRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchCharacters(), fetchShots()]).then(([charactersData, shotsData]) => {
      setCharacters(charactersData);
      setShots(shotsData);
      if (charactersData[0]) setSelectedCharacter(charactersData[0].character_id);
      if (shotsData[0]) setSelectedShot(shotsData[0].shot_id);
    });
  }, []);

  const handleRun = async () => {
    if (!selectedCharacter || !selectedShot) return;
    setLoading(true);
    setLogs(['Initializing pipeline…', 'Loading IdentitySpec + ShotSpec…']);
    try {
      const response = await runPipeline({
        identity_id: selectedCharacter,
        shot_id: selectedShot,
        generation_type: 'initial'
      });
      setLogs((prev) => [...prev, 'Generation stub complete.', `QC: ${response.qc_report.overall_status}`]);
      setLatestOutput(response.output);
      setSelection({
        title: `Output ${response.output.output_id}`,
        status: response.output.status,
        json: response.output
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="run-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Run Pipeline</h2>
          <p className="page-subtitle">Compose Identity + Shot and launch generation stub.</p>
        </div>
        <button className="primary-button" onClick={handleRun} disabled={loading}>
          {loading ? 'Running…' : 'Run'}
        </button>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3 className="section-title">Inputs</h3>
          <div className="form-grid">
            <div className="input-field">
              <label>Identity</label>
              <select value={selectedCharacter} onChange={(event) => setSelectedCharacter(event.target.value)}>
                {characters.map((character) => (
                  <option key={character.character_id} value={character.character_id}>
                    {character.character_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-field">
              <label>Shot</label>
              <select value={selectedShot} onChange={(event) => setSelectedShot(event.target.value)}>
                {shots.map((shot) => (
                  <option key={shot.shot_id} value={shot.shot_id}>
                    {shot.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="input-summary">
            <p>Generation type: <strong>initial</strong></p>
            <p>Post-gen actions locked until output is generated.</p>
          </div>
        </div>
        <div className="card">
          <h3 className="section-title">Pipeline Log</h3>
          <div className="log-panel">
            {logs.length === 0 ? <p>No run yet.</p> : logs.map((line, index) => <div key={index}>{line}</div>)}
          </div>
          {latestOutput && (
            <div className="latest-output">
              <h4>Latest Output</h4>
              <div className="latest-meta">
                <span>{latestOutput.output_id}</span>
                <span className={`badge ${latestOutput.status === 'APPROVED' ? 'approved' : 'rejected'}`}>
                  {latestOutput.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RunPage;
