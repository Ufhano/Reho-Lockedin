function RewardsStore({ rewards, coins, onRedeem }) {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/40 backdrop-blur md:p-5">
      <h2 className="text-lg font-semibold text-white">Rewards Store</h2>
      <p className="mt-1 text-sm text-cyan-100/70">Spend your Focus Coins</p>
      <div className="mt-4 space-y-3">
        {rewards.map((reward) => {
          const canRedeem = coins >= reward.cost
          return (
            <div
              key={reward.id}
              className="flex items-center justify-between rounded-xl border border-cyan-200/15 bg-slate-950/60 p-3"
            >
              <div>
                <p className="font-medium text-white">{reward.label}</p>
                <p className="text-xs text-emerald-200">{reward.cost} coins</p>
              </div>
              <button
                type="button"
                onClick={() => onRedeem(reward)}
                disabled={!canRedeem}
                className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-300"
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
