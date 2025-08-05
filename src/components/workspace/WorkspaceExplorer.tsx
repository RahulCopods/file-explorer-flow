import React, { useState, useCallback } from 'react';
import { Info } from 'lucide-react';
import { WorkspaceItem, ColumnState, FileType } from '@/types/workspace';
import { WorkspaceColumn } from './WorkspaceColumn';
import { PreviewPanel } from './PreviewPanel';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { cn } from '@/lib/utils';

interface WorkspaceExplorerProps {
  data: WorkspaceItem[];
}

const canExpand = (type: FileType) => {
  return ['folder', 'workspace', 'entity'].includes(type);
};

export const WorkspaceExplorer: React.FC<WorkspaceExplorerProps> = ({ data }) => {
  const [columns, setColumns] = useState<ColumnState[]>([
    {
      items: data,
      path: [],
    }
  ]);
  
  const [showPreview, setShowPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState<WorkspaceItem | null>(null);

  const handleItemClick = useCallback((item: WorkspaceItem, columnIndex: number) => {
    // Always update selected item for preview
    setSelectedItem(item);

    if (!canExpand(item.type) || !item.children || item.children.length === 0) {
      return;
    }

    // Find the current column and update selection
    const newColumns = [...columns];
    newColumns[columnIndex] = {
      ...newColumns[columnIndex],
      selectedId: item.id
    };

    // If clicking on an already selected item, just update the selection
    if (newColumns[columnIndex].selectedId === item.id && newColumns.length > columnIndex + 1) {
      // Remove columns after this one and add the new children column
      newColumns.splice(columnIndex + 1);
    }

    // Add new column with children
    const newPath = [...newColumns[columnIndex].path, item.name];
    newColumns.push({
      items: item.children,
      path: newPath,
    });

    setColumns(newColumns);
  }, [columns]);


  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="h-full flex flex-col bg-workspace-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-workspace-border bg-workspace-column">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Workspace Explorer</h1>
          <p className="text-sm text-muted-foreground">Navigate your files and folders</p>
        </div>
        
        <Button
          variant={showPreview ? "default" : "outline"}
          size="sm"
          onClick={togglePreview}
          className="gap-2"
        >
          <Info className="h-4 w-4" />
          Info
        </Button>
      </div>

      {/* Breadcrumb */}
      {columns.length > 1 && (
        <div className="px-6 py-2 border-b border-workspace-border bg-muted/20">
          <div className="text-sm text-muted-foreground">
            {columns[columns.length - 1]?.path.join(' > ') || 'Root'}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Columns */}
          {columns.map((column, index) => (
            <React.Fragment key={`${index}-${column.path.join('-')}`}>
              <ResizablePanel defaultSize={25} minSize={15}>
                <WorkspaceColumn
                  items={column.items}
                  selectedId={column.selectedId}
                  onItemClick={(item) => handleItemClick(item, index)}
                  title={index === 0 ? 'Root' : column.path[column.path.length - 1]}
                />
              </ResizablePanel>
              {index < columns.length - 1 && <ResizableHandle withHandle />}
            </React.Fragment>
          ))}
          
          {/* Preview Panel */}
          {showPreview && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={20}>
                <PreviewPanel
                  item={selectedItem}
                  onClose={() => setShowPreview(false)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};