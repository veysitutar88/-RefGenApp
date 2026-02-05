export type IdentitySpec = {
  character_id: string;
  character_name: string;
  model_key: string;
  identity_notes: string;
  reference_images: string[];
  created_at?: string;
  updated_at?: string;
};

export type ShotSpec = {
  shot_id: string;
  name: string;
  scene: string;
  camera: string;
  lighting: string;
  pose: string;
  created_at?: string;
  updated_at?: string;
};

export type QCReport = {
  qc_id: string;
  output_id: string;
  overall_status: 'APPROVED' | 'REJECTED';
  flags: string[];
  notes: string;
};

export type OutputRecord = {
  output_id: string;
  identity_id: string;
  shot_id: string;
  generation_type: 'initial' | 'regenerate' | 'edit_by_prompt';
  parent_output_id: string | null;
  status: QCReport['overall_status'];
  qc_report_id: string;
  created_at: string;
  metadata: {
    model_key: string;
    edit_prompt?: string | null;
  };
  qc_report?: QCReport;
};

export type ExportManifest = {
  export_id: string;
  output_id: string;
  status: 'READY' | 'LOCKED';
  files: Array<{ label: string; path: string }>;
};

export type UISessionState = {
  selected_identity_id?: string;
  selected_shot_id?: string;
  selected_output_id?: string;
};
