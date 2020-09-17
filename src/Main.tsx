import React, { useEffect, useState } from "react";

import {
  CenteredBox,
  BookmarkBox,
  CenteredButton,
  FlexContainer,
  EduContainer,
  EduDiv,
  RightButton
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
  boxId: number | null;
  bookMarkId: number | null;
  deleteFunc: ((itemToDelete: number | null) => void) | null;
}

export interface ListProps {
  itemId: number | null;
}

const Main: React.FC<MainProps> = props => {
  const [eduList, setEdu] = useState<EduProps[]>([]);
  useEffect(() => {
    console.log(props.location.state.name);
  });

  const handleDelete = (itemToDelete: number | null) => {
    const newList = eduList.filter(item => item.boxId !== itemToDelete);

    setEdu(newList);
  };
  const Edu: React.FC<EduProps> = ({
    school,
    startDate,
    endDate,
    degree,
    grade,
    study,
    description,
    boxId,
    deleteFunc
  }) => {
    const deleteDivs = (
      e: React.MouseEvent<HTMLElement>,
      boxId: number | null
    ) => {
      if (e.target) {
        console.log(boxId);
      }
    };
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
        <div style={{ display: "flex" }}>
          <p>{description}</p>
          <div style={{ width: "100%", float: "right" }}>
            <RightButton style={{ border: "solid" }}>Edit</RightButton>
            <RightButton
              style={{ marginTop: "15px", border: "solid" }}
              onClick={() => {
                deleteFunc ? deleteFunc(boxId) : console.error("delete failed");
              }}
            >
              Delete
            </RightButton>
            <MyModal
              eduList={eduList}
              setEdu={setEdu}
              editing={true}
              eduProps={{
                school,
                startDate,
                endDate,
                degree,
                grade,
                study,
                description,
                boxId,
                bookMarkId: null,
                deleteFunc
              }}
              elementBeingEdited={null}
            ></MyModal>
          </div>
        </div>
      </EduDiv>
    );
  };

  return (
    <div>
      <CenteredBox>
        <div>Welcome to {props.location.state.name}'s education page! </div>
        <MyModal
          eduList={eduList}
          setEdu={setEdu}
          editing={false}
          eduProps={null}
          elementBeingEdited={null}
        ></MyModal>
      </CenteredBox>

      <FlexContainer>
        <BookmarkBox>
          {eduList.map((x: EduProps) => {
            return (
              <CenteredButton key={x.bookMarkId}>{x.school}</CenteredButton>
            );
          })}
        </BookmarkBox>
        <EduContainer>
          {eduList.map((x: EduProps) => {
            return (
              <Edu
                key={x.boxId}
                school={x.school}
                startDate={x.startDate}
                endDate={x.endDate}
                degree={x.degree}
                grade={x.grade}
                study={x.study}
                description={x.description}
                boxId={x.boxId}
                bookMarkId={x.bookMarkId}
                deleteFunc={handleDelete}
              />
            );
          })}
        </EduContainer>
      </FlexContainer>
    </div>
  );
};
export default Main;
