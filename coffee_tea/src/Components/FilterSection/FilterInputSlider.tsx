import React, { useContext, useEffect, useState } from "react";
import "./FilterSection.css";
import { FilterInput } from "../../types";
interface FilterInputSliderProps {
  onValueChange: (value: number) => void; // Define the type for better clarity and safety
  label: string;
  value: string;
  output: string;
  max: number;
  step: number;
  show: boolean;
}

interface DescriptionProps{
  value: number;
  output: string;
  isShown: boolean;
}

function Description({ value, output, isShown }:DescriptionProps) {
  if (!isShown) {
    return null;
  }
  return <div className="filter-description">
              {value}{output}
          </div>;
}
// Destructure onRadiusChange from the props object
function FilterInputSlider({ onValueChange, label, value, output, max, step, show}: FilterInputSliderProps) {
  const [radius, setRadius] = useState(10);
  return (
        <div className="filter-group">
          <div className="filter-label">{label}</div>
          <div className="filter-value">{value}</div>
          <input
            type="range"
            min={0}
            max={max}
            step={step}
            onChange={(e) => {setRadius(e.target.valueAsNumber);onValueChange(e.target.valueAsNumber)}}
            defaultValue={10}
          />
          <Description 
        value={radius} output={output} isShown={show}          
        />
          
        </div>
  )
      
};

export default FilterInputSlider;

