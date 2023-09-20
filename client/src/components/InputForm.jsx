import React from "react";
import { useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const InputForm = () => {
  /* generate houers */
  const startTime = new Date();
  startTime.setHours(8, 0, 0);

  const endTime = new Date();
  endTime.setHours(20, 0, 0);

  const timeOptions = [];
  while (startTime <= endTime) {
    const formattedTime = startTime.toLocaleTimeString(["en-US"], {
      hour: "2-digit",
      minute: "2-digit",
    });
    timeOptions.push(formattedTime);

    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  /* connect to the api */

  // Input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [time, setTime] = useState("");

  const [dataVisible, setDataVisible] = useState(false); // Track visibility state
  const [errorMessage, setErrorMessage] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [timeError, setTimeError] = useState(false);

  const [responseData, setResponseData] = useState([]); // Get response

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handlePostRequest = () => {
    // Clear any previous error messages and reset error states
    setErrorMessage("");
    setFirstNameError(false);
    setLastNameError(false);
    setTimeError(false);

    // Check if any of the required fields are empty
    if (!firstName || !lastName || !time) {
      setErrorMessage("Please fill in all required fields.");
      if (!firstName) {
        setFirstNameError(true);
      }
      if (!lastName) {
        setLastNameError(true);
      }
      if (!time) {
        setTimeError(true);
      }
      return; // Exit the function if validation fails
    }

    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request";

    // Data to send in the request body
    const postData = {
      firstName: firstName, // Use the input value here
      lastName: lastName,
      time: time,
    };

    // Make the POST request using Axios
    axios
      .post(apiUrl, postData)
      .then(function (response) {
        // Handle the response data here
        console.log("Response:", response.data);

        // Clear the form by resetting the input values
        setFirstName("");
        setLastName("");
        setTime("");

        // Trigger a GET request to refresh the data
        handleGetRequest();
      })
      .catch(function (error) {
        console.error("Ops:", error.response.data.message);
        // Handle any errors from the server
      });
  };

  const handleGetRequest = () => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request/requests";

    // Make the GET request using Axios
    axios
      .get(apiUrl)
      .then(function (response) {
        // Handle the response data here
        setResponseData(response.data);
        // console.log("Response:", response.data);
      })
      .catch(function (error) {
        console.error("Ops:", error);
      });
  };

  const handleDelete = (id) => {
    // Define the API endpoint URL
    const apiUrl = "http://localhost:4001/request/delete/" + id;

    // Make the POST request using Axios
    axios
      .delete(apiUrl)
      .then(handleGetRequest)
      .catch(function (error) {
        console.error("Ops:", error);
      });
  };

  return (
    <>
      <div className="text-lg font-bold bg-slate-200 px-6 py-4 rounded-2xl ">
        <h1 className="text-center mb-2">Add New Record</h1>
        <div className="pb-4 flex">
          <label className="pr-2 my-auto">Firstname:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleFirstNameChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              firstNameError ? "border-2 border-red-500" : ""
            }`}
          ></input>
        </div>

        <div className="pb-4 flex">
          <label className="pr-2 my-auto">Lastname:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleLastNameChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              lastNameError ? "border-2 border-red-500" : ""
            }`}
          ></input>
        </div>

        <div className="pb-4 flex">
          <label className=" pr-2 my-auto">Time:</label>
          <select
            name="time"
            id="time"
            value={time}
            onChange={handleTimeChange}
            className={`bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold w-100 ml-auto ${
              timeError ? "border-2 border-red-500" : ""
            }`}
          >
            <optgroup label="Select Time">
              {timeOptions.map((time, index) => (
                <option value={time}>{time}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Display the error message */}
        {errorMessage && (
          <div className="text-red-500 mb-2">{errorMessage}</div>
        )}

        <div className="flex">
          <button
            onClick={handlePostRequest}
            className="mx-auto hover:bg-teal-300 bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold border-0"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="text-lg font-bold bg-slate-200 px-6 py-4 rounded-2xl mt-4">
        <h1 className="text-center mb-2">Show Previous Records</h1>
        <div className="flex">
          <button
            onClick={() => {
              // Then, make the GET request
              if (!dataVisible) handleGetRequest();

              // Toggle data visibility when the button is clicked
              setDataVisible(!dataVisible);
            }}
            className="mx-auto hover:bg-teal-300 bg-teal-50 duration-200 rounded-xl px-4 py-2 mt-2 font-bold border-0"
          >
            Get Data
          </button>
        </div>
        <div className="mt-2">
          {dataVisible ? (
            responseData.map((item, index) => (
              <div key={index} className="flex">
                <button
                  onClick={() => handleDelete(item._id)} // Pass a callback function here
                  className="hover:text-red-700 hover:scale-105 duration-200 mr-2"
                >
                  <AiFillDelete />
                </button>
                <p>
                  {index + 1}- {item.firstName} {item.lastName} - {item.time}
                </p>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default InputForm;
