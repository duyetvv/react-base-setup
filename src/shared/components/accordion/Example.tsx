import React from "react";
import { Accordion } from "./Accordion";

const ExampleAccordion = React.memo(() => {
  return (
    <Accordion>
      <Accordion.Item index={1}>
        <Accordion.Header index={1}>Accordion 1</Accordion.Header>
        <Accordion.Panel index={1}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item index={2}>
        <Accordion.Header index={2}>Accordion 2</Accordion.Header>
        <Accordion.Panel index={2}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
});

export default ExampleAccordion;
