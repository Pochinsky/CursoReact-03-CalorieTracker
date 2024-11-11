import { useReducer, useEffect, useMemo } from "react";
import { activityReducer, initialState } from "./reducers/activity-reducer";
import Form from "./components/Form";
import ActivityList from "./components/ActivityList";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const canRestartApp = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities));
  }, [state.activities]);
  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías
          </h1>
          <button
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: "restart-app" })}
            className={`bg-gray-700 hover:bg-gray-900 p-2 font-bold uppercase text-white rounded-lg text-sm disabled:opacity-10 ${
              canRestartApp() ? "cursor-pointer" : "cursor-not-allowed"
            }`}
          >
            Reiniciar app
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form state={state} dispatch={dispatch} />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList activities={state.activities} dispatch={dispatch} />
      </section>
    </>
  );
}

export default App;
