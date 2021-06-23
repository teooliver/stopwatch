import React, { FC, useState } from 'react';
import { Dot } from '../../icons/Dot';
import { Folder } from '../../icons/Folder';
import ProjectsDropDown from '../../ProjectsDropdown/ProjectsDropDown';
import { ISelectedProject } from '../StopWatch/Stopwatch';

interface Props {
  selectedProject: ISelectedProject;
  setSelectedProject: React.Dispatch<React.SetStateAction<ISelectedProject>>;
}

export const ProjectSelect: FC<Props> = ({
  selectedProject,
  setSelectedProject,
}) => {
  const [isProjectDropwdownOpen, setIsProjectDropwdownOpen] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<ISelectedProject>({
  //   id: '',
  //   name: '',
  //   client: '',
  //   color: '',
  // });
  return (
    <div className='project-select'>
      {selectedProject.name ? (
        <span
          className='selected-project'
          onClick={() => setIsProjectDropwdownOpen(!isProjectDropwdownOpen)}
        >
          <i>
            <Dot size='24' />
          </i>
          <span className='selected-project-name'>{selectedProject.name}</span>
          <span
            className='selected-project-client'
            style={{ color: selectedProject.color }}
          >
            {selectedProject.client ? `- ${selectedProject.client}` : null}
          </span>
        </span>
      ) : (
        <i onClick={() => setIsProjectDropwdownOpen(!isProjectDropwdownOpen)}>
          <Folder size='24' color='white' />
        </i>
      )}
      {isProjectDropwdownOpen && (
        <ProjectsDropDown
          setSelectedProject={setSelectedProject}
          setIsProjectDropwdownOpen={setIsProjectDropwdownOpen}
        />
      )}
    </div>
  );
};
