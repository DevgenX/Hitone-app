import { FC } from "react";

import { availableInputs } from "@/helpers/availableInputs";

export interface ScriptContent {
  [key: string]: string;
}

interface ScriptProps {
  formData: ScriptContent;
  editMode: Record<string, boolean>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  toggleEditMode: (name: string) => void;
}

const Script: FC<ScriptProps> = ({
  formData,
  editMode,
  onInputChange,
  toggleEditMode,
}) => {
  return (
    <div className="mb-8 text-black">
      {availableInputs.map((input) => (
        <div key={input.name} className="my-5">
          <label
            htmlFor={input.name}
            className="block text-sm font-medium text-white"
          >
            {input.label}:
          </label>
          {editMode[input.name] ? (
            <input
              type={input.name === "length" ? "number" : "text"}
              id={input.name}
              name={input.name}
              value={formData[input.name]}
              onChange={onInputChange}
              className="border border-gray-300 text-black rounded-md p-2 w-full"
              placeholder={input.placeholder}
            />
          ) : (
            <div
              onClick={() => toggleEditMode(input.name)}
              className="border border-gray-300 rounded-md p-2 w-full cursor-pointer"
            >
              {formData[input.name]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Script;
