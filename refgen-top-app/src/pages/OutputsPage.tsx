import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCharacters, fetchOutputs, fetchShots } from '../lib/api';
import type { IdentitySpec, OutputRecord, ShotSpec } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';
import './OutputsPage.css';

const OutputsPage = () => {
  const { setSelection } = useSelection();
  const [outputs, setOutputs] = useState<OutputRecord[]>([]);
  const [characters, setCharacters] = useState<IdentitySpec[]>([]);
  const [shots, setShots] = useState<ShotSpec[]>([]);
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    Promise.all([fetchOutputs(), fetchCharacters(), fetchShots()]).then(([outputsData, charactersData, shotsData]) => {
      setOutputs(outputsData);
      setCharacters(charactersData);
      setShots(shotsData);
    });
  }, []);

  const filteredOutputs = useMemo(() => {
    if (statusFilter === 'ALL') return outputs;
    return outputs.filter((output) => output.status === statusFilter);
  }, [outputs, statusFilter]);

  const resolveName = (id: string, list: Array<{ [key: string]: string }>, key: string) =>
    list.find((item) => item[key] === id)?.name || list.find((item) => item[key] === id)?.character_name || 'Unknown';

  return (
    <section>
      <div className="page-header">
        <div>
          <h2 className="page-title">Outputs Feed</h2>
          <p className="page-subtitle">Review runs, QC status, and lineage history.</p>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">All</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card-grid">
        {filteredOutputs.map((output) => (
          <article
            key={output.output_id}
            className="card output-card"
            onClick={() =>
              setSelection({
                title: `Output ${output.output_id}`,
                status: output.status,
                json: output
              })
            }
          >
            <div className="output-thumb">Preview</div>
            <div className="output-meta">
              <div>
                <h3>{resolveName(output.identity_id, characters, 'character_id')}</h3>
                <p>{resolveName(output.shot_id, shots, 'shot_id')}</p>
              </div>
              <span className={`badge ${output.status === 'APPROVED' ? 'approved' : 'rejected'}`}>
                {output.status}
              </span>
            </div>
            <div className="output-actions">
              <Link to={`/outputs/${output.output_id}`} className="secondary-button">
                Details
              </Link>
              <span className="output-timestamp">{new Date(output.created_at).toLocaleString()}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default OutputsPage;
