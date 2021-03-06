import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { RightButton, Input, InputBox, CenteredButton } from "./MainStyles";
import { getSchoolSuggestions } from "./api/api";
import { EduProps } from "./Main";
import WindowList from "./WindowList";

type MyModalProps = {
  eduList: EduProps[];
  setEdu: (newList: EduProps[]) => void;
  eduProps: EduProps | null;
  editing: boolean;
  elementBeingEdited: number | null;
};

const MyModal: React.FC<MyModalProps> = ({
  eduList,
  setEdu,
  eduProps,
  editing
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [degree, setDegree] = useState("");
  const [study, setStudy] = useState("");
  const [description, setDescription] = useState("");
  const [schoolSuggestions, setSchoolSuggestions] = useState([]);
  const [suggestionsLength, setSuggestionsLength] = useState(0);
  const [listDisplay, setListDisplay] = useState("none");
  const [grade, setGrade] = useState("");

  const resetAlreadySavedStates = (): void => {
    if (editing && eduProps) {
      setEndDateDisabled(false);
      setSchool(eduProps.school);
      setStartDate(eduProps.startDate);
      setEndDate(eduProps.endDate);
      setDegree(eduProps.degree);
      setStudy(eduProps.study);
      setDescription(eduProps.description);
      //  setSchoolSuggestions([]);
      setSuggestionsLength(0);
      setListDisplay("none");
      setGrade(eduProps.grade);
    }
  };
  const resetStates = (): void => {
    setEndDateDisabled(false);
    setSchool("");
    setStartDate("");
    setEndDate("");
    setDegree("");
    setStudy("");
    setDescription("");
    setSchoolSuggestions([]);
    setSuggestionsLength(0);
    setListDisplay("none");
    setGrade("");
  };
  useEffect(() => {
    resetAlreadySavedStates();
  }, []);
  useEffect(() => {
    const getSuggestions = async () => {
      const schoolSuggestions = await getSchoolSuggestions(school);
      if (schoolSuggestions) {
        const schoolList = schoolSuggestions.data;
        interface ApiObject {
          alpha_two_code: string | null;
          country: string | null;
          domains: string[] | null;
          name: string | null;
          "state-province": string | null;
          web_pages: string[] | null;
        }
        if (schoolSuggestions.data.length == 0) {
          setListDisplay("none");
        } else {
          setListDisplay("block");
        }
        setSuggestionsLength(schoolSuggestions.data.length);
        const nameList = schoolSuggestions.data.map((x: ApiObject) => x.name);
        setSchoolSuggestions(nameList);
      }
    };
    const timeoutId = setTimeout(() => {
      if (school == "" || !school.replace(/\s/g, "").length) {
        setListDisplay("none");
        setSchoolSuggestions([]);
      } else {
        getSuggestions();
      }
    }, 350);

    return () => {
      clearTimeout(timeoutId);
    };

    //setSchoolSuggestions(schoolSuggestions);
  }, [school]);

  useEffect(() => {
    if (
      schoolSuggestions.length == 0 ||
      (suggestionsLength == 1 && school == schoolSuggestions[0])
    ) {
      setListDisplay("none");
    } else {
      setListDisplay("block");
    }
  }, [schoolSuggestions]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    if (editing) {
      resetAlreadySavedStates();
    } else {
      resetStates();
    }
    setIsOpen(false);
  };

  const saveEducation = () => {
    let mustComplete = [];

    const isEmpty = (str: string): boolean => {
      if (str == "" || !str.replace(/\s/g, "").length) {
        return true;
      }
      return false;
    };

    if (isEmpty(school)) mustComplete.push("school");
    if (isEmpty(startDate)) mustComplete.push("start date");
    if (isEmpty(endDate)) mustComplete.push("end date");
    if (isEmpty(description)) mustComplete.push("description");

    if (mustComplete.length > 0) {
      window.alert(
        `The following fields must be completed before saving: 
        ${mustComplete.join(", ")}`
      );
      return;
    }
    // will reach here if successfully completed
    let updatedList: EduProps[] = [];
    if (editing && eduProps != null) {
      updatedList = eduList.map(element => {
        if (element.boxId == eduProps.boxId) {
          const updatedItem = { ...element };
          updatedItem.school = school;
          updatedItem.startDate = startDate;
          updatedItem.endDate = endDate;
          updatedItem.degree = degree;
          updatedItem.grade = grade;
          updatedItem.study = study;
          updatedItem.description = description;
          return updatedItem;
        }
        return element;
      });
    } else {
      updatedList = eduList.concat({
        school,
        startDate,
        endDate,
        degree,
        grade,
        study,
        description,
        boxId: new Date().getTime() + Math.random(),
        bookMarkId: new Date().getTime() + Math.random()
      });
    }
    updatedList.sort(
      (a, b) =>
        new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
    );
    setEdu(updatedList);

    closeModal();
  };
  const toggleEndDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const initialState = endDate;
    if (e.target.checked) {
      setEndDate("present");
      setEndDateDisabled(true);
    } else {
      setEndDate("");
      setEndDateDisabled(false);
    }
  };
  const onTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    stateName: string
  ): any => {
    switch (stateName) {
      case "school":
        setSchool(e.target.value);
        break;
      case "startDate":
        setStartDate(e.target.value);
        break;
      case "endDate":
        setEndDate(e.target.value);
        break;
      case "degree":
        setDegree(e.target.value);
        break;
      case "study":
        setStudy(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "grade":
        setGrade(e.target.value);
        break;
    }
  };
  return (
    <div
      onClick={e => {
        if (
          (e.target as HTMLTextAreaElement).className != "SuggestionWindow" &&
          (e.target as HTMLTextAreaElement).className != "WindowRow" &&
          (e.target as HTMLTextAreaElement).id != "schoolInput"
        ) {
          if (listDisplay == "block") {
            setListDisplay("none");
          }
        }
      }}
    >
      <div style={{ marginTop: editing ? "0px" : "30px" }}>
        <CenteredButton onClick={openModal}>
          {editing ? "Edit" : "Add new education"}
        </CenteredButton>
      </div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edu Modal"
        style={{ overlay: { background: "rgba(50, 50, 50, 0.7)" } }}
      >
        <div style={{ fontFamily: "Arial" }}>
          <h3>Add education</h3>
          {/* //////////////////////////////////////// SCHOOL DIV */}
          <div
            onFocus={() => {
              if (suggestionsLength != 0) {
                setListDisplay("block");
              }
            }}
          >
            <div style={{ display: "flex" }}>
              <div>School</div>
              <div style={{ color: "red" }}>*</div>
            </div>
            <Input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              id="schoolInput"
              value={school}
              onChange={e => onTextChange(e, "school")}
              placeholder={"Ex: Boston University"}
            />
            <div
              style={{
                position: "absolute",
                zIndex: 2,
                backgroundColor: "white",
                display: listDisplay,
                cursor: "pointer",
                //border: autoCompleteBackground == "white" ? "solid" : "none",
                borderRadius: "4px",
                width: "calc(100% - 45px)",
                boxShadow: "0 6px 6px rgba(0, 0, 0, 0.2)",
                borderWidth: "thin"
              }}
            >
              <WindowList
                setListDisplay={setListDisplay}
                setSchool={setSchool}
                names={schoolSuggestions}
                length={suggestionsLength}
              ></WindowList>
            </div>
          </div>
          {/* //////////////////////////////////////// DATES DIV */}
          <div id="datesDiv" style={{ display: "flex", marginTop: "20px" }}>
            <div style={{ width: "40%", cursor: "pointer" }}>
              <div style={{ display: "flex" }}>
                <div>{"Start Date"}</div>
                <div style={{ color: "red" }}>*</div>
              </div>
              <Input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={startDate}
                onChange={e => onTextChange(e, "startDate")}
                type="month"
              />
            </div>

            <div
              style={{ marginLeft: "20px", width: "40%", cursor: "pointer" }}
            >
              <div style={{ display: "flex" }}>
                <div>{"End Date"}</div>
                <div style={{ color: "red" }}>*</div>
              </div>
              <Input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={endDate}
                disabled={endDateDisabled}
                onChange={e => onTextChange(e, "endDate")}
                type="month"
              />
            </div>

            <div style={{ marginLeft: "20px", marginTop: "0px" }}>
              <div>present</div>
              <input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                type="checkbox"
                onChange={toggleEndDate}
                style={{ cursor: "pointer", width: "35px", height: "35px" }}
              ></input>
            </div>
          </div>
          {/* //////////////////////////////////////// DEGREE DIV */}
          <div id="degreeDiv" style={{ marginTop: "20px" }}>
            <div>Degree</div>
            <Input
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={degree}
              onChange={e => onTextChange(e, "degree")}
              placeholder={"Ex: Bachelor's"}
            />
          </div>
          <div style={{ display: "flex" }}>
            {/* //////////////////////////////////////// STUDY DIV */}
            <div id="studyDiv" style={{ marginTop: "20px" }}>
              <div>Field of study</div>
              <Input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={study}
                onChange={e => onTextChange(e, "study")}
                placeholder={"Ex: Business"}
              />
            </div>
            {/* //////////////////////////////////////// STUDY DIV */}
            <div
              id="gradeDiv"
              style={{ marginTop: "20px", marginLeft: "20px" }}
            >
              <div>Grade</div>
              <Input
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                value={grade}
                onChange={e => onTextChange(e, "grade")}
                placeholder={"Ex: 3.0"}
              />
            </div>
          </div>

          {/* //////////////////////////////////////// DESCRIPTION DIV */}
          <div id="descriptionDiv" style={{ marginTop: "20px" }}>
            <div style={{ display: "flex" }}>
              <div>Description</div>
              <div style={{ color: "red" }}>*</div>
            </div>
            <InputBox
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={description}
              onChange={e => onTextChange(e, "description")}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <RightButton onClick={saveEducation}>save</RightButton>
            <RightButton onClick={closeModal}>cancel</RightButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyModal;
