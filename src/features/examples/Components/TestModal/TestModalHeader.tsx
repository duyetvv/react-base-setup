import React from "react";

import Button from "../../../../shared/components/button";

export const TestModalHeader: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <header className="test-modal-header">
      <h2 className="test-modal-title">This is the Test Modal Header</h2>
      <Button variant="secondary" aria-ation="close" onClick={() => onClose()}>
        x
      </Button>
    </header>
  );
};
