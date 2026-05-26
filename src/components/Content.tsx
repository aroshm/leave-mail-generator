import { useState } from "react";
import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";

const Content = () => {
  const [plannedLeave, setPlannedLeave] = useState("Planned");

  const handleLeaveButtonToggle = (value: string) => {
    setPlannedLeave(value);
  };

  return (
    <div className="flex flex-1 gap-10 w-7xl mx-auto pb-5">
      <EmailForm selectedValue={plannedLeave} onChange={handleLeaveButtonToggle}/>
      <EmailOutput />
    </div>
  );
};

export default Content;
