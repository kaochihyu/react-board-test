import React, { useState, useContext, createContext } from "react";

// 建立脈絡
const TitleContext = createContext();
const ColorContext = createContext();

function DemoInnerBoxContent() {
  // 在最底層把要傳的東西用 useContext 變成脈絡
  const setTitle = useContext(TitleContext)
  const colors = useContext(ColorContext)
  return (
    <div>
      <button
        style={{
          color: colors.primary,
        }}
        onClick={() => {
          setTitle(Math.random());
        }}
      >
        Update title;
      </button>
    </div>
  )
}

function DemoInnerBox() {
  return <DemoInnerBoxContent />;
}

function DemoInner() {
  return <DemoInnerBox />;
}

export default function Demo() {
  const [title, setTitle] = useState("I AM A Title!");
  const [colors, setColors] = useState({
    primary: "#ff0000",
  })
  return (
    // 在最外層用  provider 包起來
    <ColorContext.Provider value={colors}>
      <div>
        <button onClick={() => {
          setColors({
            primary: "#0000ff",
          });
        }}
        >
          click me

        </button>
      </div>
    <TitleContext.Provider value={setTitle}>
      <div>
        title: {title}
        <DemoInner />
      </div>
    </TitleContext.Provider>
    </ColorContext.Provider>
  );
}
