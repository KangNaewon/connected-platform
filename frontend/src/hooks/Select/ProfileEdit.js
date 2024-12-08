import { InputField } from "@enact/sandstone/Input";
import { useState } from "react";

const ProfileEdit = ({ onComplete, oldProfile }) => {
  const [input, setInput] = useState("");
  const old_profile = oldProfile || null;

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      console.log(input);
      if (old_profile) {
        onComplete(old_profile, input); 
      } else {
        onComplete(input);
      }
    }
  };

  return (
    <InputField
      type="text"
      onKeyUp={handleKeyUp}
      onChange={(e) => setInput(e.value)}
      placeholder="New Profile Name"
    />
  );
};

export default ProfileEdit;
