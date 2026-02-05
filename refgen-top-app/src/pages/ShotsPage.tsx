import { useEffect, useMemo, useState } from 'react';
import { createShot, fetchShots } from '../lib/api';
import type { ShotSpec } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';
import './FormPage.css';

const presets = {
  scene: ['Futuristic city rooftop', 'Neon archive vault', 'Minimal studio'],
  camera: ['35mm, eye level', '50mm, low angle', '85mm, portrait close-up'],
  lighting: ['Soft key + rim', 'Neon rim light', 'Studio gradient'],
  pose: ['Standing, calm', 'Leaning, focused', 'Seated, reflective']
};

const defaultForm: Partial<ShotSpec> = {
  name: '',
  scene: '',
  camera: '',
  lighting: '',
  pose: ''
};

const ShotsPage = () => {
  const { setSelection } = useSelection();
  const [shots, setShots] = useState<ShotSpec[]>([]);
  const [formData, setFormData] = useState<Partial<ShotSpec>>(defaultForm);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonDraft, setJsonDraft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchShots().then(setShots);
  }, []);

  useEffect(() => {
    setJsonDraft(JSON.stringify(formData, null, 2));
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const payload = jsonMode ? JSON.parse(jsonDraft) : formData;
      if (!payload.name || !payload.scene || !payload.camera || !payload.lighting || !payload.pose) {
        setError('All shot fields are required.');
        return;
      }
      const created = await createShot(payload);
      setShots((prev) => [created, ...prev]);
      setFormData(defaultForm);
      setSelection({ title: `Shot ${created.name}`, json: created });
    } catch (err) {
      setError('Invalid JSON or server error.');
    }
  };

  const applyPreset = (field: keyof ShotSpec, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const availablePresets = useMemo(() => presets, []);

  return (
    <section className="form-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Shot Library</h2>
          <p className="page-subtitle">Compose scenes, camera, lighting, and pose presets.</p>
        </div>
        <label className="json-toggle">
          <input type="checkbox" checked={jsonMode} onChange={() => setJsonMode((prev) => !prev)} />
          JSON editor
        </label>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3 className="section-title">New Shot</h3>
          <form onSubmit={handleSubmit} className="form-stack">
            {jsonMode ? (
              <textarea
                rows={14}
                value={jsonDraft}
                onChange={(event) => setJsonDraft(event.target.value)}
              />
            ) : (
              <div className="form-grid">
                <div className="input-field">
                  <label>Shot Name</label>
                  <input
                    value={formData.name || ''}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  />
                </div>
                {(['scene', 'camera', 'lighting', 'pose'] as Array<keyof ShotSpec>).map((field) => (
                  <div className="input-field" key={field}>
                    <label>{field}</label>
                    <textarea
                      rows={3}
                      value={(formData as ShotSpec)[field] || ''}
                      onChange={(event) => setFormData({ ...formData, [field]: event.target.value })}
                    />
                    <div className="preset-row">
                      {availablePresets[field].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          className="preset-pill"
                          onClick={() => applyPreset(field, preset)}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="primary-button">
              Save Shot
            </button>
          </form>
        </div>
        <div className="card">
          <h3 className="section-title">Saved Shots</h3>
          <div className="list-stack">
            {shots.map((shot) => (
              <button
                key={shot.shot_id}
                type="button"
                className="list-item"
                onClick={() =>
                  setSelection({
                    title: `Shot ${shot.name}`,
                    json: shot
                  })
                }
              >
                <div>
                  <strong>{shot.name}</strong>
                  <p>{shot.scene}</p>
                </div>
                <span className="badge">{shot.camera}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShotsPage;
