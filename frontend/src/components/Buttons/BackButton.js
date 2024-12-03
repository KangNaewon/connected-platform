import Button from "@enact/sandstone/Button";
import { useBackHandler } from "../../App/AppState";

const BackButton = () => {
  const backHandler = useBackHandler();

  return (
    <Button 
      icon='backspace'
      onClick={backHandler}
    />
  )
}

export default BackButton;