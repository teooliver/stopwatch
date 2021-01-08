import React, { useEffect, useState } from "react";
import { calculateTimer } from "../../utils/timer";
import Controls from "./Controls";
import EditableInput from "./EditableInput";
import { Folder } from "../icons/Folder";
import { Dot } from "../icons/Dot";
import ProjectsDropDown from "../ProjectsDropdown/ProjectsDropDown";

export interface ISelectedProject {
  id: string;
  name: string;
  client: string;
}

const Stopwatch = () => {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [isProjectDropwdownOpen, setIsProjectDropwdownOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ISelectedProject>({
    id: "",
    name: "",
    client: "",
  });

  useEffect(() => {
    let timeArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  return (
    <div className='Stopwatch'>
      <EditableInput />
      <div className='project-select'>
        {selectedProject.name ? (
          <span
            className='selected-project'
            onClick={() => setIsProjectDropwdownOpen(!isProjectDropwdownOpen)}
          >
            <i>
              <Dot size='24' />
            </i>
            <span className='selected-project-name'>
              {selectedProject.name}
            </span>
            <span className='selected-project-client'>
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
      <div className='clock-controls'>
        <section className='clock'>
          <p className='time-text'>{timerArray[0]}</p>
          <span>:</span>
          <p className='time-text'>{timerArray[1]}</p>
          <span>:</span>
          <p className='time-text'>{timerArray[2]}</p>
        </section>

        <Controls
          setTimeInSeconds={setTimeInSeconds}
          timeInSeconds={timeInSeconds}
          selectedProject={selectedProject}
        />
      </div>
    </div>
  );
};

export default Stopwatch;
