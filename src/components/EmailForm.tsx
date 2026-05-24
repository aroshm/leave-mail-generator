import { FaPlus } from "react-icons/fa";

const EmailForm = () => {
  
  return (
    <div className="flex-1 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1 font-semibold">
          <FaPlus />
          ADD LEAVE ENTRY
        </p>
        <div
          className="inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800"
          role="group"
        >
          <button
            type="button"
            className="px-3 py-2 cursor-pointer"
          >
            Planned
          </button>
          <button
            type="button"
            className="px-3 py-2 cursor-pointer"
          >
            Unplanned
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
