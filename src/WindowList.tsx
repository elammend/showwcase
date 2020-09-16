import React, { FC, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
type ListProps = {
  index: number;
  style: any;
};

type WLProps = {
  names: string[];
  length: number;
};

const WindowList: FC<WLProps> = ({ names, length }) => {
  const Row: FC<ListProps> = ({ index, style }) => (
    <div
      className={index % 2 ? "ListItemOdd" : "ListItemEven"}
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
    <List height={150} itemCount={length} itemSize={35} width="100%">
      {Row}
    </List>
  );
};

export default WindowList;
