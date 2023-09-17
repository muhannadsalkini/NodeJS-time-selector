import React from "react";

function App() {
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

  return (
    <>
      <div className="bg-slate-100 flex flex-col h-screen">
        <div className="m-auto">
          <form
            action=""
            className="text-lg font-bold bg-slate-200 px-6 py-4 rounded-2xl "
          >
            <div className="pb-4 flex">
              <label className="pr-2 my-auto">Firstname:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold border-0 w-100 ml-auto"
              ></input>
            </div>

            <div className="pb-4 flex">
              <label className="pr-2 my-auto">Lastname:</label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold border-0 w-100 ml-auto"
              ></input>
            </div>

            <div className="pb-4 flex">
              <label className=" pr-2 my-auto">Time:</label>
              <select
                name="time"
                id="timeSelect"
                className="hover:bg-teal-300 bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold text-lg border-0 w-100"
              >
                <optgroup label="Select Time">
                  {timeOptions.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div className="flex">
              <button
                type="submit"
                className="mx-auto hover:bg-teal-300 bg-teal-50 duration-200 rounded-xl px-4 py-2 font-bold border-0"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
