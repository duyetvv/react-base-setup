import React, { useCallback, useState } from "react";

import { DesignStyleContext } from "./contexts/designStyleContext";

import DesignedButton from "./DesignedButton";
import SelectWebDesignStyles, {
  defSelectedWebDesign,
} from "./SelectWebDesignStyles";

const ContextAPIExamples = React.memo(() => {
  const [webDesignStyle, setWebDesignStyle] = useState<string>(
    defSelectedWebDesign.key,
  );

  const onChangeDesignStyle = useCallback(
    (selectedValue: string) => {
      setWebDesignStyle(selectedValue);
    },
    [setWebDesignStyle],
  );

  return (
    <DesignStyleContext value={webDesignStyle}>
      <section className="app-section">
        <SelectWebDesignStyles onChange={onChangeDesignStyle} />
        <DesignedButton>Button Designed Style</DesignedButton>
      </section>
    </DesignStyleContext>
  );
});

export default ContextAPIExamples;
