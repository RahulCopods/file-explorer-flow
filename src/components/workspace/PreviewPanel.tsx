import React from 'react';
import { 
  File, 
  Folder, 
  Calendar, 
  HardDrive, 
  X,
  FileText,
  Building2,
  Database
} from 'lucide-react';
import { WorkspaceItem, FileType } from '@/types/workspace';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PreviewPanelProps {
  item: WorkspaceItem | null;
  onClose: () => void;
}

const getPreviewIcon = (type: FileType) => {
  switch (type) {
    case 'folder':
      return Folder;
    case 'workspace':
      return Building2;
    case 'entity':
      return Database;
    default:
      return FileText;
  }
};

const getPreviewColor = (type: FileType) => {
  switch (type) {
    case 'folder':
      return 'text-blue-600 bg-blue-50';
    case 'workspace':
      return 'text-purple-600 bg-purple-50';
    case 'entity':
      return 'text-green-600 bg-green-50';
    case 'doc':
      return 'text-blue-500 bg-blue-50';
    case 'pdf':
      return 'text-red-500 bg-red-50';
    case 'sheet':
      return 'text-emerald-500 bg-emerald-50';
    default:
      return 'text-muted-foreground bg-muted';
  }
};

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ item, onClose }) => {
  if (!item) return null;

  const Icon = getPreviewIcon(item.type);
  const colorClass = getPreviewColor(item.type);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="w-80 bg-workspace-column border-l border-workspace-border flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-workspace-border">
        <h2 className="text-lg font-semibold text-foreground">Preview</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <Card>
          <CardHeader className="text-center pb-4">
            <div className={cn(
              'w-16 h-16 rounded-lg mx-auto flex items-center justify-center',
              colorClass
            )}>
              <Icon className="h-8 w-8" />
            </div>
            <CardTitle className="text-base">{item.name}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Type</div>
                <div className="font-medium capitalize">{item.type}</div>
              </div>
              
              {item.size && (
                <div>
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-medium">{item.size}</div>
                </div>
              )}
            </div>

            {item.modified && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Modified</div>
                  <div className="font-medium">{item.modified}</div>
                </div>
              </div>
            )}

            {hasChildren && (
              <div className="flex items-center gap-2 text-sm">
                <Folder className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Items</div>
                  <div className="font-medium">{item.children!.length} items</div>
                </div>
              </div>
            )}

            {item.description && (
              <div className="text-sm">
                <div className="text-muted-foreground mb-1">Description</div>
                <div className="text-foreground leading-relaxed">
                  {item.description}
                </div>
              </div>
            )}

            {/* Mock preview content for files */}
            {!hasChildren && (
              <div className="border rounded-lg p-4 bg-muted/30">
                <div className="text-sm text-muted-foreground mb-2">Preview</div>
                <div className="space-y-2">
                  {item.type === 'doc' && (
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div className="h-2 bg-muted rounded w-full"></div>
                      <div className="h-2 bg-muted rounded w-4/5"></div>
                      <div className="h-2 bg-muted rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-full"></div>
                    </div>
                  )}
                  {item.type === 'sheet' && (
                    <div className="grid grid-cols-3 gap-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="h-6 bg-muted rounded text-xs"></div>
                      ))}
                    </div>
                  )}
                  {item.type === 'pdf' && (
                    <div className="text-center text-muted-foreground">
                      <File className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-xs">PDF Document</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};