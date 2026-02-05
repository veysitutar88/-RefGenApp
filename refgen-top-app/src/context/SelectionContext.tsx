import { createContext, useContext, useState } from 'react';

export type SelectionPayload = {
  title: string;
  status?: string;
  json: object | null;
  actions?: Array<{ label: string; onClick: () => void; disabled?: boolean; tooltip?: string }>;
};

const SelectionContext = createContext<{
  selection: SelectionPayload;
  setSelection: (payload: SelectionPayload) => void;
} | null>(null);

export const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [selection, setSelection] = useState<SelectionPayload>({
    title: 'Inspector',
    json: null
  });

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error('useSelection must be used within SelectionProvider');
  }
  return context;
};
