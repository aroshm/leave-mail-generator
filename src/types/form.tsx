export type FormData = {
  receiverName: string;
  senderName: string;
  leavePersonName: string;
  duration: "Full Day" | "Half Day";
  session: "Morning" | "Evening";
  leaveDates: string;
  leaveType: string;
  reason: string;
  pendingTask: string;
  responsiblePerson: string;
};

export type LeaveEntry = FormData & {
  id: number;
};
