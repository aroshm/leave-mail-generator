import { useState } from "react";
import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";
import type { FormData, LeaveEntry } from "../types/form";

const Content = () => {
  const [plannedLeave, setPlannedLeave] = useState("Planned");
  const [duration, setDuration] = useState("Full Day");
  const [selectSession, setSelectSession] = useState("Morning");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [formData, setFormData] = useState<FormData>({
    receiverName: "",
    senderName: "",
    leavePersonName: "",
    duration: "Full Day",
    session: "Morning",
    leaveDates: "",
    leaveType: "",
    reason: "",
    pendingTask: "",
    responsiblePerson: "",
  });

  const [submissions, setSubmissions] = useState<LeaveEntry[]>([]);

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmissions((prev) => [...prev, {...formData, id: Date.now()}]);
    setFormData({
      receiverName: "",
      senderName: "",
      leavePersonName: "",
      duration: "Full Day",
      session: "Morning",
      leaveDates: "",
      leaveType: "",
      reason: "",
      pendingTask: "",
      responsiblePerson: "",
    });
  };

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

  // console.log(senderName);

  return (
    <div className="flex flex-1 gap-10 w-7xl mx-auto pb-5 overflow-auto">
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
        formData={formData}
        onFieldChange={handleFieldChange}
        onSubmit={handleSubmit}
      />
      <EmailOutput data={submissions} />
    </div>
  );
};

export default Content;
