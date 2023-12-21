/* eslint-disable react-hooks/exhaustive-deps */
import { ROUTES } from "constants/routerWeb";
import { parserRouter } from "helper/function";
import _size from "lodash/size";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actionGetList } from "store/Quiz/action";
function Quiz() {
  const {
    listStatus: { isLoading },
    list,
    params,
  } = useSelector((state) => state.quizReducer);

  const dispatch = useDispatch();
  const onGetListQuiz = (body) => dispatch(actionGetList(body));
  // const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading && list.length === 0)
      onGetListQuiz({ ...params, limit: 50 });
    // return () => {
    //   onResetData();
    // };
  }, []);

  return (
    <div className="mb-5">
      {isLoading && _size(list) === 0 && (
        <div
          className="d-flex justify-content-center align-items-center w-full"
          style={{ height: 400 }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Row className="mb-3">
        {list.map((item, index) => (
          <Col xs="12" sm="6" md="3" className="p-2" key={index}>
            <Card bsPrefix="card h-100">
              <Card.Img variant="top" src={item.image} />
              <Card.Body className="pb-5">
                <Card.Title>{item.name}</Card.Title>
                <Link to={parserRouter(ROUTES.START_QUIZ, item.id)}>
                  <Button
                    variant="primary"
                    className="position-absolute positionX-center bottom-12px"
                  >
                    Start Quiz!
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default Quiz;
