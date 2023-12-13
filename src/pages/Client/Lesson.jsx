/* eslint-disable react-hooks/exhaustive-deps */
import { speak } from "helper/function";
import _size from "lodash/size";
import { useEffect, useState } from "react";
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
  const [lesson, setLesson] = useState(null);
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
      <div class="container">
        <div class="row">
          <div class="col-8 p-2">
            {lesson && (
              <div className="position-relative rounded overflow-hidden">
                <img
                  src={lesson.image}
                  alt={lesson.name}
                  height="100%"
                  width="100%"
                />
                <div
                  className="position-absolute position-center text-white px-3 rounded"
                  style={{ background: "#3b3a3a9c", fontSize: 150 }}
                >
                  <b> {lesson.name}</b>
                </div>
                <div
                  className="position-absolute end-0 top-0 p-3 rounded"
                  style={{ background: "#3b3a3a9c" }}
                >
                  <i
                    class="fas fa-volume-up fs-1 text text-white"
                    onClick={() => speak(lesson.name)}
                  ></i>
                </div>
              </div>
            )}
          </div>
          <div class="col-4 custom-scrollbar max-h-100">
            <Row className="mb-3">
              {list.map((item, index) => (
                <Col xs="12" className="p-2" key={index}>
                  <Card
                    bsPrefix={`card h-100 card_hover ${
                      lesson && lesson.id === item.id && "active"
                    }`}
                    onClick={() => setLesson(item)}
                  >
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
              {isSuccess && list.length === 0 && "Không có bài học nào !"}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Lesson;
