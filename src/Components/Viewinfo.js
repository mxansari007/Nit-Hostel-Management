import Button from "@mui/material/Button";
import "./Css/viewinfo.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

//initial toggle state 
const initialSearchState = {
  rollNo: false,
  firstName: false,
  lastName: false,
  departement: false
};


//for Toggeling inputs
const Reducer = (state, action) => {
  switch (action.type) {
    case "Roll No":
      return {
        rollNo: !state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
    case "First Name":
      return {
        rollNo: state.rollNo,
        firstName: !state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
    case "Last Name":
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: !state.lastName,
        departement: state.departement
      };
    case "Departement":
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: !state.departement
      };
    default:
      return {
        rollNo: state.rollNo,
        firstName: state.firstName,
        lastName: state.lastName,
        departement: state.departement
      };
  }
};

export default function App() {
  //using useForm hooks for state management of forms
    const form = useForm({
    defaultValues: {
      rollNo: "",
      firstName: "",
      lastName: "",
      departement: ""
    }
  });

  const { register, handleSubmit, control } = form;
  const labels = ["Roll No", "First Name", "Last Name", "Departement"];
  const [state, dispatch] = useReducer(Reducer, initialSearchState);

  const handleChange = (event) => {
    dispatch({ type: event.target.name });
  };

  const onSubmit = (data) => {
    console.log(data);
    //place your axios here
  };

  return (
    <div className="App">
      <h1>Search Records</h1>
      <form className="Container" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {labels.map((label) => (
            <FormControlLabel
              control={<Checkbox key={label} name={label} onChange={handleChange} />}
              label={label}
            />
          ))}
        </div>
        {state.rollNo ? (<input {...register("rollNo")} placeholder="Roll no" />) : null}
        {state.firstName ? (<input {...register("firstName")} placeholder="First Name" />) : null}
        {state.lastName ? (<input {...register("lastName")} placeholder="Last Name" />) : null}
        {state.departement ? (<input {...register("departement")} placeholder="Departement" />) : null}
        <Button id="Submitbt" type="submit" variant="contained">
          Search
        </Button>
      </form>
      <DevTool control={control} />
    </div>
  );
}
