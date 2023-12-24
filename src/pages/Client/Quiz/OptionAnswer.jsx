import React from "react";
import { Col } from "react-bootstrap";

export function TextAnswer({ handleEnterAnswer, answer = "" }) {
  return (
    <textarea
      defaultValue={answer}
      placeholder="Enter an answer ..."
      className="text-answer w-100 p-2"
      onKeyDown={handleEnterAnswer}
    />
  );
}

export function OptionAnswer({ handleAnswer, current, list, answer }) {
  return (
    <>
      <Col xs="12" sm="6" className="p-1">
        <label
          className={`form-check p-2 ${answer === "A" && "active"}`}
          htmlFor="answer1"
        >
          <input
            className="form-check-input"
            type="radio"
            name="answer"
            id="answer1"
            value="option1"
            onChange={() => handleAnswer("A")}
            checked={answer === "A"}
            hidden
          />
          <label className="form-check-label" htmlFor="answer1">
            A. {list[current]?.answera}
          </label>
        </label>
      </Col>

      <Col xs="12" sm="6" className="p-1">
        <label
          className={`form-check p-2 ${answer === "B" && "active"}`}
          htmlFor="answer2"
        >
          <input
            className="form-check-input"
            type="radio"
            name="answer"
            id="answer2"
            value="option2"
            onChange={() => handleAnswer("B")}
            checked={answer === "B"}
            hidden
          />
          <label className="form-check-label" htmlFor="answer2">
            B. {list[current]?.answerb}
          </label>
        </label>
      </Col>

      <Col xs="12" sm="6" className="p-1">
        <label
          className={`form-check p-2 ${answer === "C" && "active"}`}
          htmlFor="answer3"
        >
          <input
            className="form-check-input"
            type="radio"
            name="answer"
            id="answer3"
            value="option3"
            onChange={() => handleAnswer("C")}
            checked={answer === "C"}
            hidden
          />
          <label className="form-check-label" htmlFor="answer3">
            C. {list[current]?.answerc}
          </label>
        </label>
      </Col>

      <Col xs="12" sm="6" className="p-1">
        <label
          className={`form-check p-2 ${answer === "D" && "active"}`}
          htmlFor="answer4"
        >
          <input
            className="form-check-input"
            type="radio"
            name="answer"
            id="answer4"
            value="option4"
            onChange={() => handleAnswer("D")}
            checked={answer === "D"}
            hidden
          />
          <label className="form-check-label" htmlFor="answer4">
            D. {list[current]?.answerd}
          </label>
        </label>
      </Col>
    </>
  );
}
