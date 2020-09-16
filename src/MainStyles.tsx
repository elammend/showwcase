import styled from "styled-components";
export const CenteredBox = styled.div`
  position: relative;
  top: 20px;
  left: 50%;
  height: 100px;
  width: 100%;
  transform: translate(-50%, 0%);
  border-style: none;
  text-align: center;
  font-family: Arial;
  font-size: 23px;
`;
export const FlexContainer = styled.div`
  margin-top: 20px;
  margin-right: 20px;
  position: absolute;
  display: flex;
  height: calc(100% - 160px);
  width: 100%;
  border-style: none;
  color: black;
`;
export const EduContainer = styled.div`
  flex: 1;
  height: 100%;
  border-style: none;
  overflow: auto;
`;

export const BookmarkBox = styled.div`
  position: relative;
  height: 100%;
  width: 200px;
  margin-left: 25px;
  border-style: solid;
  border-width: thin;
  text-align: center;
  font-family: Arial;
  font-size: 23px;
  overflow: auto;
`;
export const CenteredButton = styled.button`
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  margin-top: 30px;
  width: 150px;
  font-family: Arial;
  font-size: 15px;
  border: none;
  background-color: #81bdda;
  cursor: pointer;
`;
export const RightButton = styled.button`
  float: right;
  margin-left: 10px;
  padding: 10px;
  width: 100px;
  font-family: Arial;
  font-size: 15px;
  border: none;
  background-color: #81bdda;
  cursor: pointer;
`;
export const EduDiv = styled.div`
  margin-left: 20px;
  margin-right: 80px;
  padding: 10px;
  padding-left: 25px;
  margin-top: 30px;
  width: 80%;
  font-family: Arial;
  font-size: 15px;
  border: none;
  background-color: #81bdda;
`;
export const Input = styled.input`
  width: 100%;
  font-family: Arial;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
  box-sizing: border-box;
  border-style: solid;
  border-color: sky;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
  border-width: thin;
`;

export const InputBox = styled.textarea`
  width: 100%;
  font-family: Arial;
  padding: 12px;
  border: none;
  border-radius: 4px;
  margin: 5px 0;
  height: 100px;
  width: 100%;
  opacity: 0.85;
  display: inline-block;
  font-size: 17px;
  line-height: 20px;
  text-decoration: none;
  box-sizing: border-box;
  border-style: solid;
  border-color: sky;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2);
  border-width: thin;
`;
