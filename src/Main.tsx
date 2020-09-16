import React, { useEffect, useState } from "react";
import {
  CenteredBox,
  BookmarkBox,
  CenteredButton,
  FlexContainer,
  EduContainer,
  EduDiv
} from "./MainStyles";
import MyModal from "./MyModal";

type MainProps = {
  location: { state: { name: string } };
};

const Main: React.FC<MainProps> = props => {
  useEffect(() => {
    console.log(props.location.state.name);
  });

  return (
    <div>
      <CenteredBox>
        <div>Welcome to {props.location.state.name}'s education page! </div>
        <MyModal></MyModal>
      </CenteredBox>

      <FlexContainer>
        <BookmarkBox>
          <CenteredButton>
            California Polytechnic State University: San Luis Obispo
          </CenteredButton>
        </BookmarkBox>
        <EduContainer>
          <EduDiv>
            <h2>Cal Poly SLO</h2>
            <h3>B.S Software Engineering</h3>
            <p>September 14, 2015 - December 2016</p>
            <p>• bullet 1</p>
            <p>• bullet 2</p>
          </EduDiv>
          <EduDiv>
            <h2>Marshall Fundamental</h2>
            <h3>B.S Software Engineering</h3>
            <p>September 14, 1212412 - June 2015</p>
            <p>• bullet 1</p>
            <p>• bullet 2</p>
          </EduDiv>
          <EduDiv>
            <h2>Marshall Fundamental</h2>
            <h3>B.S Software Engineering</h3>
            <p>September 14, 1212412 - June 2015</p>
            <p>• bullet 1</p>
            <p>• bullet 2</p>
          </EduDiv>
          <EduDiv>
            <h2>Marshall Fundamental</h2>
            <h3>B.S Software Engineering</h3>
            <p>September 14, 1212412 - June 2015</p>
            <p>• bullet 1</p>
            <p>• bullet 2</p>
          </EduDiv>
        </EduContainer>
      </FlexContainer>
    </div>
  );
};
export default Main;
