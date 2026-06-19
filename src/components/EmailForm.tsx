import { CiCalendar, CiUser } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PiSuitcase } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { MdOutlineTask } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import type { FormData } from "../types/form";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

type EmailFormProps = {
  formData: FormData;
  selectedLeave: string;
  selectedDuration: string;
  selectedSession: string;
  startDate: Date | null;
  endDate: Date | null;
  receiver: string;
  sender: string;
  isReceiver: boolean;
  isSender: boolean;
  onLeaveToggle: (value: string) => void;
  onDurationToggle: (value: string) => void;
  onSessionToggle: (value: string) => void;
  onDateSelect: (value: [Date | null, Date | null]) => void;
  onFieldChange: (name: string, value: string) => void;
  onSubmit: (data: FormData) => void;
  handleReceiver: (value: string) => void;
  handleSender: (value: string) => void;
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
  selectedSession,
  startDate,
  endDate,
  onDateSelect,
  onFieldChange,
  onSubmit,
  receiver,
  handleReceiver,
  isReceiver,
  sender,
  isSender,
  handleSender,
}: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    setValue("duration", formData.duration);
  }, [formData.duration, setValue]);

  useEffect(() => {
    setValue("session", formData.session);
  }, [formData.session, setValue]);

  useEffect(() => {
    setValue("leaveType", formData.leaveType);
  }, [formData.leaveType, setValue]);

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
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center mb-5">
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
              {...register("receiverName", {
                required: "Receiver is Required",
              })}
              type="text"
              id="receiver-name"
              name="receiverName"
              value={receiver}
              onChange={(e) => handleReceiver(e.target.value)}
              disabled={isReceiver}
              className={`block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible:border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body ${isReceiver ? "border-emerald-900 bg-emerald-200 dark:bg-slate-800" : ""}`}
              autoComplete="off"
              placeholder="Receiver Name"
            />
          </div>
          {errors.receiverName && (
            <p className="text-red-600 dark:text-red-400">
              {errors.receiverName.message}
            </p>
          )}
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
              {...register("senderName", { required: "Sender is Required" })}
              type="text"
              id="sender-name"
              name="senderName"
              value={sender}
              onChange={(e) => handleSender(e.target.value)}
              disabled={isSender}
              className={`block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible:border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body ${isSender ? "border-emerald-900 bg-emerald-200 dark:bg-slate-800" : ""}`}
              autoComplete="off"
              placeholder="Sender Name"
            />
          </div>
          {errors.senderName && (
            <p className="text-red-600 dark:text-red-400">
              {errors.senderName.message}
            </p>
          )}
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
              {...register("leavePersonName", {
                required: "Leave person is Required",
              })}
              type="text"
              id="leave-person"
              name="leavePersonName"
              value={formData.leavePersonName}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              autoComplete="off"
              placeholder="Leave Person Name"
            />
          </div>
          {errors.leavePersonName && (
            <p className="text-red-600 dark:text-red-400">
              {errors.leavePersonName.message}
            </p>
          )}
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
              <Controller
                name="duration"
                control={control}
                defaultValue={selectedDuration as FormData["duration"]}
                render={({ field }) => (
                  <>
                    {toggleDurationButton.map((button) => {
                      const isActive = button === field.value;
                      return (
                        <button
                          key={button}
                          type="button"
                          className={`flex-1 px-2 py-1 rounded-md cursor-pointer ${isActive ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
                          onClick={() => {
                            field.onChange(button);

                            if (typeof onFieldChange === "function") {
                              onFieldChange("duration", button);
                            }
                          }}
                        >
                          {button}
                        </button>
                      );
                    })}
                  </>
                )}
              />
            </div>
          </div>

          {formData.duration === "Half Day" ? (
            <div className="flex flex-col flex-1">
              <span className="block mb-2.5 font-semibold uppercase text-sm">
                Session
              </span>
              <div
                className="p-1 inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800 flex-1"
                role="group"
              >
                <Controller
                  name="session"
                  control={control}
                  defaultValue={selectedSession as FormData["session"]}
                  render={({ field }) => (
                    <>
                      {toggleSessionHalfButton.map((button) => {
                        const isActive = button === field.value;
                        return (
                          <button
                            key={button}
                            type="button"
                            value={formData.session}
                            className={`flex-1 px-2 py-1 rounded-md cursor-pointer ${isActive ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
                            onClick={() => {
                              field.onChange(button);

                              if (typeof onFieldChange === "function") {
                                onFieldChange("session", button);
                              }
                            }}
                          >
                            {button}
                          </button>
                        );
                      })}
                    </>
                  )}
                />
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
            <Controller
              name="leaveDates"
              control={control}
              rules={{ required: "Leave dates are required" }}
              render={({ field }) => (
                <DatePicker
                  id="select-date"
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(dates) => {
                    onDateSelect(dates);
                    const formatted = formateDateRange(dates);
                    field.onChange(formatted);
                    onFieldChange("leaveDates", formatted);
                  }}
                  value={formData.leaveDates}
                  className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
                  autoComplete="off"
                  placeholderText="Select date or range"
                />
              )}
            />
          </div>
          {errors.leaveDates && (
            <p className="text-red-600 dark:text-red-400">
              {errors.leaveDates.message}
            </p>
          )}
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
              {...register("leaveType")}
              id="leave-type"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body appearance-none"
              name="leaveType"
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
              {...register("reason")}
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
              {...register("pendingTask", { required: "Task is Required" })}
              type="text"
              id="pending-task"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              autoComplete="off"
              placeholder="Task to be handled"
              name="pendingTask"
              value={formData.pendingTask}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            />
          </div>
          {errors.pendingTask && (
            <p className="text-red-600 dark:text-red-400">
              {errors.pendingTask.message}
            </p>
          )}
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
              {...register("responsiblePerson", {
                required: "Responsible person is Required",
              })}
              type="text"
              id="responsible-person"
              className="block w-full ps-9 pe-3 py-2.5 border rounded-md focus:border-emerald-800 dark:focus:border-emerald-300 focus-within:border-emerald-800 dark:focus-within:border-emerald-300 focus-visible::border-emerald-800 dark:focus-visible::border-emerald-300 shadow-xs placeholder:text-body"
              autoComplete="off"
              placeholder="Who is covering"
              name="responsiblePerson"
              value={formData.responsiblePerson}
              onChange={(e) => onFieldChange(e.target.name, e.target.value)}
            />
          </div>
          {errors.responsiblePerson && (
            <p className="text-red-600 dark:text-red-400">
              {errors.responsiblePerson.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="text-white bg-emerald-700 rounded-md w-full hover:bg-emerald-600 cursor-pointer transition shadow-xs px-4 py-2.5"
        >
          Add to list
        </button>
      </form>
    </div>
  );
};

export default EmailForm;
