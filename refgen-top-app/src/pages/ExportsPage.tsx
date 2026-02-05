import { useEffect, useState } from 'react';
import { fetchExports } from '../lib/api';
import type { ExportManifest } from '../types';
import { useSelection } from '../context/SelectionContext';
import '../styles/ui.css';

const ExportsPage = () => {
  const { setSelection } = useSelection();
  const [exportsData, setExportsData] = useState<ExportManifest[]>([]);

  useEffect(() => {
    fetchExports().then(setExportsData);
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <h2 className="page-title">Export View</h2>
          <p className="page-subtitle">Manifest viewer for approved outputs.</p>
        </div>
      </div>

      <div className="card-grid">
        {exportsData.map((manifest) => (
          <article
            key={manifest.export_id}
            className="card"
            onClick={() => setSelection({ title: `Export ${manifest.export_id}`, json: manifest })}
          >
            <h3>{manifest.output_id}</h3>
            <p className="page-subtitle">Status: {manifest.status}</p>
            <div className="manifest-list">
              {manifest.files.map((file) => (
                <div key={file.path} className="manifest-item">
                  <strong>{file.label}</strong>
                  <span>{file.path}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ExportsPage;
