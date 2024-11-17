"use client";

import { useEffect, useState } from "react";
import PostCard from "./components/postCard";

const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_URL;
const DEFAULT_MODEL: string = "logistic_regression_model";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [emotion, setEmotion] = useState<string | null>(null);

  const [selectedModel, setSelectedModel] = useState<string | null>(
    DEFAULT_MODEL
  );

  const handleSelectedModel = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  useEffect(() => {
    if (!inputValue) {
      setEmotion(null);
    }
  }, [inputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleOnClick = async () => {
    if (!inputValue || !selectedModel) {
      return;
    }

    const query_params = new URLSearchParams({
      tweet: inputValue,
      model_name: selectedModel,
    }).toString();

    try {
      const data = await fetch(`${BASE_ENDPOINT}/predict?${query_params}`, {
        method: "GET",
      });
      const response = await data.json();
      setEmotion(response.emotion);
    } catch {
      console.log("Error fetching data");
    }
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

    return `${emotion} ${emoji}`;
  };

  return (
    <div
      id="app_container"
      className="flex items-center justify-center min-h-screen"
    >
      <div className="w-full max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
        <div id="post_container">
          <PostCard
            post={inputValue}
            handleInputChange={handleInputChange}
            handleOnClick={handleOnClick}
            handleSelectedModel={handleSelectedModel}
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
    </div>
  );
}
