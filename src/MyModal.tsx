import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { RightButton, Input, InputBox, CenteredButton } from "./MainStyles";
import { getSchoolSuggestions } from "./api/api";
import { EduProps } from "./Main";
import WindowList from "./WindowList";

type MyModalProps = {
  eduList: EduProps[];
  setEdu: (newList: EduProps[]) => void;
};

const MyModal: React.FC<MyModalProps> = ({ eduList, setEdu }) => {
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
    const getSuggestions = async () => {
      const schoolSuggestions = await getSchoolSuggestions(school);
      let responseLength = 0;
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
        //   console.log(schoolList);
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
        console.log("set it to none");
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
    console.log("in here because you just changed suggestions");
    console.log(school);

    if (
      schoolSuggestions.length == 0 ||
      (suggestionsLength == 1 && school == schoolSuggestions[0])
    ) {
      console.log("schoolSuggestions length is 0", schoolSuggestions.length);
      setListDisplay("none");
    } else {
      setListDisplay("block");
    }
  }, [schoolSuggestions]);

  const openModal = () => {
    console.log("opening");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveEducation = () => {
    console.log("clicked save!");
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
    const updatedList = eduList.concat({
      school,
      startDate,
      endDate,
      degree,
      grade,
      study,
      description
    });
    setEdu(updatedList);
    //reset modal here
    resetStates();
    setIsOpen(false);
  };
  const toggleEndDate = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.checked);
    const initialState = endDate;
    console.log(initialState);
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

    console.log("just set");
  };
  return (
    <div
      onClick={e => {
        if (
          (e.target as HTMLTextAreaElement).className != "SuggestionWindow" &&
          (e.target as HTMLTextAreaElement).className != "WindowRow" &&
          (e.target as HTMLTextAreaElement).id != "schoolInput"
        ) {
          console.log("should close suggestion window");
          if (listDisplay == "block") {
            setListDisplay("none");
          }
        }
      }}
    >
      <CenteredButton onClick={openModal}>Add new education</CenteredButton>
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
              console.log("focused!");
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
                value={endDate}
                disabled={endDateDisabled}
                onChange={e => onTextChange(e, "endDate")}
                type="month"
              />
            </div>

            <div style={{ marginLeft: "20px", marginTop: "0px" }}>
              <div>present</div>
              <input
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
