import React from "react";
import Input from "../../../components/Inputs/Input";
import { Plus, Trash2 } from "lucide-react";
import RatingInput from "../../../components/ResumeSections/RatingInput";

const AdditionalInfoFrom = ({
  languages,
  interests,
  updateArrayItem,
  addArrayItem,
  removeArrayItem,
}) => {
  return (
    <div className="px-5 pt-5 pb-10">
      <h2 className="text-lg font-semibold text-gray-900">
        Additional Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4">
        {/* Languages Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Languages</h3>
          <div className="flex flex-col gap-4">
            {languages.map((language, index) => (
              <div
                key={index}
                className="border border-gray-200/80 p-4 rounded-lg relative"
              >
                <Input
                  label="Language"
                  placeholder="English"
                  type="text"
                  value={language.name || ""}
                  onChange={({ target }) =>
                    updateArrayItem("languages", index, "name", target.value)
                  }
                />

                <div className="mt-3">
                  <label className="text-[13px] text-slate-800 mb-1">
                    Proficiency
                  </label>
                  <RatingInput
                    value={language.progress || 0}
                    total={5}
                    onChange={(newValue) =>
                      updateArrayItem("languages", index, "progress", newValue)
                    }
                  />
                </div>

                {languages.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer"
                    onClick={() => removeArrayItem("languages", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
              onClick={() =>
                addArrayItem("languages", {
                  name: "",
                  progress: 0,
                })
              }
            >
              <Plus size={16} /> Add Language
            </button>
          </div>
        </div>

        {/* Interests Section */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Interests</h3>
          <div className="flex flex-col gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="relative">
                <Input
                  label={`Interest ${index + 1}`}
                  placeholder="Photography"
                  type="text"
                  value={interest || ""}
                  onChange={({ target }) =>
                    updateArrayItem("interests", index, null, target.value)
                  }
                />

                {interests.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-9 right-3 text-red-600 hover:text-red-800 cursor-pointer"
                    onClick={() => removeArrayItem("interests", index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              className="self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer"
              onClick={() => addArrayItem("interests", "")}
            >
              <Plus size={16} /> Add Interest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoFrom;
