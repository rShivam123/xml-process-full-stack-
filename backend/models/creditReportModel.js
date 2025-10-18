import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  bank: String,
  accountNumber: String,
  currentBalance: Number,
  amountOverdue: Number,
  accountStatus: String,
});

const creditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceAmount: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [accountSchema],
});

export default mongoose.model("CreditReport", creditReportSchema);
