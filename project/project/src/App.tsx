import React, { useState } from 'react';
import Papa from 'papaparse';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { TransactionChart } from './components/TransactionChart';
import { TransactionTable } from './components/TransactionTable';
import { Transaction } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    Papa.parse(file, {
      complete: (results) => {
        try {
          if (!results.data || results.data.length <= 1) {
            throw new Error('The file appears to be empty or contains only headers');
          }

          const parsedTransactions = results.data
            .slice(1) // Skip header row
            .map((row: any[], index: number) => {
              if (!Array.isArray(row) || row.length < 3) {
                return null;
              }

              const amount = parseFloat(String(row[1]).replace('ETH', '').trim());
              
              if (isNaN(amount)) {
                return null;
              }

              return {
                id: String(row[0] || `tx-${index + 1}`),
                amount,
                status: String(row[2] || 'Unknown'),
                riskLevel: String(row[3] || 'Low'),
                actionTaken: String(row[4] || 'None')
              };
            })
            .filter((tx): tx is Transaction => tx !== null);

          if (parsedTransactions.length === 0) {
            throw new Error('No valid transactions found in the file');
          }

          setTransactions(parsedTransactions);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to parse the file');
          setTransactions([]);
        } finally {
          setLoading(false);
        }
      },
      error: (error) => {
        setError(`Failed to read the file: ${error.message}`);
        setLoading(false);
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const fraudulentCount = transactions.filter(t => 
    t.status.toLowerCase() === 'fraudulent'
  ).length;
  const legitimateCount = transactions.filter(t => 
    t.status.toLowerCase() === 'legitimate'
  ).length;
  const totalTransactions = transactions.length;
  const fraudPercentage = totalTransactions ? 
    (fraudulentCount / totalTransactions * 100).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-[#020420] text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <FileUpload onFileUpload={handleFileUpload} />

        {error && (
          <div className="mb-8 bg-red-900/50 border border-red-800 p-4 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Processing your dataset...</p>
          </div>
        ) : transactions.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              <TransactionChart
                fraudulentCount={fraudulentCount}
                legitimateCount={legitimateCount}
                fraudPercentage={fraudPercentage}
              />
              <TransactionTable transactions={transactions} />
            </div>

            <div className="mt-8 bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h3 className="text-xl font-bold mb-4">Detailed Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">Total Transactions</p>
                  <p className="text-2xl font-bold">{totalTransactions}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">High Risk Transactions</p>
                  <p className="text-2xl font-bold text-red-500">
                    {transactions.filter(t => 
                      t.riskLevel.toLowerCase() === 'high'
                    ).length}
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-gray-400">Average Transaction</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {(transactions.reduce((acc, t) => acc + t.amount, 0) / totalTransactions).toFixed(2)} ETH
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}

export default App;