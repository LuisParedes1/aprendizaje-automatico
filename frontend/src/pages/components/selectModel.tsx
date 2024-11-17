import React from "react";

export default function SelectModel({
  handleSelectedModel,
}: {
  handleSelectedModel: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const MODELS: { value: string; name: string }[] = [
    { value: "logistic_regression_model", name: "Logistic Regression" },
    { value: "multinomial_nb_model", name: "Multinomial NB" },
    // { value: "extra_trees_model", name: "Extra Trees Classifier" },
  ];
  return (
    <div className="w-full max-w-xs">
      <select
        id="age-select"
        onChange={handleSelectedModel}
        className="bg-slate-100 text-slate-600 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
      >
        <option value="" disabled>
          Select a model
        </option>
        {MODELS.map((model, index) => (
          <option key={index} value={model.value}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}
