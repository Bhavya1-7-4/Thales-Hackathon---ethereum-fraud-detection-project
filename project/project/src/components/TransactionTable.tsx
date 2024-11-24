import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TABLE_HEADERS = [
  { id: 'id', label: 'Transaction ID' },
  { id: 'amount', label: 'Amount (ETH)' },
  { id: 'status', label: 'Status' },
  { id: 'risk', label: 'Risk Level' }
] as const;

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => (
  <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
    <h3 className="text-xl font-bold mb-4">Recent Transactions</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-800">
            {TABLE_HEADERS.map(header => (
              <th key={header.id} className="pb-2 text-gray-400">{header.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.slice(0, 5).map((tx) => (
            <tr key={tx.id} className="border-b border-gray-800/50 hover:bg-gray-800/25 transition-colors">
              <td className="py-3 font-mono text-sm">{tx.id}</td>
              <td>{tx.amount.toFixed(2)} ETH</td>
              <td>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                  tx.status.toLowerCase() === 'fraudulent' 
                    ? 'bg-pink-500/20 text-pink-400'
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {tx.status}
                </span>
              </td>
              <td className="flex items-center gap-1 py-3">
                {tx.riskLevel.toLowerCase() === 'high' && (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                )}
                <span className={
                  tx.riskLevel.toLowerCase() === 'high' 
                    ? 'text-red-400'
                    : tx.riskLevel.toLowerCase() === 'medium'
                    ? 'text-yellow-400'
                    : 'text-green-400'
                }>
                  {tx.riskLevel}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);