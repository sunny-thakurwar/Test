import { useEffect, useState } from "react";
import "./scss/index.scss";
import Form from "./components/Form";
import ConditionalRender from "./components/ConditionalRender";

function App() {
  const [TaskList, setTaskList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleFetch() {
    const data = await fetch("https://669e81a59a1bda368006cea4.mockapi.io/list")
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    const response = await data.json();
    setTaskList(response);
  }

  useEffect(() => {
    handleFetch();
  }, []);

  function handleDelete(id) {
    setIsLoading(true);
    fetch(`https://669e81a59a1bda368006cea4.mockapi.io/list/${Number(id)}`, {
      method: "DELETE",
    })
      .then(() => {
        handleFetch();
      })
      .catch((err) => {
        setError(err);
      });
  }

  return (
    <div className="container">
      <Form
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
        handleFetch={handleFetch}
      />
      <h1>Contact list</h1>
      <div className="container__list">
        <ConditionalRender isLoading={isLoading} isError={error}>
          {TaskList?.map((item) => {
            return (
              <div className="container__card">
                <p>name : {item.name || "-"}</p>
                <p>city : {item.city || "-"}</p>
                <p>address : {item.streetAddress || "-"}</p>
                <button
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ConditionalRender>
      </div>
    </div>
  );
}

export default App;
