import React, { useRef, useState } from "react";
import { User, Upload, X } from "lucide-react";
import { uploadImage } from "../../utils/uploadImage";
import toast from "react-hot-toast";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to server
      setIsUploading(true);
      try {
        const response = await uploadImage(file);
        console.log("Upload response:", response);
        if (response.imageUrl) {
            setImage(response.imageUrl);
            toast.success("Image uploaded successfully");
        } else {
            console.error("Upload response missing imageUrl:", response);
            toast.error("Upload failed: Invalid server response");
        }
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    setPreview("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="text-slate-400 w-10 h-10" />
        )}
        
        {isUploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
        >
          <Upload size={14} />
          {isUploading ? "Uploading..." : "Upload Photo"}
        </button>
        
        {preview && (
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
            onClick={handleRemoveImage}
          >
            <X size={14} />
            Remove
          </button>
        )}
        
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
