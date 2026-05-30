import { CiCalendar } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import type { LeaveEntry } from "../types/form";

type EmailOutputProps = {
  data: LeaveEntry[]
}


const EmailOutput = ({ data }: EmailOutputProps) => {
  return (
    <div className="flex flex-col gap-2.5 flex-2 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TbUsers />
          <p className="font-semibold">LEAVE ENTRIES</p>
          <span>({data && data.length})</span>
        </div>
        <button className="text-white bg-emerald-900 rounded-md hover:bg-emerald-800 cursor-pointer transition shadow-xs px-4 py-2.5">
          Generate Email
        </button>
      </div>

      {data && data.length > 0 ? (
        data.map((entry) => (
          <div className="flex flex-col gap-2" key={entry.id}>
            <div className="flex flex-col bg-slate-800 px-3 py-3 gap-2 rounded-md">
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
        ))
      ) : (
        <div className="flex flex-1 border border-dashed rounded-md">
          <div className="flex flex-col items-center justify-center flex-1  gap-2.5">
            <MdOutlineMail className="h-20 w-20" />
            <p>No entries added yet. Start by filling the form.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailOutput;
