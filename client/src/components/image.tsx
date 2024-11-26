import React, { useState } from "react";
import blankProfilePicture from "@/assets/default-avatar-profile.jpg";

const ProfilePhotoInput = ({ className }: { className: string }) => {
  const [file, setFile] = useState(blankProfilePicture.src);

  function handleChange(e: any) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <div className={className}>
      <h2 className="block text-sm font-medium text-gray-700">
        Add Profile Photo:
      </h2>
      <img src={file} className="size-24 object-contain my-2" />
      <input type="file" onChange={handleChange} />
    </div>
  );
};

export default ProfilePhotoInput;