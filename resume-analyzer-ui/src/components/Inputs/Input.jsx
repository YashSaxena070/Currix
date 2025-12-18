import React, { useState } from 'react';
import { Eye, EyeOff } from "lucide-react";

const Input = ({ value, onChange, label, placeholder, type, disabled, className }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex flex-col gap-1.5 mb-4">
      {label && <label className="text-xs text-slate-800">{label}</label>}
      <div className="flex items-center bg-slate-100 rounded-md border border-slate-200 px-3">
        <input
          type={type === "password" ? (isShowPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full text-sm bg-transparent py-2.5 outline-none text-slate-900 placeholder:text-gray-400 placeholder:opacity-50 placeholder:italic custom-input ${className || ""}`}
          disabled={disabled}
        />
        
        {type === "password" && (
          <div className="cursor-pointer text-slate-500 hover:text-slate-700" onClick={toggleShowPassword}>
            {isShowPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
