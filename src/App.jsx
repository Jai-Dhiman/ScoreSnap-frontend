import Component from "./component.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="app-container bg-dark text-light min-vh-100">
      <div className="container py-4">
        <header className="mb-4 text-center">
          <h1>ScoreSnap</h1>
        </header>
        <main>
          <Component />
        </main>
        <footer className="mt-4 text-center"></footer>
      </div>
    </div>
  );
}

export default App;
