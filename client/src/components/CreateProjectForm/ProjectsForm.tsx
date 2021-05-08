import React, { useState } from 'react';
import { ProjectCreate, useCreateProject } from '../../hooks/useCreateProject';
import ClientsDropdown from './ClientsDropdown';

const ProjectsForm = () => {
  const [name, setName] = useState('');
  const [client, setClient] = useState('No Client');
  const [workspace, setWorkspace] = useState('');
  const [projectColor, setProjectColor] = useState('white');
  const createProjectMutation = useCreateProject();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCreateProject = () => {
    const newProject: ProjectCreate = {
      name: name,
    };
    if (client !== 'No Client' || client.length === 0) {
      newProject.client = client;
    }
    if (projectColor) {
      newProject.color = projectColor;
    }

    createProjectMutation.mutate(newProject);
  };

  return (
    <form className='ProjectsForm' onSubmit={(e) => handleSubmit(e)}>
      <div>
        <input
          placeholder='Project Name'
          name='name'
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <span className='project-color'></span>
      </div>
      <ClientsDropdown client={client} setClient={setClient} />
      <input
        placeholder='Workspace'
        name='client'
        id='client'
        type='text'
        value={workspace}
        onChange={(e) => setWorkspace(e.target.value)}
      />
      <button className='btn btn-primary' onClick={handleCreateProject}>
        Create Project
      </button>
    </form>
  );
};

export default ProjectsForm;
