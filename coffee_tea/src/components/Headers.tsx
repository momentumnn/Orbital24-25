import { useState } from "react";

function Header() {
  const [name, setName] = useState("user");
  const handleNameClick = () => {
    const newName = prompt("Key in your name", name);
    setName(newName || "");
  };
  return (
    <header>
      <h1> hello</h1>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
        }}
      >
        <div className="HeaderBox">
          <h2>Welcome {name}</h2>
          <p onClick={handleNameClick}>hello</p>
        </div>
        <div className="HeaderBox">Top Right Box</div>
      </div>
    </header>
  );
}
export default Header;
