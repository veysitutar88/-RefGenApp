import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const PORT = 5174;
const dataDir = path.resolve(process.cwd(), 'data');

app.use(cors());
app.use(express.json());

const readJson = async (file) => {
  const fullPath = path.join(dataDir, file);
  const contents = await fs.readFile(fullPath, 'utf-8');
  return JSON.parse(contents);
};

const writeJson = async (file, data) => {
  const fullPath = path.join(dataDir, file);
  await fs.writeFile(fullPath, JSON.stringify(data, null, 2));
};

const createId = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

const makeQcReport = (outputId) => {
  const approved = Math.random() > 0.35;
  return {
    qc_id: createId('qc'),
    output_id: outputId,
    overall_status: approved ? 'APPROVED' : 'REJECTED',
    flags: approved ? [] : ['lighting_inconsistent'],
    notes: approved ? 'QC passed.' : 'QC flagged lighting mismatch.'
  };
};

const makeExportManifest = (output, qcReport) => ({
  export_id: createId('export'),
  output_id: output.output_id,
  status: qcReport.overall_status === 'APPROVED' ? 'READY' : 'LOCKED',
  files: [
    {
      label: 'preview',
      path: `/exports/${output.output_id}/preview.png`
    },
    {
      label: 'metadata',
      path: `/exports/${output.output_id}/manifest.json`
    }
  ]
});

app.get('/api/characters', async (_req, res) => {
  const data = await readJson('characters.json');
  res.json(data);
});

app.post('/api/characters', async (req, res) => {
  const data = await readJson('characters.json');
  const now = new Date().toISOString();
  const character = {
    ...req.body,
    character_id: req.body.character_id || createId('char'),
    created_at: now,
    updated_at: now
  };
  data.unshift(character);
  await writeJson('characters.json', data);
  res.json(character);
});

app.get('/api/shots', async (_req, res) => {
  const data = await readJson('shots.json');
  res.json(data);
});

app.post('/api/shots', async (req, res) => {
  const data = await readJson('shots.json');
  const now = new Date().toISOString();
  const shot = {
    ...req.body,
    shot_id: req.body.shot_id || createId('shot'),
    created_at: now,
    updated_at: now
  };
  data.unshift(shot);
  await writeJson('shots.json', data);
  res.json(shot);
});

app.get('/api/outputs', async (_req, res) => {
  const data = await readJson('outputs.json');
  res.json(data);
});

app.get('/api/exports', async (_req, res) => {
  const data = await readJson('exports.json');
  res.json(data);
});

app.post('/api/run', async (req, res) => {
  const { identity_id, shot_id, generation_type = 'initial', parent_output_id = null, edit_prompt = null } = req.body;
  const outputs = await readJson('outputs.json');
  const exportsData = await readJson('exports.json');
  const outputId = createId('output');
  const now = new Date().toISOString();

  const qcReport = makeQcReport(outputId);

  const outputRecord = {
    output_id: outputId,
    identity_id,
    shot_id,
    generation_type,
    parent_output_id,
    status: qcReport.overall_status,
    qc_report_id: qcReport.qc_id,
    created_at: now,
    metadata: {
      model_key: 'gemini-3-pro',
      edit_prompt
    },
    qc_report: qcReport
  };

  const exportManifest = makeExportManifest(outputRecord, qcReport);

  outputs.unshift(outputRecord);
  exportsData.unshift(exportManifest);

  await writeJson('outputs.json', outputs);
  await writeJson('exports.json', exportsData);

  res.json({ output: outputRecord, qc_report: qcReport, export_manifest: exportManifest });
});

app.listen(PORT, () => {
  console.log(`RefGenTopApp API running on http://localhost:${PORT}`);
});
