import React, { useEffect, useState, useRef, createRef } from "react";

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
}

export interface ListProps {
  itemId: number | null;
}
interface refObject {
  [key: string]: any;
}

const Main: React.FC<MainProps> = props => {
  const [eduList, setEdu] = useState<EduProps[]>([]);
  const refsObject: refObject = {};

  const createRefByKey = (key: number | null) => {
    if (!key) {
      console.error("given key is null");
      return;
    }
    if (refsObject[key] == null) {
      //create ref
      refsObject[key] = createRef();
    }
  };
  const getRefByKey = (key: number | null) => {
    if (key == null) {
      console.error("key is null");
      return;
    }
    return refsObject[key];
  };
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
    boxId
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
        <div style={{ display: "flex" }}>
          <p>{description}</p>
          <div style={{ width: "100%", float: "right" }}>
            <RightButton
              style={{ marginTop: "15px", border: "solid", width: "150px" }}
              onClick={() => {
                handleDelete(boxId);
              }}
            >
              Delete
            </RightButton>
            <div style={{ border: "solid", float: "right", marginTop: "15px" }}>
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
                  bookMarkId: null
                }}
                elementBeingEdited={null}
              ></MyModal>
            </div>
          </div>
        </div>
      </EduDiv>
    );
  };

  const scrollTo = (key: number | null) => {
    if (key == null) {
      return;
    }
    refsObject[key].current.scrollIntoView();
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
            createRefByKey(x.boxId);
            return (
              <div key={x.bookMarkId} style={{ margin: "20px" }}>
                <CenteredButton
                  onClick={() => {
                    scrollTo(x.boxId);
                  }}
                >
                  {x.school}
                </CenteredButton>
              </div>
            );
          })}
        </BookmarkBox>

        <EduContainer>
          {eduList.map((x: EduProps) => {
            return (
              <div ref={getRefByKey(x.boxId)} key={x.boxId}>
                <Edu
                  school={x.school}
                  startDate={x.startDate}
                  endDate={x.endDate}
                  degree={x.degree}
                  grade={x.grade}
                  study={x.study}
                  description={x.description}
                  boxId={x.boxId}
                  bookMarkId={x.bookMarkId}
                />
              </div>
            );
          })}
        </EduContainer>
      </FlexContainer>
    </div>
  );
};
export default Main;
