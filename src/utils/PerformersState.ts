import { useState } from "react";
import { UploadFile } from "antd";
import config from "../config/AppConfig";
import * as FileSaver from "file-saver";
import { message } from "antd";
import { Show } from "../types/Show";

export const useShowState = (initialShow: Show) => {
  const [show, setShow] = useState<Show>(initialShow);
  const [count, setCount] = useState<number>(1);

  const saveState = (): void => {
    const serializedData = JSON.stringify(show);
    const blob = new Blob([serializedData], { type: "application/json" });
    FileSaver.saveAs(blob, "show.json");
  };

  // Callback passed to upload button
  const loadState = (file: UploadFile<any>[]): boolean => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = event.target?.result;
      try {
        const parsedData = JSON.parse(jsonData as string);
        setShow(parsedData);
      } catch (error) {
        message.success(`Error parsing JSON: ${error}`);
      }
    };
    reader.readAsText(file[0].originFileObj as File);
    return true;
  };

  // Callback passed to slider component
  const handleCountChange = (count: number[]): void => {
    setCount(count[0]);
  };

  // Callback passed to 'Performers to line' button
  const positionPerformersInLine = (): void => {
    const distanceBetween = (config.canvasWidth - config.fieldWidthAdjustment * 2) / show.performers[count].length;
    const updatedPerformers = Object.keys(show.performers[count]).map(
      (key, index) => ({
        ...show.performers[count][parseInt(key)],
        x: distanceBetween * index + config.fieldWidthAdjustment,
        y: config.canvasHeight / 2,
      }),
    );

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: updatedPerformers,
      },
    }));
  };

  const updatePerformerPosition = (id: string, x: number, y: number): void => {
    const updatedPerformers = Object.keys(show.performers[count]).map((key) => {
      const performer = show.performers[count][parseInt(key)];
      if (key === id) {
        return { ...performer, x, y };
      } else {
        return performer;
      }
    });

    setShow((prevShow) => ({
      ...prevShow,
      performers: {
        ...prevShow.performers,
        [count]: updatedPerformers,
      },
    }));
  };

  const playShow = async () => {
    for (let i = 0; i < Object.keys(show.performers).length; i++) {
      setCount(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set: count,
    handleCountChange,
    updatePositions: updatePerformerPosition,
    playShow,
  };
};
