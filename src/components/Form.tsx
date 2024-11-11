import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  state: ActivityState;
  dispatch: Dispatch<ActivityActions>;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: "",
  calories: 0,
};

export default function Form({ state, dispatch }: FormProps) {
  // State
  const [activity, setActivity] = useState<Activity>(initialState);

  // Form validation
  const isValidActivity = () =>
    activity.name.trim() !== "" && activity.calories > 0;

  // Handlers
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  };

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* FIELD: category */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoría
        </label>
        <select
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* FIELD: name */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad
        </label>
        <input
          name="name"
          id="name"
          type="text"
          placeholder="Ej: Arroz con huevo"
          value={activity.name}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        />
      </div>
      {/* FIELD: calories */}
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias
        </label>
        <input
          name="calories"
          id="calories"
          type="number"
          placeholder="Ej: 500"
          value={activity.calories}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        />
      </div>
      <input
        type="submit"
        value={
          state.activeId
            ? "Actualizar " + (activity.category === 1 ? "comida" : "ejercicio")
            : "Guardar " + (activity.category === 1 ? "comida" : "ejercicio")
        }
        disabled={!isValidActivity()}
        className={`bg-gray-700 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white transition disabled:opacity-10 ${
          isValidActivity() ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      />
    </form>
  );
}
