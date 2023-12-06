/* eslint-disable react-hooks/exhaustive-deps */
import { speak } from "helper/function";
import _size from "lodash/size";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionGetList, resetData } from "store/Lesson/action";
function Lesson() {
  const {
    listStatus: { isLoading, isSuccess },
    list,
    params,
  } = useSelector((state) => state.lessonReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading) onGetListTopic({ ...params, limit: 50, idtopic: id });
    return () => {
      onResetData();
    };
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
                <Button
                  variant="primary"
                  className="position-absolute positionX-center bottom-12px"
                  onClick={() => speak(item.name)}
                >
                  Speak
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {isSuccess && list.length === 0 && "Không có bài học nào !"}
      </Row>
    </div>
  );
}
export default Lesson;
