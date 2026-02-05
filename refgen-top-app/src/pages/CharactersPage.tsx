import { useEffect, useMemo, useState } from 'react';
import { createCharacter, fetchCharacters } from '../lib/api';
import type { IdentitySpec } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';
import './FormPage.css';

const defaultForm: Partial<IdentitySpec> = {
  character_name: '',
  model_key: 'gemini-3-pro',
  identity_notes: '',
  reference_images: []
};

const CharactersPage = () => {
  const { setSelection } = useSelection();
  const [characters, setCharacters] = useState<IdentitySpec[]>([]);
  const [formData, setFormData] = useState<Partial<IdentitySpec>>(defaultForm);
  const [jsonMode, setJsonMode] = useState(false);
  const [jsonDraft, setJsonDraft] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCharacters().then(setCharacters);
  }, []);

  useEffect(() => {
    setJsonDraft(JSON.stringify(formData, null, 2));
  }, [formData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      const payload = jsonMode ? JSON.parse(jsonDraft) : formData;
      if (!payload.character_name || !payload.model_key || !payload.identity_notes) {
        setError('Required fields: character name, model key, identity notes.');
        return;
      }
      const created = await createCharacter(payload);
      setCharacters((prev) => [created, ...prev]);
      setFormData(defaultForm);
      setSelection({ title: `Character ${created.character_name}`, json: created });
    } catch (err) {
      setError('Invalid JSON or server error.');
    }
  };

  const referencePreview = useMemo(() => {
    return (formData.reference_images || []).filter(Boolean);
  }, [formData.reference_images]);

  return (
    <section className="form-page">
      <div className="page-header">
        <div>
          <h2 className="page-title">Character Library</h2>
          <p className="page-subtitle">Define identity-only constraints and reference sets.</p>
        </div>
        <label className="json-toggle">
          <input type="checkbox" checked={jsonMode} onChange={() => setJsonMode((prev) => !prev)} />
          JSON editor
        </label>
      </div>

      <div className="content-grid">
        <div className="card">
          <h3 className="section-title">New Character</h3>
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
                  <label>Character Name</label>
                  <input
                    value={formData.character_name || ''}
                    onChange={(event) => setFormData({ ...formData, character_name: event.target.value })}
                    placeholder="Nova"
                  />
                </div>
                <div className="input-field">
                  <label>Model Key</label>
                  <select
                    value={formData.model_key || ''}
                    onChange={(event) => setFormData({ ...formData, model_key: event.target.value })}
                  >
                    <option value="gemini-3-pro">Gemini 3 Pro</option>
                    <option value="gemini-3-flash">Gemini 3 Flash</option>
                    <option value="gemini-3-nano">Gemini 3 Nano</option>
                  </select>
                </div>
                <div className="input-field">
                  <label>Identity Notes</label>
                  <textarea
                    rows={4}
                    value={formData.identity_notes || ''}
                    onChange={(event) => setFormData({ ...formData, identity_notes: event.target.value })}
                    placeholder="Identity-only constraints..."
                  />
                </div>
                <div className="input-field">
                  <label>Reference Images (comma separated paths)</label>
                  <textarea
                    rows={3}
                    value={(formData.reference_images || []).join(', ')}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        reference_images: event.target.value
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean)
                      })
                    }
                  />
                </div>
              </div>
            )}
            {error && <p className="error-text">{error}</p>}
            <button type="submit" className="primary-button">
              Save Character
            </button>
          </form>
          {referencePreview.length > 0 && (
            <div className="ref-tiles">
              {referencePreview.map((path) => (
                <div key={path} className="ref-tile">
                  <span>{path}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3 className="section-title">Saved Characters</h3>
          <div className="list-stack">
            {characters.map((character) => (
              <button
                key={character.character_id}
                type="button"
                className="list-item"
                onClick={() =>
                  setSelection({
                    title: `Character ${character.character_name}`,
                    json: character
                  })
                }
              >
                <div>
                  <strong>{character.character_name}</strong>
                  <p>{character.model_key}</p>
                </div>
                <span className="badge">{character.reference_images?.length ?? 0} refs</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharactersPage;
