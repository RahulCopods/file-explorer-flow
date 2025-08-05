import React from 'react';
import { 
  Folder, 
  FileText, 
  Sheet, 
  Building2, 
  Database,
  ChevronRight 
} from 'lucide-react';
import { WorkspaceItem, FileType } from '@/types/workspace';
import { cn } from '@/lib/utils';

interface FileItemProps {
  item: WorkspaceItem;
  isSelected: boolean;
  onClick: () => void;
}

const getFileIcon = (type: FileType) => {
  switch (type) {
    case 'folder':
      return Folder;
    case 'workspace':
      return Building2;
    case 'entity':
      return Database;
    case 'doc':
      return FileText;
    case 'pdf':
      return FileText;
    case 'sheet':
      return Sheet;
    default:
      return FileText;
  }
};

const getFileTypeColor = (type: FileType) => {
  switch (type) {
    case 'folder':
      return 'text-blue-600';
    case 'workspace':
      return 'text-purple-600';
    case 'entity':
      return 'text-green-600';
    case 'doc':
      return 'text-blue-500';
    case 'pdf':
      return 'text-red-500';
    case 'sheet':
      return 'text-emerald-500';
    default:
      return 'text-muted-foreground';
  }
};

const canExpand = (type: FileType) => {
  return ['folder', 'workspace', 'entity'].includes(type);
};

export const FileItem: React.FC<FileItemProps> = ({ item, isSelected, onClick }) => {
  const Icon = getFileIcon(item.type);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2 cursor-pointer rounded-md mx-2',
        'hover:bg-workspace-hover transition-colors duration-150',
        'group relative',
        isSelected && 'bg-workspace-selected'
      )}
      onClick={onClick}
    >
      <Icon 
        className={cn('h-4 w-4 flex-shrink-0', getFileTypeColor(item.type))} 
      />
      
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground truncate">
          {item.name}
        </div>
        {item.modified && (
          <div className="text-xs text-muted-foreground">
            {item.modified}
          </div>
        )}
      </div>

      {canExpand(item.type) && hasChildren && (
        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      )}

      {item.size && (
        <div className="text-xs text-muted-foreground flex-shrink-0">
          {item.size}
        </div>
      )}
    </div>
  );
};