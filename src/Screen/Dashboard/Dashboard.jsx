import { Paper } from "@mui/material";
import axios from "../../api/axios";
import React, { useEffect, useState, lazy } from "react";
import { Card } from "react-bootstrap";
import Cookies from "js-cookie";

const BarChart = lazy(() => import("./Chart"));

function boxes(list) {
  let element = [];
  list.map((data) =>
    element.push(
      <div key={data.fieldName} className="col-lg-3 col-sm-6">
        <Card
          className={
            "card bg-" +
            data.bg +
            " text-high-emphasis-inverse p-3 mb-2 text-white"
          }
          elevation={3}
          style={{
            opacity: "80%",
            marginLeft: "20px",
            marginTop: "20px",
            textAlign: "center",
            width: "180px",
            height: "180px",
          }}
        >
          <h5
            style={{
              marginLeft: "10px",
              textAlign: "left",
              paddingTop: "10px",
              marginBottom: "10px",
            }}
          >
            {data.fieldName}
          </h5>
          <h1
            style={{
              marginLeft: "10px",
              textAlign: "left",
              paddingTop: "20px",
              marginBottom: "10px",
            }}
          >
            {data.value}
          </h1>
        </Card>
      </div>
    )
  );
  return element;
}
function Dashboard() {
  const [data, setData] = useState([]);
  const list = [
    { fieldName: "Managers", value: 0, bg: "primary" },
    { fieldName: "Pharmacists", value: 0, bg: "info" },
    { fieldName: "Delivery Men", value: 0, bg: "warning" },
    { fieldName: "Medicines", value: 0, bg: "danger" },
    { fieldName: "Sales", value: 0, bg: "success" },
  ];

  const chartList = [
    {
      name: "Managers",
      Count: data.length > 0 ? data[0].value : 0,
      amt: 20,
    },
    {
      name: "Pharmacists",
      Count: data.length > 0 ? data[1].value : 0,
      amt: 20,
    },
    {
      name: "Delivery Men",
      Count: data.length > 0 ? data[2].value : 0,
      amt: 20,
    },
    {
      name: "Medicines",
      Count: data.length > 0 ? data[3].value : 0,
      amt: 20,
    },
    {
      name: "Sales",
      Count: data.length > 0 ? data[4].value : 0,
      amt: 20,
    },
  ];

  useEffect(() => {
    axios
      .post("/get-dashboard-details", {
        secretKey: Cookies.get(process.env.REACT_APP_SECRET_COOKIE_KEY),
      })
      .then((resp) => {
        list[0].value = resp.data.managersCount;
        list[1].value = resp.data.pharmacistsCount;
        list[2].value = resp.data.DeliveryMenCount;
        list[3].value = resp.data.medicinesCount;
        setData(list);
      })
      .catch((err) => console.log("Error fetching data"));
  }, []);
  return (
    <Paper
      elevation={3}
      style={{
        justifyContent: "center",
        margin: "auto",
        backgroundColor: "white",
        width: "1135px",
        height: "640px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "38%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridGap: "12px",
        }}
        className="dashboard"
      >
        {boxes(data)}
      </div>
      <div>
        <Paper
          elevation={3}
          style={{
            marginLeft: "20px",
            backgroundColor: "white",
            width: "1100px",
            height: "380px",
            color: "Black",
            // boxShadow: "10px",
          }}
        >
          <BarChart data={chartList} />
        </Paper>
      </div>
    </Paper>
  );
}

export default Dashboard;
