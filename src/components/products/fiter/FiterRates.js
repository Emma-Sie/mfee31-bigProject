import React from "react";
import FiterRate from "./FiterRate";

function FiterRates() {
  return (
    <>
      <p>評價篩選</p>
      <FiterRate value={5} />
      <p>5星</p>
      <FiterRate value={4} />
      <p>4星</p>
      <FiterRate value={3} />
      <p>3星</p>
      <FiterRate value={2} />
      <p>2星</p>
      <FiterRate value={1} />
      <p>1星</p>
    </>
  );
}

export default FiterRates;
