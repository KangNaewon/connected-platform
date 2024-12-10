import { InputField } from "@enact/sandstone/Input";
import { useState } from "react";
import { request } from "../../request/request";
import debugLog from "../../libs/log";

const SearchBar = ({ setShowSearch, setSearchResult, setSearchList }) => {
  const [input, setInput] = useState('');

  const onComplete = async () => {
    console.log('oncomoplete');
    try {
      const response = await request(`/restaurant?q=${input}`, "GET");
      debugLog('Search[R]', response);
      setSearchList(response);
      setSearchResult(true);
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
    // onDeactivate={() => setShowSearch(false)}
    />
  )
};

export default SearchBar;