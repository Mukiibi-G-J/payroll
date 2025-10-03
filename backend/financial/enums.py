from enum import Enum


class INCOME_BALANCE(Enum):
    INCOME = "Income"
    BALANCE = "Balance"


class G_L_Account_Category(Enum):
    ASSET = "Asset"
    LIABILITY = "Liability"
    EQUITY = "Equity"
    INCOME = "Income"
    EXPENSE = "Expense"


class DEBIT_CREDIT(Enum):
    DEBIT = "Debit"
    CREDIT = "Credit"


class G_L_Account_Type(Enum):
    POSTING = "Posting"
    HEADING = "Heading"
    TOTAL = "Total"
    BEGIN_TOTAL = "Begin-Total"
    END_TOTAL = "End-Total"
