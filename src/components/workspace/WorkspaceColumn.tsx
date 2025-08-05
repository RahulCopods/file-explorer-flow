import React from 'react';
import { WorkspaceItem } from '@/types/workspace';
import { FileItem } from './FileItem';
import { cn } from '@/lib/utils';

interface WorkspaceColumnProps {
  items: WorkspaceItem[];
  selectedId?: string;
  onItemClick: (item: WorkspaceItem) => void;
  title?: string;
}

export const WorkspaceColumn: React.FC<WorkspaceColumnProps> = ({
  items,
  selectedId,
  onItemClick,
  title
}) => {
  return (
    <div className={cn(
      'flex flex-col bg-workspace-column border-r border-workspace-border h-full',
      'overflow-hidden'
    )}>
      {title && (
        <div className="px-4 py-3 border-b border-workspace-border bg-muted/30">
          <h3 className="text-sm font-semibold text-foreground truncate">
            {title}
          </h3>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto py-2">
        {items.map((item) => (
          <FileItem
            key={item.id}
            item={item}
            isSelected={selectedId === item.id}
            onClick={() => onItemClick(item)}
          />
        ))}
        
        {items.length === 0 && (
          <div className="flex items-center justify-center h-20 text-muted-foreground text-sm">
            No items
          </div>
        )}
      </div>
    </div>
  );
};