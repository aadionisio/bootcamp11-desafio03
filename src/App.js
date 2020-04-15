import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositorie, setRepositorie] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get(`repositories`);

      setRepositorie(response.data);
    }

    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post(`repositories`, {
      title: "Repositorios Alexandre",
      url: "http://aadionisio.com",
      techs: ["node.js", "ReactJS"],
    });

    setRepositorie([...repositorie, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositories = repositorie.filter(
      (repository) => repository.id !== id
    );

    setRepositorie(repositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorie.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
