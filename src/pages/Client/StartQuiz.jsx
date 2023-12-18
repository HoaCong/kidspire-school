import _has from "lodash/has";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
export default function StartQuiz() {
  const { id } = useParams();
  useEffect(() => {
    const hashQuiz = JSON.parse(sessionStorage.getItem("start_quiz")) || {};
    if (!_has(hashQuiz, id)) {
      hashQuiz[id] = new Date().getTime() + 30 * 60 * 60;
      sessionStorage.setItem("start_quiz", JSON.stringify(hashQuiz));
    }

    return () => {
      // second
    };
  }, []);

  return <div>StartQuiz</div>;
}
