import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ColumnResizerProps {
  onResize: (width: number) => void;
  className?: string;
}

export const ColumnResizer: React.FC<ColumnResizerProps> = ({ onResize, className }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = (e.target as HTMLElement).closest('.workspace-column')?.getBoundingClientRect();
      if (rect) {
        const newWidth = e.clientX - rect.left;
        onResize(Math.max(200, Math.min(600, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onResize]);

  return (
    <div
      className={cn(
        'w-1 bg-workspace-border hover:bg-primary cursor-col-resize transition-colors',
        'relative group',
        isDragging && 'bg-primary',
        className
      )}
      onMouseDown={handleMouseDown}
    >
      <div className="absolute inset-0 w-4 -translate-x-1.5" />
      <div className={cn(
        'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        'w-1 h-8 bg-workspace-border group-hover:bg-primary rounded-full',
        'transition-colors duration-200',
        isDragging && 'bg-primary'
      )} />
    </div>
  );
};