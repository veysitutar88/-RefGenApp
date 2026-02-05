import { useSelection } from '../context/SelectionContext';
import './Inspector.css';

const Inspector = () => {
  const { selection } = useSelection();

  return (
    <aside className="inspector">
      <header>
        <h2>{selection.title}</h2>
        {selection.status && <span className="status-tag">{selection.status}</span>}
      </header>
      {selection.actions && selection.actions.length > 0 && (
        <div className="inspector-actions">
          {selection.actions.map((action) => (
            <button
              key={action.label}
              className="ghost-button"
              onClick={action.onClick}
              disabled={action.disabled}
              title={action.tooltip}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
      <div className="json-panel">
        {selection.json ? (
          <pre>{JSON.stringify(selection.json, null, 2)}</pre>
        ) : (
          <p>Select an item to inspect JSON.</p>
        )}
      </div>
    </aside>
  );
};

export default Inspector;
