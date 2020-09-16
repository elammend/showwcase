import React, { useState } from "react";
import Modal from "react-modal";
import { RightButton, Input, InputBox, CenteredButton } from "./MainStyles";

type EntryProps = {
  label: string;
  required: boolean;
  customStyle: object;
  boxInput: boolean;
  placeholder: string;
  inputType: string;
  state: any;
  stateSetter: (x: any) => void;
};
const MyModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [endDateDisabled, setEndDateDisabled] = useState(false);
  const [school, setSchool] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [degree, setDegree] = useState("");
  const [study, setStudy] = useState("");
  const [description, setDescription] = useState("");

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
    }
    console.log("just set");
  };
  return (
    <div>
      <CenteredButton onClick={openModal}>Add new education</CenteredButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Edu Modal"
        style={{ overlay: { background: "rgba(50, 50, 50, 0.7)" } }}
      >
        <div style={{ fontFamily: "Arial" }}>
          <h3>Add education</h3>
          {/* //////////////////////////////////////// SCHOOL DIV */}
          <div id="schoolDiv">
            <div style={{ display: "flex" }}>
              <div>School</div>
              <div style={{ color: "red" }}>*</div>
            </div>
            <Input
              value={school}
              onChange={e => onTextChange(e, "school")}
              placeholder={"Ex: Boston University"}
            />
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

          {/* //////////////////////////////////////// STUDY DIV */}
          <div id="studyDiv" style={{ marginTop: "20px" }}>
            <div>Field of study</div>
            <Input
              value={study}
              onChange={e => onTextChange(e, "study")}
              placeholder={"Ex: Business"}
            />
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
