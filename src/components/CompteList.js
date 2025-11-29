import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
  
  const formatCurrency = (amount) => {
    return parseFloat(amount).toFixed(2);
  };
  
  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-slate-400 text-sm">Loading accounts...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
      <p className="text-red-400 font-medium mb-4">Error: {error.message}</p>
      <button 
        onClick={() => refetch()}
        className="bg-red-500/20 text-red-400 py-2 px-6 rounded-lg hover:bg-red-500/30 transition-all"
      >
        Retry
      </button>
    </div>
  );
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          Accounts ({data.allComptes ? data.allComptes.length : 0})
        </h2>
        <button 
          onClick={() => refetch()}
          className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      {data.allComptes && data.allComptes.length === 0 ? (
        <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700">
          <p className="text-slate-400">No accounts found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.allComptes.map((compte) => (
            <div key={compte.id} className={`bg-gradient-to-br ${
              compte.type === 'EPARGNE' ? 'from-purple-600 to-purple-700' : 'from-indigo-600 to-indigo-700'
            } rounded-xl p-6 text-white`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs opacity-75 uppercase mb-1">
                    {compte.type === 'EPARGNE' ? 'Savings' : 'Current'}
                  </p>
                  <p className="text-sm opacity-60">#{compte.id}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-3xl font-bold">
                  {formatCurrency(compte.solde)} <span className="text-lg">DH</span>
                </p>
              </div>
              
              <div className="text-sm opacity-75">
                {new Date(compte.dateCreation).toLocaleDateString('en-US')}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompteList;