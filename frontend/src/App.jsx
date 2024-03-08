import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import axios from "axios";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [payrolls_list, setPayrolls_list] = useState([]);

  const getPayrolls = async () => {
    try {
      const { data } = await axios.get("api/show/payrolls"); // Added await here
      setPayrolls_list(data);
      console.log(payrolls_list, 'payrolls_list');
    } catch (error) {
      console.log(error, "the error axios");
    }
  };
  

  useEffect(() => {
    // getPayrolls();
    console.log(JSON.stringify(payrolls_list , 2, 1), 'payrolls_list');
  }, [payrolls_list]);
  
  return (
    <>
      <Header />
      <div className="container">
        <div
          className="form"
          style={{ paddingBottom: "50px", paddingTop: "50px" }}
        >
          <form>
            <div
              className="form-wrapper"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  name="firstName"
                />
              </div>
              <div style={{ flex: 1, marginRight: "10px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="last name"
                  name="lastName"
                />
              </div>

              {editMode ? (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-success"
                >
                  edit
                </button>
              ) : (
                <button
                  type="submit"
                  style={{ width: "200px", marginLeft: "10px" }}
                  className="btn btn-success"
                >
                  add
                </button>
              )}
            </div>
          </form>
        </div>

        <table className="Table">
          <tbody>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">first name</th>
                <th scope="col">last name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
          </tbody>

          <tr>
            <th>
              <td scope="row"> 1</td>
              <td>John</td>
              <td>Doe</td>
              <td>
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: "green", cursor: "pointer" }}
                ></i>
                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "red", cursor: "pointer" }}
                ></i>
              </td>
            </th>
          </tr>
        </table>
      </div>
    </>
  );
}

export default App;
