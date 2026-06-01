import { CiCalendar } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";
import { MdContentCopy, MdOutlineMail } from "react-icons/md";
import type { LeaveEntry } from "../types/form";
import { FaTrashAlt } from "react-icons/fa";

type EmailOutputProps = {
  data: LeaveEntry[];
  onDelete: (id: number) => void;
};

const EmailOutput = ({ data, onDelete }: EmailOutputProps) => {
  return (
    <div className="flex flex-col gap-2.5 flex-2 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TbUsers />
          <p className="font-semibold">LEAVE ENTRIES</p>
          <span>({data && data.length})</span>
        </div>
        <button className="text-white bg-emerald-700 rounded-md hover:bg-emerald-600 cursor-pointer transition shadow-xs px-4 py-2.5">
          Generate Email
        </button>
      </div>

      {data && data.length > 0 ? (
        data.map((entry) => (
          <div
            className="group flex justify-between items-center bg-emerald-200 dark:bg-slate-800 px-3 py-3 gap-2 rounded-md"
            key={entry.id}
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{entry.leavePersonName}</p>
                  <span className="bg-emerald-800 text-emerald-300 text-xs font-medium px-1.5 py-0.5 rounded">
                    {entry.leaveType}
                  </span>
                </div>
                <div className="flex gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <CiCalendar />
                    {entry.leaveDates}
                  </div>
                  <div className="flex items-center gap-1">
                    <TbUsers />
                    {entry.responsiblePerson}
                  </div>
                </div>
              </div>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 transition cursor-pointer"
              onClick={() => onDelete(entry.id)}
            >
              <FaTrashAlt className="text-red-600 dark:text-red-400 " />
            </button>
          </div>
        ))
      ) : (
        <div className="flex flex-1 border border-dashed rounded-md">
          <div className="flex flex-col items-center justify-center flex-1  gap-2.5">
            <MdOutlineMail className="h-20 w-20" />
            <p>No entries added yet. Start by filling the form.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col bg-emerald-200 dark:bg-slate-800 px-3 py-3 gap-2 rounded-md">
        <div className="flex justify-between items-center border-b border-emerald-500 pb-2.5">
          <div className="flex items-center gap-2">
            <MdOutlineMail />
            EMAIL PREVIEW
          </div>
          <button className="flex items-center gap-1.5 text-white bg-emerald-700 rounded-md hover:bg-emerald-600 cursor-pointer transition shadow-xs px-4 py-2.5">
            <MdContentCopy />
            Copy HTML
          </button>
        </div>
        <div className="px-4 py-2.5">
          <div
            style={{
              fontFamily: "'Helvetica', Arial, sans-serif",
              color: "rgb(51, 51, 51)",
              maxWidth: "600px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EmailOutput;
