import { FaPlus } from "react-icons/fa";

type EmailFormProps = {
  selectedValue: string;
  onChange: (value: string) => void;
};

const toggleButtons = ["Planned", "Unplanned"];

const EmailForm = ({ selectedValue, onChange }: EmailFormProps) => {
  return (
    <div className="flex-1 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900">
      <div className="flex justify-between items-center">
        <p className="flex items-center gap-1 font-semibold">
          <FaPlus />
          ADD LEAVE ENTRY
        </p>
        <div
          className="p-1 inline-flex rounded-md shadow-xs -space-x-px bg-emerald-50 dark:bg-slate-800"
          role="group"
        >
          {toggleButtons.map((button) => (
            <button
              key={button}
              type="button"
              value={selectedValue}
              className={`px-2 py-1 rounded-md cursor-pointer ${ button === selectedValue ? "bg-emerald-200 dark:bg-slate-900" : ""}`}
              onClick={() => onChange(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
