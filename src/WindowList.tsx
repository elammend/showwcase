import React, { FC, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
type ListProps = {
  index: number;
  style: any;
};

type WLProps = {
  names: string[];
  length: number;
  setSchool: (newName: string) => void;
  setListDisplay: (display: string) => void;
};

const WindowList: FC<WLProps> = ({
  names,
  length,
  setSchool,
  setListDisplay
}) => {
  const Row: FC<ListProps> = ({ index, style }) => (
    <div
      className="WindowRow"
      onClick={() => {
        console.log("clicked here");
        setSchool(names[index]);
        setListDisplay("none");
      }}
      style={{
        ...style,
        ...{
          paddingLeft: "10px",
          paddingTop: "9px",
          paddingBottom: "7px",
          backgroundColor: index % 2 ? "#D5D5D5" : "white"
        }
      }}
    >
      {names[index]}
    </div>
  );
  return (
    <List
      className="SuggestionWindow"
      height={150}
      itemCount={length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default WindowList;
