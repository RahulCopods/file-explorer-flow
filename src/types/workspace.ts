export type FileType = 'folder' | 'workspace' | 'entity' | 'doc' | 'pdf' | 'sheet';

export interface WorkspaceItem {
  id: string;
  name: string;
  type: FileType;
  children?: WorkspaceItem[];
  size?: string;
  modified?: string;
  description?: string;
}

export interface ColumnState {
  items: WorkspaceItem[];
  selectedId?: string;
  path: string[];
}