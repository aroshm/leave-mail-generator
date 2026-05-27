import { useState } from "react";
import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";

const Content = () => {
  const [plannedLeave, setPlannedLeave] = useState("Planned");
  const [duration, setDuration] = useState("Full Day");
  const [selectSession, setSelectSession] = useState("Morning");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const handleLeaveButtonToggle = (value: string) => {
    setPlannedLeave(value);
  };

  const handleDurationButtonToggle = (value: string) => {
    setDuration(value);
  };

  const handleSessionButtonToggle = (value: string) => {
    setSelectSession(value);
  };

  const handleDatePicker = (value: [Date | null, Date | null]) => {
    setDateRange(value);
  };

  return (
    <div className="flex flex-1 gap-10 w-7xl mx-auto pb-5">
      <EmailForm
        selectedLeave={plannedLeave}
        onLeaveToggle={handleLeaveButtonToggle}
        selectedDuration={duration}
        onDurationToggle={handleDurationButtonToggle}
        selectedSession={selectSession}
        onSessionToggle={handleSessionButtonToggle}
        startDate={startDate}
        endDate={endDate}
        onDateSelect={handleDatePicker}
      />
      <EmailOutput />
    </div>
  );
};

export default Content;
