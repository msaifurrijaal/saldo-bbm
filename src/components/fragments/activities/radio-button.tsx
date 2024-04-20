import React from "react";

type RadioButtonProps = {
  isChoice: String;
  choiceAnswer: React.Dispatch<React.SetStateAction<string>>;
};

const RadioButton = ({ isChoice, choiceAnswer }: RadioButtonProps) => {
  return (
    <form action="" className="my-4">
      <div className="flex">
        <div
          className={`rounded-lg font-medium ${
            isChoice === "activities"
              ? "bg-blue-500 border border-blue-500 text-white"
              : "bg-slate-50 border border-primary text-black"
          } py-1 px-4 me-2`}
        >
          <input
            type="radio"
            id="true"
            name="option"
            value="activities"
            className="mb-3 hidden"
            onChange={(e) => choiceAnswer(e.target.value)}
            checked={isChoice === "activities"}
          />
          <label htmlFor="true" className="cursor-pointer">
            Activities
          </label>
          <br />
        </div>
        <div
          className={`rounded-lg font-medium ${
            isChoice === "request"
              ? "bg-blue-500 border border-blue-500 text-white"
              : "bg-slate-50 border border-primary text-black"
          } py-1 px-4 ms-2`}
        >
          <input
            type="radio"
            id="false"
            name="option"
            value="request"
            className="mb-3 hidden"
            onChange={(e) => choiceAnswer(e.target.value)}
            checked={isChoice === "request"}
          />
          <label htmlFor="false" className="cursor-pointer">
            Request
          </label>
          <br />
        </div>
      </div>
    </form>
  );
};

export default RadioButton;
