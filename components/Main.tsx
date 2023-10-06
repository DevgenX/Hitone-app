import { FC, useState } from "react";

import CreateScript from "./CreateScript";

interface MainProps {}

const Main: FC<MainProps> = () => {
  return (
    <div className="min-h-[200px] min-w-full">
      <CreateScript />
    </div>
  );
};
export default Main;
