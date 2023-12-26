/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDashboard } from "store/Dashboard/action";
const enumData = {
  "Tổng số quiz": "totalQuiz",
  "Tổng số câu hỏi": "totalQuestion",
  "Tổng số người dùng": "totalUser",
  "Tổng số danh mục": "totalCategory",
  "Tổng số bài học": "totalLesson",
};
function Dashboard() {
  // const state = {
  //   options: {
  //     chart: {
  //       id: "basic-bar",
  //     },
  //     xaxis: {
  //       categories: [
  //         "Tháng 1",
  //         "Tháng 2",
  //         "Tháng 3",
  //         "Tháng 4",
  //         "Tháng 5",
  //         "Tháng 5",
  //         "Tháng 7",
  //         "Tháng 8",
  //       ],
  //     },
  //   },
  //   series: [
  //     {
  //       name: "Doanh thu",
  //       data: [1000, 2000, 3000, 4000, 5000, 4500, 4800, 6000],
  //     },
  //   ],
  // };
  // const circle = {
  //   options: {
  //     labels: ["Đã bán ra"],
  //   },
  //   series: [70],
  // };

  const { isLoading, isSuccess, data } = useSelector(
    (state) => state.dashboardReducer
  );

  const dispatch = useDispatch();
  const onGetDashboard = () => dispatch(actionDashboard());

  useEffect(() => {
    if (!isLoading) {
      onGetDashboard();
    }
  }, []);

  const donut = {
    options: {
      labels: [
        "Tổng số quiz",
        "Tổng số câu hỏi",
        "Tổng số người dùng",
        "Tổng số danh mục",
        "Tổng số bài học",
      ],
    },
    series: [
      data[enumData["Tổng số quiz"]],
      data[enumData["Tổng số câu hỏi"]],
      data[enumData["Tổng số người dùng"]],
      data[enumData["Tổng số danh mục"]],
      data[enumData["Tổng số bài học"]],
    ],
  };

  return (
    <>
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
        <div className="w-50 mx-auto">
          <h2 className="text-center">Thông tin cơ bản</h2>
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            width="100%"
          />
        </div>
      )}
      {/* <div className="row">
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Doanh thu 2023</h2>
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="100%"
            />
          </div>
        </div>
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2>Thống kê đơn hàng</h2>
          <Chart
            options={donut.options}
            series={donut.series}
            type="donut"
            width="100%"
          />
        </div>

        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2> Doanh thu 2023</h2>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="100%"
          />
        </div>
        <div className="col-xxl-4 col-lg-6 col-md-6 col-xs-12">
          <h2>Tổng số sản phẩm đã bán ra</h2>
          <Chart
            options={circle.options}
            series={circle.series}
            type="radialBar"
            width="100%"
          />
        </div>
      </div> */}
    </>
  );
}

export default Dashboard;
