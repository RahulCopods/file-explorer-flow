import { WorkspaceItem } from '@/types/workspace';

export const sampleWorkspaceData: WorkspaceItem[] = [
  {
    id: '1',
    name: 'Marketing Workspace',
    type: 'workspace',
    modified: '2024-01-15',
    description: 'Marketing team workspace with campaigns and assets',
    children: [
      {
        id: '1-1',
        name: 'Q1 Campaign',
        type: 'folder',
        modified: '2024-01-10',
        children: [
          {
            id: '1-1-1',
            name: 'Brand Guidelines',
            type: 'pdf',
            size: '2.3 MB',
            modified: '2024-01-08',
            description: 'Complete brand guidelines and style guide'
          },
          {
            id: '1-1-2',
            name: 'Campaign Strategy',
            type: 'doc',
            size: '156 KB',
            modified: '2024-01-09',
            description: 'Marketing strategy document for Q1 campaign'
          },
          {
            id: '1-1-3',
            name: 'Budget Analysis',
            type: 'sheet',
            size: '89 KB',
            modified: '2024-01-10',
            description: 'Budget breakdown and financial projections'
          }
        ]
      },
      {
        id: '1-2',
        name: 'Social Media',
        type: 'folder',
        modified: '2024-01-12',
        children: [
          {
            id: '1-2-1',
            name: 'Content Calendar',
            type: 'sheet',
            size: '234 KB',
            modified: '2024-01-12',
            description: 'Monthly content calendar for all social platforms'
          },
          {
            id: '1-2-2',
            name: 'Assets',
            type: 'folder',
            modified: '2024-01-11',
            children: [
              {
                id: '1-2-2-1',
                name: 'Instagram Posts',
                type: 'folder',
                modified: '2024-01-11',
                children: [
                  {
                    id: '1-2-2-1-1',
                    name: 'Post Template',
                    type: 'pdf',
                    size: '4.2 MB',
                    modified: '2024-01-11',
                    description: 'Instagram post template design'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Product Development',
    type: 'workspace',
    modified: '2024-01-14',
    description: 'Product development workspace for engineering team',
    children: [
      {
        id: '2-1',
        name: 'Requirements',
        type: 'entity',
        modified: '2024-01-13',
        children: [
          {
            id: '2-1-1',
            name: 'User Stories',
            type: 'doc',
            size: '445 KB',
            modified: '2024-01-13',
            description: 'Detailed user stories and acceptance criteria'
          },
          {
            id: '2-1-2',
            name: 'Technical Specs',
            type: 'doc',
            size: '1.2 MB',
            modified: '2024-01-13',
            description: 'Technical specifications and architecture'
          }
        ]
      },
      {
        id: '2-2',
        name: 'Research',
        type: 'folder',
        modified: '2024-01-14',
        children: [
          {
            id: '2-2-1',
            name: 'Market Analysis',
            type: 'pdf',
            size: '3.4 MB',
            modified: '2024-01-14',
            description: 'Comprehensive market research and analysis'
          },
          {
            id: '2-2-2',
            name: 'User Research',
            type: 'sheet',
            size: '567 KB',
            modified: '2024-01-13',
            description: 'User research data and insights'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Legal Documents',
    type: 'folder',
    modified: '2024-01-12',
    description: 'Important legal documents and contracts',
    children: [
      {
        id: '3-1',
        name: 'Contracts',
        type: 'pdf',
        size: '1.8 MB',
        modified: '2024-01-12',
        description: 'Client contracts and agreements'
      },
      {
        id: '3-2',
        name: 'Privacy Policy',
        type: 'doc',
        size: '234 KB',
        modified: '2024-01-10',
        description: 'Company privacy policy document'
      }
    ]
  }
];