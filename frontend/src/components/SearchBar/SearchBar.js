import { InputField } from "@enact/sandstone/Input";
import { useState } from "react";
import { request } from "../../request/request";
import { useNavigate } from "../../hooks/useNavigate";
import { panelName } from "../../constants/panelName";
import debugLog from "../../libs/log";

const SearchBar = ({setShowSearch}) => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const onComplete = async () => {
    setShowSearch(false);
    console.log('oncomoplete');
    try {
      const response = await request(`/restaurant/search?query=${input}`);
      if (response && response.restaurant_id) {
        debugLog('Search[S]');
        navigate(panelName.info, {restaurant_id: response.restaurant_id});
      } else {
        debugLog('Search[W]: no result');
      }
    } catch (error) {
      debugLog('Search[E]: search fail');
    };
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      onComplete();
    };
  };
  
  return (
    <InputField 
      type="text"
      onKeyUp={handleKeyUp}
      onChange={(e) => setInput(e.value)}
      placeholder="Search Restaurant!"
      onDeactivate={() => setShowSearch(false)}
    />
  )
};

export default SearchBar;