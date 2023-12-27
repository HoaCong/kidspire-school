/* eslint-disable react-hooks/exhaustive-deps */
import Widget from "components/widget";
import { useEffect } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionHistory } from "store/Quiz/action";
function HistoryQuiz() {
  const {
    historyStatus: { isLoading, isSuccess },
    history,
  } = useSelector((state) => state.quizReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onGetDetailQuiz = (id) => dispatch(actionHistory(id));

  // const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading) {
      onGetDetailQuiz(user?.id);
    }
    window.scrollTo(0, 0);
    // return () => {
    //   onResetData();
    // };
  }, []);

  const getScore = (score, total) => {
    return total === 0 ? 0 : Math.round((score * 100) / total);
  };

  return (
    <section className="pb-5" id="section-topic">
      <div className="container">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center w-full"
            style={{ height: "100vh" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {isSuccess && (
          <>
            <h2 className="ff-title py-3">
              <b>History Quizs</b>
            </h2>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
              officia eligendi quo hic mollitia rerum.
            </div>
            <Row className="mt-3">
              <Col xs>
                <div>
                  <h5>History Quizs of Yourself</h5>
                  <div
                    className="border"
                    style={{ borderRadius: 50, overflow: "hidden" }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="text-center">
                            #
                          </th>
                          <th scope="col">Quiz</th>
                          <th scope="col" className="text-center">
                            Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((item, index) => {
                          if (index < 10)
                            return (
                              <tr key={index}>
                                <th scope="row" className="text-center">
                                  {index + 1}
                                </th>
                                <td>{item.quizz?.name || "Not found"}</td>
                                <td className="text-center">
                                  {getScore(item.score, item.total)}
                                </td>
                              </tr>
                            );
                          return null;
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
              <Col className="hidden-widget" lg="auto" style={{ width: 280 }}>
                <Widget />
              </Col>
            </Row>
          </>
        )}
      </div>
    </section>
  );
}
export default HistoryQuiz;
