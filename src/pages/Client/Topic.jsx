/* eslint-disable react-hooks/exhaustive-deps */
import _size from "lodash/size";
import { useEffect } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList, resetData } from "store/Topic/action";
function Topic() {
  const {
    listStatus: { isLoading },
    list,
    params,
  } = useSelector((state) => state.topicReducer);

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));
  const onResetData = () => dispatch(resetData());

  useEffect(() => {
    if (!isLoading) onGetListTopic({ ...params, limit: 50 });
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
          <Col xs="12" sm="6" md="3" className="p-2">
            <Card bsPrefix="card h-100">
              <Card.Img variant="top" src={item.image} />
              <Card.Body className="pb-5">
                <Card.Title>{item.name}</Card.Title>
                <Button
                  variant="primary"
                  className="position-absolute positionX-center bottom-12px"
                >
                  Study Now!
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default Topic;
