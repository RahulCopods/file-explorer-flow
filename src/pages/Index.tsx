import { WorkspaceExplorer } from '@/components/workspace/WorkspaceExplorer';
import { sampleWorkspaceData } from '@/data/sampleData';

const Index = () => {
  return (
    <div className="h-screen bg-workspace-bg">
      <WorkspaceExplorer data={sampleWorkspaceData} />
    </div>
  );
};

export default Index;
