"use client";

import { useEffect, useState } from "react";
import { PostCard } from "./components/postCard";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [emotion, setEmotion] = useState<null | string>(null);

  useEffect(() => {
    if (!inputValue) {
      setEmotion(null);
    }
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnClick = async () => {
    if (!inputValue) {
      return;
    }
    const data = await fetch(BASE_ENDPOINT + "/predict?tweet=" + inputValue);
    const response = await data.json();
    setEmotion(response.emotion);
  };

  const get_emotion_message = (emotion: string) => {
    var emoji = "";
    switch (emotion) {
      case "anger":
        emoji = "😠";
        break;
      case "fear":
        emoji = "😨";
        break;
      case "joy":
        emoji = "😄";
        break;
      case "sadness":
        emoji = "😢";
        break;
      case "surprise":
        emoji = "😲";
        break;
      case "love":
        emoji = "😍";
        break;
      default:
        return "I don't know what you're feeling 🤔";
    }

    return emotion + emoji;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div id="post_container">
        <PostCard
          post={inputValue}
          handleInputChange={handleInputChange}
          handleOnClick={handleOnClick}
        />
      </div>

      {emotion && (
        <div id="emotion_container" className="text-center  mt-4">
          <p className="text-black text-xl font-semi-bold">
            You are feeling: {get_emotion_message(emotion)}
          </p>
        </div>
      )}
    </div>
  );
}
