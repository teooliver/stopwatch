import React, { FC, useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { TaskContext } from "../context/TaskContext";
import PlayCircle from "../icons/PlayCircle";
import StopCircle from "../icons/StopCircle";
import XCircle from "../icons/XCircle";
import { createTask } from "../utils/api-client";

interface ControlsProps {
  setTimeInSeconds: Function;
  eventName: string;
  timeInSeconds: number;
  setEventName: Function;
}

const Controls: FC<ControlsProps> = ({
  setTimeInSeconds,
  eventName,
  timeInSeconds,
  setEventName,
}) => {
  const [intervalId, setIntervalId] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const { task, setTask } = useContext(TaskContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    setTask!({
      ...task,
      name: eventName,
    });
  }, [eventName]);

  useEffect(() => {
    setTask!({
      ...task,
      timeInSeconds: timeInSeconds,
    });
  }, [timeInSeconds]);

  const createTaskMutation = useMutation(createTask, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("tasks");
    },
  });

  const handlePlayButton = () => {
    let interval: any = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);
    setIntervalId(interval);
    setIsPlaying(true);
    setTask!({ ...task, initialTime: new Date() });
  };
  const handleStopButton = () => {
    clearInterval(intervalId);
    setIsPlaying(false);
    // @ts-ignore
    createTaskMutation.mutate(task);
  };
  const handleResetButton = () => {
    clearInterval(intervalId);
    setTimeInSeconds(0);
    setIsPlaying(false);
    setEventName("");
  };

  return (
    <div className='Controls'>
      {isPlaying ? (
        <button onClick={handleStopButton}>
          <i>
            <StopCircle />
          </i>
        </button>
      ) : (
        <button onClick={handlePlayButton}>
          <i>
            <PlayCircle />
          </i>
        </button>
      )}
      <button onClick={handleResetButton}>
        <i>
          <XCircle />
        </i>
      </button>
    </div>
  );
};

export default Controls;
