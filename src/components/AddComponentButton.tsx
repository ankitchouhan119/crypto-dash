import React from 'react';
import { useAppDispatch } from '../hooks/useAppSelector.ts';
import { addComponent } from '../store/layoutSlice.ts';
import { GrTableAdd } from "react-icons/gr";
import { MdAddChart } from "react-icons/md";
import { PiNotebook } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";

const AddComponentButton: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleAddComponent = (type: string) => {
    const newComponent = {
      i: `${type}-${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 6,
      h: 4.5,
    };
    dispatch(addComponent(newComponent));
  };
  const handleAddComponent1 = (type: string) => {
    const newComponent = {
      i: `${type}-${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 6,
      h: 6,
    };
    dispatch(addComponent(newComponent));
  };
  const handleAddComponent2 = (type: string) => {
    const newComponent = {
      i: `${type}-${Date.now()}`,
      x: 0,
      y: Infinity,
      w: 6,
      h: 2.3,
    };
    dispatch(addComponent(newComponent));
  };

  return (
    <div className="fixed bottom-4 right-4 space-x-2">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
        onClick={() => handleAddComponent1('table')}
      >
        
        <span className='flex'>
        <IoMdAdd /> <GrTableAdd />
        </span>
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded"
        onClick={() => handleAddComponent('graph')}
      >
        <span className='flex'>
        <IoMdAdd /> <MdAddChart />
        </span>
        
      </button>
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded"
        onClick={() => handleAddComponent2('summary')}
      >
        <span className='flex'>
        <IoMdAdd /> <PiNotebook />
        </span>
       
      </button>
    </div>
  );
};

export default AddComponentButton;

