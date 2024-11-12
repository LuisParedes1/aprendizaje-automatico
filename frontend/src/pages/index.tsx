"use client";

import { useState } from "react";

const BASE_ENDPOINT = "http://localhost:8000";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [emotion, setEmotion] = useState<null | string>(null);
  const handleOnClick = async () => {
    console.log("Fetching Emotion");
    const data = await fetch(BASE_ENDPOINT + "/predict?tweet=" + inputValue);
    const response = await data.json();
    setEmotion(response.emotion);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Input Display</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={handleInputChange}
        className="w-80 h-15 p-2 bg-white text-black border border-gray-300 placeholder-gray-500 resize-none"
      />
      <br />
      <br />

      <button
        onClick={handleOnClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Click me!
      </button>

      {emotion && (
        <div>
          <p className="text-lg font-semibold text-black mt-4">
            You are feeling:
          </p>
          <p className="text-2xl mt-2 text-black">{emotion}</p>
        </div>
      )}
    </div>
  );
}
