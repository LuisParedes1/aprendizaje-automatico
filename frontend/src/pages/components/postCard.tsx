import { Dispatch, SetStateAction } from "react";

export const PostCard = ({
  post,
  handleInputChange,
  handleOnClick,
}: {
  post: string;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnClick: () => void;
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-black">Input Display</h2>
      <input
        type="text"
        placeholder="Type something..."
        value={post}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            handleOnClick();
          }
        }}
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
    </div>
  );
};
