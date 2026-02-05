import type { ExportManifest, IdentitySpec, OutputRecord, QCReport, ShotSpec } from '../types';

const apiFetch = async <T,>(path: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json() as Promise<T>;
};

export const fetchCharacters = () => apiFetch<IdentitySpec[]>('/api/characters');
export const fetchShots = () => apiFetch<ShotSpec[]>('/api/shots');
export const fetchOutputs = () => apiFetch<OutputRecord[]>('/api/outputs');
export const fetchExports = () => apiFetch<ExportManifest[]>('/api/exports');

export const createCharacter = (payload: Partial<IdentitySpec>) =>
  apiFetch<IdentitySpec>('/api/characters', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const createShot = (payload: Partial<ShotSpec>) =>
  apiFetch<ShotSpec>('/api/shots', {
    method: 'POST',
    body: JSON.stringify(payload)
  });

export const runPipeline = (payload: {
  identity_id: string;
  shot_id: string;
  generation_type?: 'initial' | 'regenerate' | 'edit_by_prompt';
  parent_output_id?: string | null;
  edit_prompt?: string | null;
}) =>
  apiFetch<{ output: OutputRecord; qc_report: QCReport; export_manifest: ExportManifest }>('/api/run', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
