import React from "react";

import Button from "../../../../shared/components/button";

export const TestModalFooter: React.FC<{
  onOk: () => void;
  onCancel: () => void;
}> = ({ onOk, onCancel }) => {
  return (
    <div className="test-modal-footer">
      <Button variant="warning" onClick={() => onOk()}>
        OK
      </Button>
      <Button variant="success" onClick={() => onCancel()}>
        Cancel
      </Button>
    </div>
  );
};
