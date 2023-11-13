import { useRef, useState } from "react";
// import { useAuth } from "../contexts/AuthConext";
//import { Link } from "react-router-dom";
import PlateForm from "./PlateForm";
import AutoDisplay from "./AutoDisplay";

export default function AutoLookup() {
  const plateRef = useRef(null);

  const [auto, setAuto] = useState(null);

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("PlateRef: " + plateRef.current.value);
    //Validate number
    //  - for now well just give it a min length
    const plate = plateRef.current.value;
    plateRef.current.value = "";
    console.log("PlateRef:Length " + plate.length);
    if (plate.length < 4 || plate.length > 8) {
      return setError("Passwords do not match");
    }

    //Else load the auto data, and display it:
    try {
      const returnedAuto = await loadAutoByPlate(plate);
      console.log("handleSubmit: auto: " + returnedAuto.toString());
      console.log(returnedAuto);
      setAuto(returnedAuto);
    } catch (error) {
      setAuto(null);
      console.log("error" + error);
      setError("Invalid plate numner!!");
    }
    setError("");
  }

  //If there is an auto loaded, show it
  return (
    <>
      <PlateForm plateRef={plateRef} handleSubmit={handleSubmit} />
      {auto !== null ? <AutoDisplay auto={auto} /> : <div>Auto is null</div>}
    </>
  );
}

async function loadAutoByPlate(thisPlate) {
  console.log("loadAuto");
  const res = await fetch(`/api/autos/plate/` + thisPlate);
  console.log("loadAuto: " + res.status);
  console.log(res);

  if (!res.ok) {
    console.log("Could not fetch Customer By Plate ");
    throw new Error("Could not fetch Customer By Plate " + thisPlate);
  }
  return res.json();
}
