import { createContext } from "react";
import { useState } from "react";
import { useEffect as useseffect } from "react";
 export const Windowsize = createContext("");

export default function WindowContext({ children }) {
  const [windowSize, setWindow] = useState(window.innerWidth);
  useseffect(() => {
    function handleResize() {
      setWindow(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Windowsize.Provider value={{ windowSize, setWindow }}>
      {children}
    </Windowsize.Provider>
  );
}
