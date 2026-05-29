import { CiCalendar, CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiSuitcase } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTask } from "react-icons/md";
import { TbUsers } from "react-icons/tb";

type EmailFormProps = {
  formData: {
    receiverName: string;
    senderName: string;
    leavePersonName: string;
    duration: string;
    session: string;
    leaveDates: string;
    leaveType: string;
    reason: string;
    pendingTask: string;
    responsiblePerson: string;
  };
  selectedLeave: string;
  selectedDuration: string;
  selectedSession: string;
  startDate: Date | null;
  endDate: Date | null;
  onLeaveToggle: (value: string) => void;
  onDurationToggle: (value: string) => void;
  onSessionToggle: (value: string) => void;
  onDateSelect: (value: [Date | null, Date | null]) => void;
  onFieldChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const togglePlanButtons = ["Planned", "Unplanned"];
const toggleDurationButton = ["Full Day", "Half Day"];
const toggleSessionHalfButton = ["Morning", "Evening"];
const leaveType = ["Annual", "Casual", "Medical", "Lieu"];

const EmailForm = ({
  formData,
  selectedLeave,
  onLeaveToggle,
  selectedDuration,
  onDurationToggle,
  selectedSession,
  onSessionToggle,
  startDate,
  endDate,
  onDateSelect,
  onFieldChange,
  onSubmit,
}: EmailFormProps) => {
  const formateDateRange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (!start && !end) return "";

    if (start && end) {
      return `${start.toLocaleDateString("en-GB")} - ${end.toLocaleDateString("en-GB")}`;
    }

    return start ? start.toLocaleDateString("en-GB") : "";
  };
  return (
    <div className="flex-1 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900 overflow-auto">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1 font-semibold">
          <FaPlus />
          ADD LEAVE ENTRY
        </p>
        <div
          className="p-1 inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800"
          role="group"
        >
          {togglePlanButtons.map((button) => (
            <button
              key={button}
              type="button"
              value={selectedLeave}
              className={`px-2 py-1 rounded-md cursor-pointer ${button === selectedLeave ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
              onClick={() => onLeaveToggle(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>

      <form className="max-w-sm mx-auto mt-5" onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="receiver-name"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Receiver Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <CiUser />
            </div>
            <input
              type="text"
              id="receiver-name"
              name="receiverName"
              value={formData.receiverName}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholder="Receiver Name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="sender-name"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Sender Name (Signature)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <CiUser />
            </div>
            <input
              type="text"
              id="sender-name"
              name="senderName"
              value={formData.senderName}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholder="Sender Name"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="leave-person"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Leave Person Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <CiUser />
            </div>
            <input
              type="text"
              id="leave-person"
              name="leavePersonName"
              value={formData.leavePersonName}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholder="Leave Person Name"
            />
          </div>
        </div>
        <div className="flex gap-3 mb-4">
          <div className="flex flex-col flex-1">
            <span className="block mb-2.5 font-semibold uppercase text-sm">
              Duration
            </span>
            <div
              className="p-1 inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800 flex-1"
              role="group"
            >
              {toggleDurationButton.map((button) => (
                <button
                  key={button}
                  type="button"
                  value={formData.duration}
                  className={`flex-1 px-2 py-1 rounded-md cursor-pointer ${button === selectedDuration ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
                  onClick={() => {
                    onDurationToggle(button);
                    onFieldChange("duration", button);
                  }}
                >
                  {button}
                </button>
              ))}
            </div>
          </div>

          {selectedDuration === "Half Day" ? (
            <div className="flex flex-col flex-1">
              <span className="block mb-2.5 font-semibold uppercase text-sm">
                Session
              </span>
              <div
                className="p-1 inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800 flex-1"
                role="group"
              >
                {toggleSessionHalfButton.map((button) => (
                  <button
                    key={button}
                    type="button"
                    value={formData.session}
                    className={`flex-1 px-2 py-1 rounded-md cursor-pointer ${button === selectedSession ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
                    onClick={() => {
                      onSessionToggle(button);
                      onFieldChange("session", button);
                    }}
                  >
                    {button}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1"></div>
          )}
        </div>
        <div className="mb-4 date-selector">
          <label
            htmlFor="select-date"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Leave Date(s)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <CiCalendar />
            </div>
            <DatePicker
              id="select-date"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              name="leaveDates"
              dateFormat="dd/MM/yyyy"
              onChange={(dates) => {
                onDateSelect(dates);
                onFieldChange("leaveDates", formateDateRange(dates));
              }}
              value={formData.leaveDates}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholderText="Select date or range"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="leave-type"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Leave Type
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <PiSuitcase />
            </div>
            <select
              id="leave-type"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body appearance-none"
              name="leaveType"
              value={formData.leaveType}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            >
              {leaveType.map((leave) => (
                <option
                  key={leave}
                  value={leave}
                  className="dark:bg-slate-800 dark:hover:bg-slate-900"
                >
                  {leave}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="leave-reason"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Reason
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none h-2/3">
              <CgNotes />
            </div>
            <textarea
              id="leave-reason"
              rows={2}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body resize-none"
              placeholder="Brief reason for leave..."
              name="reason"
              value={formData.reason}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="pending-task"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Pending Task
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <MdOutlineTask />
            </div>
            <input
              type="text"
              id="pending-task"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholder="Task to be handled"
              name="pendingTask"
              value={formData.pendingTask}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="responsible-person"
            className="block mb-2.5 font-semibold uppercase text-sm"
          >
            Responsible Person
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
              <TbUsers />
            </div>
            <input
              type="text"
              id="responsible-person"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              placeholder="Who is covering"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-900 rounded-md w-full hover:bg-emerald-800 cursor-pointer transition shadow-xs px-4 py-2.5"
        >
          Add to list
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
