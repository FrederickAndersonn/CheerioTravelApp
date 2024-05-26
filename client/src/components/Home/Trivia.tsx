import React, { useState } from "react";

interface TriviaPopupProps {
  onClose: () => void;
  onAnswer: (answer: string) => void;
  question: string;
  choices: string[];
}

const TriviaPopup: React.FC<TriviaPopupProps> = ({
  onClose,
  onAnswer,
  question,
  choices,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleSubmit = () => {
    onAnswer(selectedAnswer);
    setSelectedAnswer("");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md">
        <h2 className="text-xl font-bold">
          Are you worthy to access this power?!
        </h2>
        <p className="mb-4">Answer correctly to get in</p>
        <p dangerouslySetInnerHTML={{ __html: question }}></p>
        <div className="mt-4">
          {choices.map((choice, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="radio"
                id={`choice-${index}`}
                name="choices"
                value={choice}
                checked={selectedAnswer === choice}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-2"
              />
              <label
                htmlFor={`choice-${index}`}
                dangerouslySetInnerHTML={{ __html: choice }}
              ></label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TriviaPopup;
