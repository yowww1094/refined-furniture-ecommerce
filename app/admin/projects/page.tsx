import { Card } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next/link';
import { Plus, Trash2, Edit3, Folder, FileText, Image, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function ProjectsPage() {
  const [projects] = useState([
    {
      id: 'proj1',
      name: 'Riad Renovation',
      client: 'Younes Smith',
      type: 'Interior Design',
      status: 'in_progress',
      startDate: '2026-05-01',
      endDate: '2026-08-15',
      budget: 75000,
      images: ['/project1-1.jpg', '/project1-2.jpg', '/project1-3.jpg'],
      location: 'Marrakech, Medina',
    },
    {
      id: 'proj2',
      name: 'Villa Interior',
      client: 'Fatima Zahra',
      type: 'Full Furnishing',
      status: 'completed',
      startDate: '2026-03-15',
      endDate: '2026-05-30',
      budget: 120000,
      images: ['/project2-1.jpg', '/project2-2.jpg'],
      location: 'Casablanca, Ain Diab',
    },
    {
      id: 'proj3',
      name: 'Office Fit-out',
      client: 'Ahmed Hassan',
      type: 'Office Furniture',
      status: 'planning',
      startDate: '2026-07-01',
      endDate: '2026-09-30',
      budget: 45000,
      images: ['/project3-1.jpg'],
      location: 'Rabat, Hassan',
    }
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      // In a real app, this would call a server action
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex items-center space-x-3">
          <Link href="/admin/projects/create" className="btn btn-primary">
            <Plus className="mr-2" /> New Project
          </Link>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-muted">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Project
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Client
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Budget
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProjects.length === 0 ? (
              <tr>
                <td colspan="8" className="py-8 text-center text-muted-foreground">
                  No projects found matching your search.
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-primary/5">
                  <td className="px-4 py-4 flex items-center space-x-3">
                    <div className="flex items-center space-x-3">
                      <Folder className="h-4 w-4" />
                      <div>
                        <p className="font-medium">{project.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm">{project.client}</p>
                  </td>
                  <td className="px-4 py-4 text-sm">{project.type}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      project.status === 'completed'
                        ? 'bg-success/20 text-success'
                        : project.status === 'in_progress'
                        ? 'bg-primary/20 text-primary'
                        : project.status === 'planning'
                        ? 'bg-warning/20 text-warning'
                        : project.status === 'on_hold'
                        ? 'bg-muted/20 text-muted'
                        : 'bg-destructive/20 text-destructive'
                    }`}>
                      {project.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    {project.startDate} to {project.endDate}
                  </td>
                  <td className="px-4 py-4 text-sm font-mono">{project.budget} MAD</td>
                  <td className="px-4 py-4 text-sm">{project.location}</td>
                  <td className="px-4 py-4 text-sm flex items-center space-x-3">
                    <Link href={`/admin/projects/${project.id}`} className="btn btn-outline btn-sm p-2">
                      <Eye className="h-4 w-4" /> View
                    </Link>
                    <Link href={`/admin/projects/${project.id}/edit`} className="btn btn-outline btn-sm p-2">
                      <Edit3 className="h-4 w-4" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="btn btn-outline btn-sm p-2 text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
        <div className="flex space-x-2">
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          <button
            disabled={true}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}