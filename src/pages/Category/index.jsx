import React, { useState } from "react";
import ModalBlock from "../../components/common/Modal";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import TemplateContent from "../../components/layout/TemplateContent";

function Category(props) {
  const [data, setData] = useState(null);
  return (
    <>
      <TemplateContent title="Danh sách danh mục">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Mật khẩu</th>
              <th scope="col">Email </th>
              <th scope="col">Trạng thái khóa </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <th scope="row">{item}</th>
                <td className="align-middle">Mark {item}</td>
                <td className="align-middle">Otto {item}</td>
                <td className="align-middle">@mdo {item}</td>
                <td className="align-middle">
                  <ToggleSwitch status={false} callback={() => setData(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TemplateContent>
      <ModalBlock title="Khóa tài khoản">haha {data}</ModalBlock>
    </>
  );
}

export default Category;
