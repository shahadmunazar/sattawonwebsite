import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from "@mui/material";

// Transaction Interface
interface Transaction {
  id: number;
  user_id: number;
  transaction_type: 'bonus' | 'credit' | 'debit' | 'won' | 'loss' | 'withdrawal'; // Ensure to use a union type
  amount: string;
  description: string;
  transaction_date: string | null;
  created_at: string;
  confirm_payment: string;
}

// Define a type for transaction types
type TransactionType = 'bonus' | 'credit' | 'debit' | 'won' | 'loss' | 'withdrawal';

// Define the color palette using the union type
const colors: Record<TransactionType | 'default', string> = {
  bonus: "#cce5ff",        // Light Blue for Bonus
  credit: "#d1ecf1",       // Light Teal for Credit
  debit: "#fff3cd",        // Light Yellow for Debit
  won: "#d4edda",          // Light Green for Won
  loss: "#f8d7da",         // Light Red for Loss
  withdrawal: "#ffe8a1",   // Light Orange for Withdrawal
  default: "#f0f0f0",      // Default Light Grey
};

const Transaction: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | TransactionType>("all");

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://apisattaking.sattakingmaker.com/api/user/user-transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            bonus: activeTab === "bonus" ? "bonus" : "",
            credit: activeTab === "credit" ? "credit" : "",
            debit: activeTab === "debit" ? "debit" : "",
            won: activeTab === "won" ? "won" : "",
            loss: activeTab === "loss" ? "loss" : "",
            withdrawal: activeTab === "withdrawal" ? "withdrawal" : "",
          },
        });

        if (response.data && response.data.status === "success") {
          setTransactions(response.data.transactions);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [activeTab]);

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : transactions.filter((transaction) => transaction.transaction_type === activeTab);

  // Define color styles for different transaction types
  const getTransactionRowStyle = (transactionType: TransactionType) => {
    return { backgroundColor: colors[transactionType] || colors.default };
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Transaction History</h1>

      {/* Responsive Tab Buttons using Grid */}
      <Grid container justifyContent="center" spacing={2} style={{ marginBottom: "20px" }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "all" ? "#4caf50" : "#e0e0e0",
              color: activeTab === "all" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("all")}
          >
            All Transactions
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "bonus" ? "#17a2b8" : "#e0e0e0",
              color: activeTab === "bonus" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("bonus")}
          >
            Bonus
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "credit" ? "#007bff" : "#e0e0e0",
              color: activeTab === "credit" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("credit")}
          >
            Credit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "debit" ? "#ffc107" : "#e0e0e0",
              color: activeTab === "debit" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("debit")}
          >
            Debit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "won" ? "#28a745" : "#e0e0e0",
              color: activeTab === "won" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("won")}
          >
            Won
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "loss" ? "#dc3545" : "#e0e0e0",
              color: activeTab === "loss" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("loss")}
          >
            Loss
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              backgroundColor: activeTab === "withdrawal" ? "#fd7e14" : "#e0e0e0",
              color: activeTab === "withdrawal" ? "#ffffff" : "#000000",
            }}
            onClick={() => setActiveTab("withdrawal")}
          >
            Withdrawal
          </Button>
        </Grid>
      </Grid>

      {/* MUI Table for displaying the filtered transaction history */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} style={getTransactionRowStyle(transaction.transaction_type)}>
                  <TableCell>{transaction.transaction_type}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    {transaction.transaction_date
                      ? new Date(transaction.transaction_date).toLocaleString()
                      : new Date(transaction.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} style={{ textAlign: "center" }}>
                  No Transactions Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Transaction;
