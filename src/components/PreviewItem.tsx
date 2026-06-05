import { FaTrashAlt } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { TbUsers } from "react-icons/tb";

import type { LeaveEntry } from "../types/form";

type PreviewItemProps = {
  entry: LeaveEntry;
  onDelete: (id: number) => void;
};

const PreviewItem = ({ entry, onDelete }: PreviewItemProps) => {
  return (
    <>
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
    </>
  );
};

export default PreviewItem;
