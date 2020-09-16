import React, { useState } from "react";
import { CenteredBox, CenteredButton, NameInput } from "./HomeStyles";
import { useHistory } from "react-router-dom";
const Home: React.FC = () => {
  const history = useHistory();
  const [inputText, setText] = useState("");

  const nextPage = () => {
    if (inputText === "") {
      window.alert("Name cannot be empty!");
      return;
    }
    //push to history here

    history.push({
      pathname: "/main",
      state: { name: inputText }
    });
    setText("");
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.keyCode === 13) {
      nextPage();
      // push to history TODO
    }
  };
  const handleEnter = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    nextPage();
  };

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>): any => {
    setText(e.target.value);
  };
  return (
    <div>
      <CenteredBox>
        <div style={{ paddingBottom: "70px" }}>
          Hi there! Welcome to your education showcase.
        </div>
        <div style={{ paddingBottom: "10px" }}>
          Type your name and click "Enter" below to begin!
        </div>
        <NameInput
          value={inputText}
          onChange={onTextChange}
          onKeyDown={handleKeyPress}
        />
        <div>
          <CenteredButton onClick={handleEnter}>Enter</CenteredButton>
        </div>
      </CenteredBox>
    </div>
  );
};

export default Home;
