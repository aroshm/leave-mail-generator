import { TbUsers } from "react-icons/tb";
import { MdOutlineMail } from "react-icons/md";
import type { LeaveEntry } from "../types/form";
import PreviewItem from "./PreviewItem";
import CopyHtmlButton from "./CopyHtmlButton";

type EmailOutputProps = {
  data: LeaveEntry[];
  leaveHistory: string[];
  onDelete: (id: number) => void;
  handleReset: () => void;
};

const EmailOutput = ({
  data,
  onDelete,
  handleReset,
  leaveHistory,
}: EmailOutputProps) => {
  const hasPlanned = leaveHistory.includes("Planned");
  const hasUnplanned = leaveHistory.includes("Unplanned");
  const leaveText = hasPlanned && hasUnplanned
    ? "Planned & Unplanned"
    : hasPlanned
    ? "Planned"
    : "Unplanned";

  const emailHtml = `
    <div style="font-family: 'Helvetica', Arial, sans-serif; color: #333; max-width: 600px;">
      <p style="font-size:16px; line-height:1.5;">Hi ${data[0]?.receiverName || ""},</p>
      <p style="font-size:16px; line-height:1.5;">
        Please find the <strong>${leaveText}</strong> leaves for this sprint from the Kingfisher team as follows.
      </p>
      <table style="width:100%; border-collapse:collapse; margin-top:20px; margin-bottom:20px; font-size:14px;">
        <thead>
          <tr style="background-color:#f8f9fa;">
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Name</th>
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Date(s)</th>
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Type</th>
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Reason</th>
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Tasks</th>
            <th style="border:1px solid #dee2e6; padding:12px; text-align:left;">Covered By</th>
          </tr>
        </thead>
        <tbody>
          ${data
            .map(
              (leaveItem) => `
                <tr>
                  <td style="border:1px solid #dee2e6; padding:12px;">${leaveItem.leavePersonName}</td>
                  <td style="border:1px solid #dee2e6; padding:12px;">
                    ${leaveItem.leaveDates}${leaveItem.duration === "Half Day" ? ` - ${leaveItem.session}` : ""}
                  </td>
                  <td style="border:1px solid #dee2e6; padding:12px;">${leaveItem.leaveType}</td>
                  <td style="border:1px solid #dee2e6; padding:12px;">${leaveItem.reason}</td>
                  <td style="border:1px solid #dee2e6; padding:12px;">${leaveItem.pendingTask}</td>
                  <td style="border:1px solid #dee2e6; padding:12px;">${leaveItem.responsiblePerson}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <p style="font-size:16px; line-height:1.5; margin-top:30px;">
        Best regards,<br />
        <strong>${data[0]?.senderName || ""}</strong>
      </p>
    </div>
  `;

  const emailPlainText = `
Hi ${data[0]?.receiverName || ""},

Please find the ${leaveText} leaves for this sprint from the Kingfisher team as follows.

Name	Date(s)	Type	Reason	Tasks	Covered By
${data
  .map(
    (leaveItem) =>
      `${leaveItem.leavePersonName}	${leaveItem.leaveDates}${
        leaveItem.duration === "Half Day" ? ` - ${leaveItem.session}` : ""
      }	${leaveItem.leaveType}	${leaveItem.reason}	${leaveItem.pendingTask}	${leaveItem.responsiblePerson}`,
  )
  .join("\n")}

Best regards,
${data[0]?.senderName || ""}
  `;

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

      {data && data.length > 0 && (
        <div className="flex flex-col bg-emerald-200 dark:bg-slate-800 px-3 py-3 gap-2 rounded-md">
          <div className="flex justify-between items-center pb-1.5">
            <div className="flex items-center gap-2">
              <MdOutlineMail />
              EMAIL PREVIEW
            </div>
            <CopyHtmlButton
              htmlString={emailHtml}
              plainTextString={emailPlainText}
            />
          </div>
          <div className="px-4 py-2.5 bg-emerald-100 rounded-md">
            <div
              style={{
                fontFamily: "'Helvetica', Arial, sans-serif",
                color: "rgb(51, 51, 51)",
                maxWidth: "600px",
              }}
            >
              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                Hi {data ? data[0].receiverName : ""},
              </p>
              <p style={{ fontSize: "16px", lineHeight: "1.5" }}>
                Please find the{" "}
                <span style={{ fontWeight: "bold" }}>{leaveText}</span> leaves
                for this sprint from the Kingfisher team as follows.
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
                  {data.map((leaveItem) => (
                    <tr key={leaveItem.id}>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.leavePersonName}
                      </td>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.leaveDates}
                        {leaveItem.duration === "Half Day" &&
                          ` - ${leaveItem.session}`}
                      </td>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.leaveType}
                      </td>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.reason}
                      </td>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.pendingTask}
                      </td>
                      <td
                        style={{
                          border: "1px solid rgb(222, 226, 230)",
                          padding: "12px",
                        }}
                      >
                        {leaveItem.responsiblePerson}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginTop: "30px",
                }}
              >
                Best regards,<br></br>
                <strong>{data[0].senderName}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailOutput;
