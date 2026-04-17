import React, { useCallback, useState } from "react";

import { Modal } from "../../../../shared/components/modal";
import Button from "../../../../shared/components/button";

import { TestModalHeader } from "./TestModalHeader";
import { TestModalBody } from "./TestModalBody";
import { TestModalFooter } from "./TestModalFooter";

const TestModal: React.FC<{}> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCloseClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Toggle Modal</Button>
      <Modal isOpen={isOpen} onClose={onCloseClick}>
        <article>
          <Modal.Header>
            <TestModalHeader onClose={onCloseClick} />
          </Modal.Header>
          <Modal.Body>
            <TestModalBody />
          </Modal.Body>
          <Modal.Footer>
            <TestModalFooter onOk={onCloseClick} onCancel={onCloseClick} />
          </Modal.Footer>
        </article>
      </Modal>
    </div>
  );
};

export default TestModal;
