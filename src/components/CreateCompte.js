import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_COMPTE } from '../graphql/mutation';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CreateCompte = () => {
  const [solde, setSolde] = useState('');
  const [type, setType] = useState('COURANT');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [saveCompte, { loading }] = useMutation(SAVE_COMPTE, {
    refetchQueries: [{ query: GET_ALL_COMPTES }],
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCompte({
        variables: {
          compte: {
            solde: Number.parseFloat(solde),
            type,
          },
        },
      });
      setSolde('');
      setType('COURANT');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la création du compte :', err);
    }
  };
  
  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-6">Create Account</h3>

      {showSuccess && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Compte créé avec succès
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
            Solde Initial
          </label>
          <div className="relative group">
            <input
              type="number"
              step="0.01"
              value={solde}
              onChange={(e) => setSolde(e.target.value)}
              required
              placeholder="0.00"
              className="w-full bg-slate-900/50 border border-slate-600 text-white rounded-xl px-4 py-3 pl-4 pr-12 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium group-focus-within:text-indigo-400 transition-colors">DH</span>
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
            Type de Compte
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setType('COURANT')}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                type === 'COURANT'
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Courant
            </button>
            <button
              type="button"
              onClick={() => setType('EPARGNE')}
              className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                type === 'EPARGNE'
                  ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-900/50 border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Épargne
            </button>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-slate-900 py-3.5 px-6 rounded-xl hover:bg-slate-100 disabled:bg-slate-300 disabled:text-slate-500 transition-all font-bold text-sm uppercase tracking-wide shadow-lg hover:shadow-xl transform active:scale-95"
        >
          {loading ? 'Création...' : 'Créer un compte'}
        </button>
      </form>
    </div>
  );
};

export default CreateCompte;