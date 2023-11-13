import { useRef, useState } from "react";
// import { useAuth } from "../contexts/AuthConext";
//import { Link } from "react-router-dom";

async function loadAutoByPlate(thisPlate) {
  console.log("loadAuto");
  const res = await fetch(`/api/autos/plate/` + thisPlate);
  console.log("loadAuto: " + JSON.stringify(res));
  console.log(res);

  if (!res.ok) {
    throw new Error("Could not fetch Customer By Plate " + thisPlate);
  }
  return res.json();
}

export default function CustomerLookup() {
  const plateRef = useRef();
  const [auto, setAuto] = useState(null);

  //const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("PlateRef: " + plateRef.current.value);
    //Validate number
    //  - for now well just give it a min length
    const plate = plateRef.current.value;
    console.log("PlateRef:Length " + plate.length);
    if (plate.length < 4 || plate.length > 8) {
      return setError("Passwords do not match");
    }
    //Else load the auto data, and display it:
    try {
      const auto = await loadAutoByPlate(plate);
      console.log("handleSubmit: auto: " + auto);
    } catch (error) {
      console.log("Invalid plate numner!!");
      setError("Invalid plate numner!!");
    }
    //const promises = [];
    setLoading(true);
    setError("");
    /*     //Are we changing the Email?
    if (emailRef.current.value !== currentUser.email) {
      console.log("updateProfile:handlesubmit:");
      console.log(
        "updateProfile:handlesubmit:emailRef.current.value: " +
          emailRef.current.value
      );
      promises.push(updateUserEmail(emailRef.current.value));
    }
    //Changing password?
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    } */
  }

  return (
    <>
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Customer Lookup:
        </h2>
        {error && ( //Replace Alert from BS
          <div className="font-regular relative block w-full rounded-lg bg-pink-500 p-4 text-base leading-5 text-white opacity-100">
            {error}
          </div>
        )}
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="plate"
              >
                Plate:
              </label>
              <input
                className="drop-shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="plate"
                ref={plateRef}
                required
                defaultValue={""}
                id="plate"
              />
            </div>

            {/* Button Group  */}
            <div className="flex items-center justify-between">
              <button
                disabled={loading}
                //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Lookup
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
