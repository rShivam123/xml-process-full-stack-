import fs from "fs";
import xml2js from "xml2js";
import CreditReport from "../models/creditReportModel.js";

const parser = new xml2js.Parser({ explicitArray: false });

export const uploadXML = async (req, res) => {
  try {
    const xmlData = fs.readFileSync(req.file.path, "utf8");
    const result = await parser.parseStringPromise(xmlData);

    const data = result.INProfileResponse;
    const holder =
      data.CAIS_Account.CAIS_Account_DETAILS[0].CAIS_Holder_Details;
    const summary = data.CAIS_Account.CAIS_Summary;

    const report = {
      name: `${holder.First_Name_Non_Normalized} ${holder.Surname_Non_Normalized}`,
      mobilePhone:
        data.Current_Application.Current_Application_Details.Current_Applicant_Details
          .MobilePhoneNumber || "",
      pan: holder.Income_TAX_PAN || "",
      creditScore: data.SCORE.BureauScore,
      reportSummary: {
        totalAccounts: summary.Credit_Account.CreditAccountTotal,
        activeAccounts: summary.Credit_Account.CreditAccountActive,
        closedAccounts: summary.Credit_Account.CreditAccountClosed,
        currentBalanceAmount:
          summary.Total_Outstanding_Balance.Outstanding_Balance_All,
        securedAmount:
          summary.Total_Outstanding_Balance.Outstanding_Balance_Secured,
        unsecuredAmount:
          summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured,
        last7DaysEnquiries: data.TotalCAPS_Summary.TotalCAPSLast7Days,
      },
      creditAccounts: data.CAIS_Account.CAIS_Account_DETAILS.map((acc) => ({
        bank: acc.Subscriber_Name.trim(),
        accountNumber: acc.Account_Number,
        currentBalance: acc.Current_Balance,
        amountOverdue: acc.Amount_Past_Due,
        accountStatus: acc.Account_Status,
      })),
    };

    const saved = await CreditReport.create(report);
    fs.unlinkSync(req.file.path);
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing XML", error: err });
  }
};

export const getReports = async (req, res) => {
  const reports = await CreditReport.find();
  res.json(reports);
};
