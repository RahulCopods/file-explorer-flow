import React from 'react';
import { WorkspaceItem } from '@/types/workspace';
import { FileItem } from './FileItem';
import { ColumnResizer } from './ColumnResizer';
import { cn } from '@/lib/utils';

interface WorkspaceColumnProps {
  items: WorkspaceItem[];
  selectedId?: string;
  onItemClick: (item: WorkspaceItem) => void;
  width: number;
  onWidthChange: (width: number) => void;
  showResizer?: boolean;
  title?: string;
}

export const WorkspaceColumn: React.FC<WorkspaceColumnProps> = ({
  items,
  selectedId,
  onItemClick,
  width,
  onWidthChange,
  showResizer = true,
  title
}) => {
  return (
    <div className="workspace-column flex h-full relative">
      <div 
        className={cn(
          'flex flex-col bg-workspace-column border-r border-workspace-border',
          'overflow-hidden'
        )}
        style={{ width: `${width}px` }}
      >
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
      
      {showResizer && (
        <ColumnResizer onResize={onWidthChange} />
      )}
    </div>
  );
};