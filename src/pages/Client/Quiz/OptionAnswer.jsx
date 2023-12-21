import React from "react";

export function TextAnswer({ handleEnterAnswer, answer = "" }) {
  return (
    <textarea
      defaultValue={answer}
      placeholder="Enter an answer ..."
      className="w-100 p-2"
      onKeyDown={handleEnterAnswer}
    />
  );
}

export function OptionAnswer({ handleAnswer, current, list, answer }) {
  return (
    <div className="answer-container">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="answer"
          id="answer1"
          value="option1"
          onChange={() => handleAnswer("A")}
          checked={answer === "A"}
        />
        <label className="form-check-label" htmlFor="answer1">
          {list[current]?.answera}
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="answer"
          id="answer2"
          value="option2"
          onChange={() => handleAnswer("B")}
          checked={answer === "B"}
        />
        <label className="form-check-label" htmlFor="answer2">
          {list[current]?.answerb}
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="answer"
          id="answer3"
          value="option3"
          onChange={() => handleAnswer("C")}
          checked={answer === "C"}
        />
        <label className="form-check-label" htmlFor="answer3">
          {list[current]?.answerc}
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="answer"
          id="answer4"
          value="option4"
          onChange={() => handleAnswer("D")}
          checked={answer === "D"}
        />
        <label className="form-check-label" htmlFor="answer4">
          {list[current]?.answerd}
        </label>
      </div>
    </div>
  );
}
