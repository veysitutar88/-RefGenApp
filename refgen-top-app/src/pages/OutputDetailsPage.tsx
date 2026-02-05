import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCharacters, fetchExports, fetchOutputs, fetchShots, runPipeline } from '../lib/api';
import type { ExportManifest, IdentitySpec, OutputRecord, ShotSpec } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';
import './OutputDetailsPage.css';

const OutputDetailsPage = () => {
  const { outputId } = useParams();
  const { setSelection } = useSelection();
  const [outputs, setOutputs] = useState<OutputRecord[]>([]);
  const [characters, setCharacters] = useState<IdentitySpec[]>([]);
  const [shots, setShots] = useState<ShotSpec[]>([]);
  const [exportsData, setExportsData] = useState<ExportManifest[]>([]);
  const [editPrompt, setEditPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([fetchOutputs(), fetchCharacters(), fetchShots(), fetchExports()]).then(
      ([outputsData, charactersData, shotsData, exportsList]) => {
        setOutputs(outputsData);
        setCharacters(charactersData);
        setShots(shotsData);
        setExportsData(exportsList);
      }
    );
  }, []);

  const output = useMemo(() => outputs.find((item) => item.output_id === outputId), [outputs, outputId]);

  useEffect(() => {
    if (output) {
      setSelection({
        title: `Output ${output.output_id}`,
        status: output.status,
        json: output,
        actions: [
          {
            label: 'Regenerate',
            onClick: () => handleRegenerate('regenerate')
          },
          {
            label: 'Edit by Prompt',
            onClick: () => handleRegenerate('edit_by_prompt')
          },
          {
            label: 'Export',
            onClick: () => {},
            disabled: output.status !== 'APPROVED',
            tooltip: output.status !== 'APPROVED' ? 'QC not passed — export locked' : 'Export enabled'
          }
        ]
      });
    }
  }, [output]);

  const resolveName = (id: string, list: Array<{ [key: string]: string }>, key: string) =>
    list.find((item) => item[key] === id)?.name || list.find((item) => item[key] === id)?.character_name || 'Unknown';

  const exportManifest = useMemo(
    () => exportsData.find((manifest) => manifest.output_id === output?.output_id),
    [exportsData, output]
  );

  const handleRegenerate = async (mode: 'regenerate' | 'edit_by_prompt') => {
    if (!output) return;
    if (mode === 'edit_by_prompt' && !editPrompt.trim()) {
      return;
    }
    setLoading(true);
    try {
      const response = await runPipeline({
        identity_id: output.identity_id,
        shot_id: output.shot_id,
        generation_type: mode,
        parent_output_id: output.output_id,
        edit_prompt: mode === 'edit_by_prompt' ? editPrompt : null
      });
      setOutputs((prev) => [response.output, ...prev]);
      setExportsData((prev) => [response.export_manifest, ...prev]);
    } finally {
      setLoading(false);
    }
  };

  if (!output) {
    return (
      <section>
        <h2 className="page-title">Output Details</h2>
        <p>Loading output...</p>
      </section>
    );
  }

  return (
    <section className="output-details">
      <div className="page-header">
        <div>
          <h2 className="page-title">Output Details</h2>
          <p className="page-subtitle">QC summary, lineage, and post-gen actions.</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="card">
          <div className="details-header">
            <div>
              <h3>{resolveName(output.identity_id, characters, 'character_id')}</h3>
              <p>{resolveName(output.shot_id, shots, 'shot_id')}</p>
            </div>
            <span className={`badge ${output.status === 'APPROVED' ? 'approved' : 'rejected'}`}>
              {output.status}
            </span>
          </div>
          <div className="lineage">
            <p>Output ID: {output.output_id}</p>
            <p>Parent: {output.parent_output_id ?? 'None'}</p>
            <p>Generation: {output.generation_type}</p>
          </div>
          <div className="qc-summary">
            <h4>QC Summary</h4>
            <p>{output.qc_report?.notes ?? 'QC report available in inspector.'}</p>
            {output.qc_report?.flags?.length ? (
              <ul>
                {output.qc_report.flags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            ) : (
              <p>No QC flags.</p>
            )}
          </div>
        </div>
        <div className="card">
          <h3 className="section-title">Post-gen Actions</h3>
          <div className="action-stack">
            <button className="secondary-button" onClick={() => handleRegenerate('regenerate')} disabled={loading}>
              Regenerate
            </button>
            <div className="input-field">
              <label>Edit by Prompt</label>
              <textarea
                rows={3}
                value={editPrompt}
                onChange={(event) => setEditPrompt(event.target.value)}
                placeholder="Refine lighting..."
              />
              <button
                className="secondary-button"
                onClick={() => handleRegenerate('edit_by_prompt')}
                disabled={loading || !editPrompt.trim()}
              >
                Run Edit
              </button>
            </div>
            <button className="secondary-button" disabled={output.status !== 'APPROVED'} title="QC not passed — export locked">
              Export
            </button>
          </div>
        </div>
        <div className="card">
          <h3 className="section-title">Export Manifest</h3>
          {exportManifest ? (
            <div className="manifest-list">
              {exportManifest.files.map((file) => (
                <div key={file.path} className="manifest-item">
                  <strong>{file.label}</strong>
                  <span>{file.path}</span>
                </div>
              ))}
            </div>
          ) : (
            <p>No manifest yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OutputDetailsPage;
