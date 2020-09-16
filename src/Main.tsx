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

const isEmpty = (str: string): boolean => {
  if (str == "" || !str.replace(/\s/g, "").length) {
    return true;
  }
  return false;
};
type MainProps = {
  location: { state: { name: string } };
};

export interface EduProps {
  school: string;
  startDate: string;
  endDate: string;
  degree: string;
  grade: string;
  study: string;
  description: string;
}

const Edu: React.FC<EduProps> = ({
  school,
  startDate,
  endDate,
  degree,
  grade,
  study,
  description
}) => {
  return (
    <EduDiv>
      <h2>{school}</h2>
      {
        <h3>
          {isEmpty(degree) ? null : degree} {isEmpty(study) ? null : study}{" "}
          {isEmpty(grade) ? null : grade}
        </h3>
      }
      <p>
        {startDate} - {endDate}
      </p>
      <p>{description}</p>
    </EduDiv>
  );
};
const Main: React.FC<MainProps> = props => {
  const [eduList, setEdu] = useState<EduProps[]>([]);
  useEffect(() => {
    console.log(props.location.state.name);
  });

  return (
    <div>
      <CenteredBox>
        <div>Welcome to {props.location.state.name}'s education page! </div>
        <MyModal eduList={eduList} setEdu={setEdu}></MyModal>
      </CenteredBox>

      <FlexContainer>
        <BookmarkBox>
          {eduList.map((x: EduProps) => {
            return (
              <CenteredButton key={new Date().getTime() + Math.random()}>
                {x.school}
              </CenteredButton>
            );
          })}
        </BookmarkBox>
        <EduContainer>
          {eduList.map((x: EduProps) => {
            return (
              <Edu
                key={new Date().getTime() + Math.random()}
                school={x.school}
                startDate={x.startDate}
                endDate={x.endDate}
                degree={x.degree}
                grade={x.grade}
                study={x.study}
                description={x.description}
              />
            );
          })}
        </EduContainer>
      </FlexContainer>
    </div>
  );
};
export default Main;
