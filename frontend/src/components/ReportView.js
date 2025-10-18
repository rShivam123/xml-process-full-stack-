

import "../styles/report.css";
import React, { useEffect, useState } from "react";
import { getReports } from "../services/api";

const ReportView = ({ refresh }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getReports();
      setReports(res.data);
    })();
  }, [refresh]);

  return (
    <div>
      {reports.length === 0 && <p className="no-reports">No reports found.</p>}

      {reports.map((r) => (
        <div key={r._id} className="report-card">
          <div className="basic-details">
            <h3>{r.name}</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">PAN</span>
                <span className="detail-value">{r.pan}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Mobile</span>
                <span className="detail-value">{r.mobilePhone || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Credit Score</span>
                <span className="credit-score">{r.creditScore}</span>
              </div>
            </div>
          </div>

          <div className="report-summary">
            <h4 className="summary-section-title">Report Summary</h4>
            {[
              ["Total Accounts", r.reportSummary?.totalAccounts],
              ["Active", r.reportSummary?.activeAccounts],
              ["Closed", r.reportSummary?.closedAccounts],
              ["Current Balance", r.reportSummary?.currentBalanceAmount],
              ["Secured Amount", r.reportSummary?.securedAmount],
              ["Unsecured Amount", r.reportSummary?.unsecuredAmount],
              ["Last 7 Days Enquiries", r.reportSummary?.last7DaysEnquiries],
            ].map(([label, value], idx) => (
              <div key={idx} className="summary-item">
                <span className="summary-value">{value || 0}</span>
                <span className="summary-label">{label}</span>
              </div>
            ))}
          </div>

          <div className="credit-accounts-section">
            <h4 className="accounts-title">Credit Accounts</h4>
            {r.creditAccounts && r.creditAccounts.length > 0 ? (
              <div className="accounts-table-container">
                <table className="accounts-table">
                  <thead>
                    <tr>
                      <th>Bank</th>
                      <th>Account Number</th>
                      <th>Current Balance</th>
                      <th>Amount Overdue</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.creditAccounts.map((acc, idx) => (
                      <tr key={idx}>
                        <td>{acc.bank}</td>
                        <td>{acc.accountNumber}</td>
                        <td
                          className={
                            acc.currentBalance > 0
                              ? "positive-amount"
                              : acc.currentBalance < 0
                              ? "negative-amount"
                              : "zero-amount"
                          }
                        >
                          {acc.currentBalance}
                        </td>
                        <td
                          className={
                            acc.amountOverdue > 0
                              ? "negative-amount"
                              : "zero-amount"
                          }
                        >
                          {acc.amountOverdue}
                        </td>
                        <td>
                          <span
                            className={
                              acc.accountStatus === "Active"
                                ? "status-badge status-active"
                                : acc.accountStatus === "Closed"
                                ? "status-badge status-closed"
                                : "status-badge status-pending"
                            }
                          >
                            {acc.accountStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No credit accounts found.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportView;
