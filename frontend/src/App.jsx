import "./App.css";
import Header from "./components/header";

function App() {
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
              <button
                type="submit"
                style={{ width: "200px", marginLeft: "10px" }}
                className="btn btn-success"
              >
                + Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
