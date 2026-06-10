import { TbUsers } from "react-icons/tb";
import { MdContentCopy, MdOutlineMail } from "react-icons/md";
import type { LeaveEntry } from "../types/form";
import PreviewItem from "./PreviewItem";

type EmailOutputProps = {
  data: LeaveEntry[];
  onDelete: (id: number) => void;
  handleReset: () => void;
};

const EmailOutput = ({ data, onDelete, handleReset }: EmailOutputProps) => {
  return (
    <div className="flex flex-col gap-2.5 flex-2 bg-emerald-100 dark:bg-slate-900 p-3.5 rounded-lg shadow-2xl shadow-slate-400 dark:shadow-emerald-900 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TbUsers />
          <p className="font-semibold">LEAVE ENTRIES</p>
          <span>({data && data.length})</span>
        </div>

        <div className="flex justify-end items-center gap-2.5">
          <button
            className="text-white bg-red-600 dark:bg-red-400 rounded-md hover:bg-red-700 dark:hover:bg-red-500 cursor-pointer transition shadow-xs px-4 py-2.5"
            onClick={() => handleReset()}
          >
            Reset
          </button>
          {data && data.length > 0 && (
            <button className="text-white bg-emerald-700 rounded-md hover:bg-emerald-600 cursor-pointer transition shadow-xs px-4 py-2.5">
              Generate Email
            </button>
          )}
        </div>
      </div>

      {data && data.length > 0 ? (
        data.map((entry) => (
          <div
            className="group flex justify-between items-center bg-emerald-200 dark:bg-slate-800 px-3 py-3 gap-2 rounded-md"
            key={entry.id}
          >
            <PreviewItem onDelete={onDelete} entry={entry} />
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
        <div className="flex justify-between items-center pb-1.5">
          <div className="flex items-center gap-2">
            <MdOutlineMail />
            EMAIL PREVIEW
          </div>
          <button className="flex items-center gap-1.5 text-white bg-emerald-700 rounded-md hover:bg-emerald-600 cursor-pointer transition shadow-xs px-4 py-2.5">
            <MdContentCopy />
            Copy HTML
          </button>
        </div>
        <div className="px-4 py-2.5 bg-emerald-100 rounded-md">
          <div
            style={{
              fontFamily: "'Helvetica', Arial, sans-serif",
              color: "rgb(51, 51, 51)",
              maxWidth: "600px",
            }}
          >
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>Hi</p>
            <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
              Please find the{" "}
              <span style={{ fontWeight: "bold" }}>planned</span> leaves for
              this sprint from Kingfisher team as follows.
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "rgb(248, 249, 250)" }}>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Name
                  </th>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Date(s)
                  </th>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Type
                  </th>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Reason
                  </th>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Tasks
                  </th>
                  <th
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                      textAlign: "left",
                    }}
                  >
                    Covered By
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    Koshala wick
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    Jun 1, 2026
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    Casual
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    Personal
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    API testing
                  </td>
                  <td
                    style={{
                      border: "1px solid rgb(222, 226, 230)",
                      padding: "12px",
                    }}
                  >
                    Suvethan
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{ fontSize: "16px", lineHeight: "1.5", marginTop: "30px" }}
            >
              Best regards,<br></br>
              <strong>Arosh Athukorala</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailOutput;
