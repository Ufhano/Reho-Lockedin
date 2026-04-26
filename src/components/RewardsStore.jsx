function RewardsStore({ rewards, coins, onRedeem }) {
  return (
    <section className="premium-card">
      <h2 className="text-lg font-bold text-slate-900">Rewards Store</h2>
      <p className="mt-1 text-sm text-slate-500">Spend your Focus Coins</p>
      <div className="mt-4 space-y-3">
        {rewards.map((reward) => {
          const canRedeem = coins >= reward.cost
          return (
            <div
              key={reward.id}
              className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5"
            >
              <div>
                <p className="font-semibold text-slate-800">{reward.label}</p>
                <p className="text-xs text-slate-500">{reward.cost} Focus Coins</p>
              </div>
              <button
                type="button"
                onClick={() => onRedeem(reward)}
                disabled={!canRedeem}
                className="premium-btn bg-zinc-900 text-white shadow-sm hover:bg-zinc-800 disabled:bg-slate-200 disabled:text-slate-400"
              >
                Redeem
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RewardsStore
