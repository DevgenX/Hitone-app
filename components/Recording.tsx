import { FC, useState } from "react";

import Record from "./ui/Record";

interface RecordContent {}

const Recording: FC<RecordContent> = () => {
  return (
    <div className="text-center">
      <Record />
    </div>
  );
};

export default Recording;
