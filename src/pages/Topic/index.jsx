/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList } from "store/Topic/action";
import ModalBlock from "../../components/common/Modal";
import TemplateContent from "../../components/layout/TemplateContent";

function Topic(props) {
  const { isLoading, isSuccess, isFailure, list, params, meta } = useSelector(
    (state) => state.topicReducer
  );
  console.log("Topic  list:", list, params);

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));

  useEffect(() => {
    if (!isLoading) onGetListTopic(params);
  }, []);

  return (
    <>
      <TemplateContent title="Danh sách chủ đề">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Chủ đề</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td className="align-middle">{item.name}</td>
                <td className="align-middle">
                  <img
                    src={item.image}
                    alt={item.name}
                    witdh={50}
                    height={50}
                  />
                  <Image src="holder.js/171x180" rounded />
                </td>
                <td className="align-middle"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </TemplateContent>
      <ModalBlock title="Khóa tài khoản">haha</ModalBlock>
    </>
  );
}

export default Topic;
