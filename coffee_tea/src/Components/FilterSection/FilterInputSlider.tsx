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

}

// Destructure onRadiusChange from the props object
function FilterInputSlider({ onValueChange, label, value, output, max, step }: FilterInputSliderProps) {
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
          <div className="filter-description">
              {radius}{output}
            </div>
        </div>
  )
      
};

export default FilterInputSlider;

