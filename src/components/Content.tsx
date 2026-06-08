import { useEffect, useState } from "react";
import EmailForm from "./EmailForm";
import EmailOutput from "./EmailOutput";
import type { FormData, LeaveEntry } from "../types/form";

const Content = () => {
  const [receiver, setReceiver] = useState<string>(() => {
    return localStorage.getItem("receiver") || "";
  });

  const [sender, setSender] = useState<string>(() => {
    return localStorage.getItem("sender") || "";
  });

  const [isReceiver, setIsReceiver] = useState<boolean>(() => {
    return localStorage.getItem("receiver") != "";
  });

  const [isSender, setIsSender] = useState<boolean>(() => {
    return localStorage.getItem("sender") != "";
  });

  const [plannedLeave, setPlannedLeave] = useState("Planned");
  const [duration, setDuration] = useState("Full Day");
  const [selectSession, setSelectSession] = useState("Morning");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  useEffect(() => {
    localStorage.setItem("receiver", receiver);
    localStorage.setItem("sender", sender);
  }, [receiver, sender]);

  const [formData, setFormData] = useState<FormData>({
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

  const handleReceiver = (value: string) => {
    setReceiver(value);
  };

  const handleSender = (value: string) => {
    setSender(value);
  };

  const handleReset = () => {
    localStorage.removeItem("receiver");
    localStorage.removeItem("sender");
    setSender("");
    setIsSender(false);
    setReceiver("");
    setIsReceiver(false);
    setSubmissions([]);
  };

  const handleFieldChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (data: FormData) => {
    setSubmissions((prev) => [...prev, { ...data, id: Date.now() }]);
    setIsReceiver(true);
    setIsSender(true);

    setFormData({
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

  const handleDeleteItem = (id: number) => {
    setSubmissions(submissions.filter((item) => item.id !== id));

    if (submissions.length == 1) {
      localStorage.removeItem("receiver");
      localStorage.removeItem("sender");
      setSender("");
      setIsSender(false);
      setReceiver("");
      setIsReceiver(false);
    }
  };

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
        onSubmit={handleFormSubmit}
        handleReceiver={handleReceiver}
        receiver={receiver}
        isReceiver={isReceiver}
        sender={sender}
        isSender={isSender}
        handleSender={handleSender}
      />
      <EmailOutput
        data={submissions}
        onDelete={handleDeleteItem}
        handleReset={handleReset}
      />
    </div>
  );
};

export default Content;
