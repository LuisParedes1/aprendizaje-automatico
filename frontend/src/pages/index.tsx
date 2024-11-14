"use client";

import { useState } from "react";
import { PostCard } from "./components/postCard";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

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
      <div>
        <PostCard
          post={inputValue}
          handleInputChange={handleInputChange}
          handleOnClick={handleOnClick}
        />
      </div>

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
