import React, { useCallback, useState } from "react";

import sources from "../../mock/webDesignStyles.json";
import { selectedWebStyles } from "../../constants/selectedWebStyles";

export interface WebDesignOption {
  key: string;
  name: string;
  description: string;
  keyFeatures: string[];
}

export interface SelectWebDesignProps {
  onChange?: (selectedValue: string) => void;
}

export const defSelectedWebDesign: WebDesignOption = selectedWebStyles;

const SelectWebDesignStyles = ({ onChange }: SelectWebDesignProps) => {
  const [selectedWebDesign, setSelectedWebDesign] = useState<string>("");

  const onSelectChange = useCallback(
    (evt: React.ChangeEvent<HTMLSelectElement>) => {
      const currValue = evt.target.value;

      setSelectedWebDesign(currValue);
      if (typeof onChange === "function") {
        onChange(currValue);
      }
    },
    [setSelectedWebDesign, onChange],
  );

  return (
    <select
      className={["select", selectedWebDesign].join(" ")}
      value={selectedWebDesign}
      onChange={onSelectChange}
    >
      {sources && sources.length
        ? sources.map((ele) => (
            <option key={ele.key} className="select__option" value={ele.key}>
              {ele.name}
            </option>
          ))
        : ""}
    </select>
  );
};

export default SelectWebDesignStyles;
