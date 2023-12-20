/* eslint-disable react-hooks/exhaustive-deps */
import CountDown from "components/common/CountDown";
import CustomTooltip from "components/common/CustomTooltip";
import { ROUTES } from "constants/routerWeb";
import _has from "lodash/has";
import _map from "lodash/map";
import _size from "lodash/size";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { actionDetail } from "store/Quiz/action";
import { addToast } from "store/Toast/action";
import { OptionAnswer, TextAnswer } from "./OptionAnswer";
export default function StartQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    detail,
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.quizReducer);

  const dispatch = useDispatch();
  const onGetDetailQuiz = (id) => dispatch(actionDetail(id));
  const [list, setList] = useState({});
  const [current, setCurrent] = useState(0);
  const [hash, setHash] = useState({});
  const [time, setTime] = useState(0);

  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    const startQuiz = JSON.parse(sessionStorage.getItem("start_quiz")) || {};
    const hashQuiz = JSON.parse(sessionStorage.getItem("answer_quiz")) || {};

    if (!_has(startQuiz, id)) {
      const seconds = 30; // Đặt thời gian là 5 phút (5 * 60 giây)
      const futureTime = new Date().getTime() + seconds * 1000; // Thời điểm sau 5 phút
      startQuiz[id] = futureTime;

      setTime(seconds);
      sessionStorage.setItem("start_quiz", JSON.stringify(startQuiz));
    } else {
      if (startQuiz[id] < new Date().getTime()) {
        handleSubmit();
      } else {
        setTime((startQuiz[id] - new Date().getTime()) / 1000);
        if (!isLoading) onGetDetailQuiz(id);
      }
    }
    if (_has(hashQuiz, id)) {
      setHash(hashQuiz[id]);
    }

    return () => {
      // second
    };
  }, []);
  useEffect(() => {
    if (isSuccess) {
      let tmp_ques = {};
      _map(detail.listQuestions, (item, index) => (tmp_ques[index + 1] = item));
      setCurrent(1);
      setList(tmp_ques);
    }
  }, [isSuccess]);

  const handleAnswer = (answer) => {
    setHash((prev) => {
      sessionStorage.setItem(
        "answer_quiz",
        JSON.stringify({ [id]: { ...prev, [list[current].id]: answer } })
      );
      return { ...prev, [list[current].id]: answer };
    });

    setCurrent((prev) => {
      const newPos = +prev + 1;
      if (newPos <= _size(list)) return newPos;
      return _size(list);
    });
  };

  const handleEnterAnswer = (event) => {
    if (event.key === "Enter") {
      const answer = event.target.value;
      handleAnswer(answer);
    }
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const handleSubmit = () => {
    dispatch(
      addToast({
        text: "Nạp bài thành công",
        type: "success",
        title: "",
      })
    );
    onCloseTooltip();
    navigate(ROUTES.QUIZ);
    sessionStorage.removeItem("answer_quiz");
  };

  return (
    <>
      <div className="mt-3 mb-5">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: 400 }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isSuccess && (
          <>
            <CountDown seconds={time} callback={handleSubmit}></CountDown>
            <div className="col-12 card mt-3">
              <div className="card-body">
                <h5 className="m-0 card-title">{list[current]?.name}</h5>
                <div className="card-text mt-3">
                  {list[current]?.type ? (
                    <TextAnswer
                      key={current}
                      handleEnterAnswer={handleEnterAnswer}
                      answer={hash[list[current]?.id]}
                    />
                  ) : (
                    <OptionAnswer
                      handleAnswer={handleAnswer}
                      current={current}
                      list={list}
                      answer={hash[list[current]?.id]}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="d-flex gap-2 justify-content-center mt-3">
              {_map(list, (item, index) => (
                <Button
                  key={index}
                  variant={
                    item.id === list[current]?.id
                      ? "primary"
                      : "outline-primary"
                  }
                  onClick={() => setCurrent(index)}
                >
                  {index}
                </Button>
              ))}
            </div>
            <Button
              className="mx-auto"
              onClick={(e) =>
                setTooltip((prev) => {
                  return {
                    visible: prev.target === e.target ? !tooltip.visible : true,
                    target: e.target,
                    id: list[current]?.id,
                  };
                })
              }
            >
              Submit a Quiz
            </Button>
          </>
        )}
        <CustomTooltip
          content="Thời gian chưa hết, bạn có chắc là muốn nạp bài sớm không"
          tooltip={tooltip}
          loading={tooltip.visible && isLoading}
          onClose={onCloseTooltip}
          onDelete={handleSubmit}
        />
      </div>
    </>
  );
}
