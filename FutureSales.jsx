import { useState, useMemo, useEffect } from "react";
import {
  ComposedChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell
} from "recharts";
import {
  TrendingUp, TrendingDown, Target, Calendar, DollarSign,
  Plus, Edit2, Trash2, Download, BarChart2, Lightbulb,
  Settings, FileText, Sliders, AlertTriangle, CheckCircle,
  XCircle, LayoutDashboard, Brain, Activity, Minus
} from "lucide-react";

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const G = () => (
  <style dangerouslySetInnerHTML={{__html:`
    @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Source+Sans+3:wght@300;400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    #fsapp{display:flex;height:100vh;font-family:'Source Sans 3','Segoe UI',sans-serif;background:#fff;overflow:hidden;color:#0f172a}
    /* SIDEBAR */
    .sb{width:220px;min-width:220px;background:#0f172a;display:flex;flex-direction:column}
    .sb-logo{padding:22px 18px 18px;border-bottom:1px solid #1e293b}
    .sb-name{font-family:'Libre Baskerville',Georgia,serif;font-size:15px;color:#f8fafc;font-weight:700;letter-spacing:.3px}
    .sb-sub{font-size:10px;color:#475569;margin-top:3px;text-transform:uppercase;letter-spacing:1.2px}
    .sb-nav{flex:1;padding:12px 10px;display:flex;flex-direction:column;gap:2px}
    .ni{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:5px;cursor:pointer;color:#64748b;font-size:13px;font-weight:500;border:none;background:none;width:100%;text-align:left;transition:all .12s;letter-spacing:.1px}
    .ni:hover{background:#1e293b;color:#cbd5e1}
    .ni.active{background:#1d4ed8;color:#fff}
    .ni svg{flex-shrink:0;width:14px;height:14px}
    .sb-foot{padding:14px 18px;border-top:1px solid #1e293b;font-size:11px;color:#334155}
    /* MAIN */
    .main{flex:1;display:flex;flex-direction:column;overflow:hidden}
    .topbar{height:56px;background:#fff;border-bottom:1px solid #e2e8f0;padding:0 28px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
    .topbar-title{font-family:'Libre Baskerville',Georgia,serif;font-size:18px;color:#0f172a;font-weight:700}
    .topbar-actions{display:flex;gap:8px;align-items:center}
    .content{flex:1;overflow-y:auto;padding:24px 28px;background:#f8fafc}
    .content::-webkit-scrollbar{width:5px}
    .content::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px}
    /* BUTTONS */
    .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:5px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Source Sans 3',sans-serif;transition:all .12s;letter-spacing:.1px}
    .btn svg{width:14px;height:14px}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .b-blue{background:#1d4ed8;color:#fff}.b-blue:hover:not(:disabled){background:#1e40af}
    .b-red{background:#dc2626;color:#fff}.b-red:hover{background:#b91c1c}
    .b-green{background:#16a34a;color:#fff}.b-green:hover{background:#15803d}
    .b-ghost{background:#fff;color:#475569;border:1.5px solid #e2e8f0}.b-ghost:hover{border-color:#94a3b8;background:#f8fafc;color:#1e293b}
    .b-sm{padding:6px 12px;font-size:12px}
    .b-ico{padding:7px}
    /* CARDS */
    .card{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px}
    .ct{font-family:'Libre Baskerville',Georgia,serif;font-size:14px;font-weight:700;color:#0f172a;margin-bottom:16px}
    .ch{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    /* KPI */
    .kgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
    .kc{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:18px 20px}
    .kl{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;font-weight:700;margin-bottom:8px;display:flex;align-items:center;gap:6px}
    .kl svg{width:12px;height:12px}
    .kv{font-family:'Libre Baskerville',Georgia,serif;font-size:24px;color:#0f172a;font-weight:700;line-height:1}
    .ktr{display:flex;align-items:center;gap:4px;font-size:12px;margin-top:6px;font-weight:600}
    .cup{color:#16a34a}.cdn{color:#dc2626}.cfl{color:#d97706}
    .ks{font-size:11px;color:#94a3b8;margin-top:4px}
    /* PROGRESS */
    .pb{height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden;margin-top:8px}
    .pf{height:100%;border-radius:3px;transition:width .4s ease}
    /* TABLE */
    .twrap{overflow-x:auto}
    table{width:100%;border-collapse:collapse;font-size:13px}
    thead th{background:#f8fafc;padding:9px 14px;text-align:left;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#64748b;border-bottom:1px solid #e2e8f0}
    tbody td{padding:11px 14px;border-bottom:1px solid #f1f5f9;color:#334155}
    tbody tr:last-child td{border-bottom:none}
    tbody tr:hover td{background:#fafafa}
    /* MODAL */
    .mo{position:fixed;inset:0;background:rgba(15,23,42,.55);display:flex;align-items:center;justify-content:center;z-index:9999;backdrop-filter:blur(2px)}
    .mb{background:#fff;border-radius:10px;padding:28px;width:420px;box-shadow:0 25px 50px rgba(0,0,0,.2)}
    .mt{font-family:'Libre Baskerville',Georgia,serif;font-size:17px;font-weight:700;color:#0f172a;margin-bottom:22px;padding-bottom:14px;border-bottom:1px solid #e2e8f0}
    .fr{margin-bottom:14px}
    .fl{display:block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#475569;margin-bottom:5px}
    .fi{width:100%;padding:9px 13px;border:1.5px solid #e2e8f0;border-radius:5px;font-size:14px;color:#0f172a;font-family:'Source Sans 3',sans-serif;outline:none;transition:border-color .15s}
    .fi:focus{border-color:#1d4ed8}
    .ma{display:flex;gap:8px;justify-content:flex-end;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0}
    /* BADGES */
    .badge{display:inline-flex;align-items:center;gap:3px;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600}
    .bg{background:#dcfce7;color:#15803d}.br{background:#fee2e2;color:#b91c1c}
    .by{background:#fef9c3;color:#a16207}.bb{background:#dbeafe;color:#1d4ed8}
    /* ALERT */
    .al{padding:11px 14px;border-radius:6px;display:flex;align-items:flex-start;gap:9px;font-size:13px;margin-bottom:18px}
    .al svg{width:15px;height:15px;flex-shrink:0;margin-top:1px}
    .al-ok{background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0}
    .al-warn{background:#fffbeb;color:#b45309;border:1px solid #fde68a}
    .al-err{background:#fff1f2;color:#be123c;border:1px solid #fecdd3}
    /* FORECAST BOX */
    .fbox{background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%);border-radius:8px;padding:20px 24px;color:#fff;display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
    .flb{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#93c5fd;margin-bottom:4px}
    .fv{font-family:'Libre Baskerville',Georgia,serif;font-size:32px;font-weight:700}
    .fs2{font-size:12px;color:#93c5fd;margin-top:4px}
    /* REC CARDS */
    .rec{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin-bottom:14px;border-left-width:4px;border-left-style:solid}
    .rp{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .rt{font-family:'Libre Baskerville',Georgia,serif;font-size:14px;font-weight:700;color:#0f172a;margin-bottom:8px}
    .rb{font-size:13px;color:#475569;line-height:1.65}
    .ri{margin-top:12px;padding-top:12px;border-top:1px solid #f1f5f9;font-size:12px;color:#64748b;font-weight:500}
    /* SIMULATOR */
    .sim{background:#0f172a;border-radius:8px;padding:22px;color:#e2e8f0;margin-bottom:20px}
    .sim h3{font-family:'Libre Baskerville',Georgia,serif;font-size:14px;color:#f8fafc;margin-bottom:4px}
    .sim p{font-size:12px;color:#64748b;margin-bottom:16px}
    .si{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:5px;padding:9px 13px;color:#f8fafc;font-size:14px;font-family:'Source Sans 3',sans-serif;outline:none;width:200px}
    .sr{margin-top:14px;padding:14px;background:rgba(255,255,255,.06);border-radius:6px;display:flex;gap:20px;flex-wrap:wrap}
    .srl{font-size:10px;text-transform:uppercase;letter-spacing:.8px;color:#64748b;margin-bottom:4px}
    .srv{font-family:'Libre Baskerville',Georgia,serif;font-size:20px;color:#f8fafc}
    /* GRIDS */
    .two{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .three{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
    .div{height:1px;background:#e2e8f0;margin:18px 0}
    /* SPINNER */
    .spin{display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:sp .8s linear infinite}
    @keyframes sp{to{transform:rotate(360deg)}}
    /* SETTINGS */
    .stitle{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:#64748b;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid #e2e8f0}
    /* EMPTY */
    .empty{text-align:center;padding:44px 20px;color:#94a3b8}
    .empty svg{margin:0 auto 12px;opacity:.3;display:block}
    .empty p{font-size:14px}
    /* LEGEND DOT */
    .dot{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:5px}
  `}}/>
);

// ─── CONSTANTS ─────────────────────────────────────────────────────────────────
const TODAY = new Date();
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();
const fmtDate = d => new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric" });
const makeFmt = cur => n => new Intl.NumberFormat("en-US", { style:"currency", currency:cur, maximumFractionDigits:0 }).format(n || 0);
const fmtN = n => new Intl.NumberFormat("en-US").format(Math.round(n || 0));

// ─── FORECAST ENGINE ────────────────────────────────────────────────────────────
function calcForecast(records, totalDays, goal) {
  const daysElapsed = records.length;
  const daysRemaining = totalDays - daysElapsed;
  const totalSoFar = records.reduce((s, r) => s + r.sales, 0);
  if (daysElapsed === 0) return { linear:0, weighted:0, optimistic:0, pessimistic:0, main:0, momentumScore:0, avgDaily:0, recentAvg:0, requiredDaily:goal/totalDays, daysElapsed:0, daysRemaining:totalDays, totalSoFar:0 };

  const avgDaily = totalSoFar / daysElapsed;
  const last7 = records.slice(-Math.min(7, daysElapsed));
  const recentAvg = last7.reduce((s, r) => s + r.sales, 0) / last7.length;

  let trendFactor = 1;
  if (daysElapsed >= 8) {
    const half = Math.floor(daysElapsed / 2);
    const fh = records.slice(0, half).reduce((s, r) => s + r.sales, 0) / half;
    const sh = records.slice(-half).reduce((s, r) => s + r.sales, 0) / half;
    trendFactor = Math.min(1.35, Math.max(0.65, sh / fh));
  }

  const linear = Math.round(totalSoFar + avgDaily * daysRemaining);
  const weighted = Math.round(totalSoFar + recentAvg * daysRemaining);
  const optimistic = Math.round(totalSoFar + recentAvg * 1.15 * daysRemaining);
  const pessimistic = Math.round(totalSoFar + recentAvg * 0.85 * daysRemaining);
  const blended = linear * 0.35 + weighted * 0.65;
  const main = Math.round(blended * (0.55 + trendFactor * 0.45));

  const paceRatio = goal > 0 ? (avgDaily / (goal / totalDays)) : 1;
  const trendBonus = (trendFactor - 1) * 25;
  const momentumScore = Math.min(100, Math.max(0, Math.round(paceRatio * 55 + 45 + trendBonus)));

  const requiredDaily = daysRemaining > 0 ? Math.max(0, (goal - totalSoFar) / daysRemaining) : 0;
  return { linear, weighted, optimistic, pessimistic, main, momentumScore, avgDaily, recentAvg, requiredDaily, daysElapsed, daysRemaining, totalSoFar };
}

// ─── CHART DATA ────────────────────────────────────────────────────────────────
function buildChart(records, totalDays, goal) {
  const dailyGoal = goal / totalDays;
  let cum = 0;
  const data = [];
  for (let d = 1; d <= totalDays; d++) {
    const rec = records.find(r => new Date(r.date + "T12:00:00").getDate() === d);
    if (rec) { cum += rec.sales; data.push({ day:d, actual:cum, dailySales:rec.sales, target:Math.round(dailyGoal * d), orders:rec.orders }); }
    else { data.push({ day:d, actual:null, dailySales:null, target:Math.round(dailyGoal * d), orders:null }); }
  }
  return data;
}

// ─── HISTORY GENERATOR ────────────────────────────────────────────────────────
function genHistory(month, year, goal) {
  return Array.from({ length: 6 }, (_, i) => {
    let m = month - 6 + i, y = year;
    while (m < 0) { m += 12; y--; }
    const total = Math.round(goal * (0.68 + Math.random() * 0.58));
    return { label: SHORT[m], month: m, year: y, total, goal, orders: Math.round(total / 130) };
  });
}

// ─── DASHBOARD PAGE ────────────────────────────────────────────────────────────
function Dashboard({ records, forecast, goal, totalDays, chartData, fmt, onEdit, onDelete }) {
  const pctGoal = goal > 0 ? Math.round(forecast.totalSoFar / goal * 100) : 0;
  const pctMo = Math.round(forecast.daysElapsed / totalDays * 100);
  const onTrack = forecast.main >= goal * 0.93;
  const farBehind = forecast.main < goal * 0.80;
  const alertType = farBehind ? "err" : onTrack ? "ok" : "warn";
  const alertMsg = farBehind
    ? `Behind target — projected ${fmt(forecast.main)}, which is ${Math.round((1 - forecast.main / goal) * 100)}% below the monthly goal.`
    : onTrack
    ? `On track — projected ${fmt(forecast.main)}, exceeding the goal of ${fmt(goal)}.`
    : `Slightly behind — need ${fmt(forecast.requiredDaily)}/day vs current ${fmt(forecast.avgDaily)}/day to hit goal.`;

  return (
    <div>
      {forecast.daysElapsed > 0 && (
        <div className={`al al-${alertType}`}>
          {alertType === "ok" ? <CheckCircle /> : alertType === "err" ? <XCircle /> : <AlertTriangle />}
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Forecast Highlight */}
      <div className="fbox">
        <div>
          <div className="flb">Projected End-of-Month</div>
          <div className="fv">{forecast.daysElapsed > 0 ? fmt(forecast.main) : "—"}</div>
          <div className="fs2">Goal: {fmt(goal)} &nbsp;|&nbsp; {forecast.daysRemaining} days remaining</div>
        </div>
        <div style={{ textAlign:"right" }}>
          <div className="flb">Momentum Score</div>
          <div style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:40, fontWeight:700, color: forecast.momentumScore >= 65 ? "#86efac" : forecast.momentumScore >= 40 ? "#fde047" : "#fca5a5" }}>
            {forecast.daysElapsed > 0 ? forecast.momentumScore : "—"}
          </div>
          <div style={{ fontSize:11, color:"#93c5fd" }}>out of 100</div>
        </div>
      </div>

      {/* KPIs */}
      <div className="kgrid">
        <div className="kc">
          <div className="kl"><DollarSign />Sales to Date</div>
          <div className="kv">{fmt(forecast.totalSoFar)}</div>
          <div className="pb"><div className="pf" style={{ width:`${Math.min(100,pctGoal)}%`, background:pctGoal>=100?"#16a34a":pctGoal>=70?"#1d4ed8":"#dc2626" }}/></div>
          <div className="ks">{pctGoal}% of goal</div>
        </div>
        <div className="kc">
          <div className="kl"><Activity />Average Daily</div>
          <div className="kv">{forecast.daysElapsed > 0 ? fmt(forecast.avgDaily) : "—"}</div>
          {forecast.daysElapsed > 0 && (
            <div className="ktr">
              {forecast.recentAvg >= forecast.avgDaily
                ? <><TrendingUp size={13} color="#16a34a"/><span className="cup">Recent: {fmt(forecast.recentAvg)}</span></>
                : <><TrendingDown size={13} color="#dc2626"/><span className="cdn">Recent: {fmt(forecast.recentAvg)}</span></>}
            </div>
          )}
          <div className="ks">Over {forecast.daysElapsed} days recorded</div>
        </div>
        <div className="kc">
          <div className="kl"><Target />Required Daily</div>
          <div className="kv" style={{ color: forecast.daysElapsed > 0 && forecast.requiredDaily > forecast.avgDaily ? "#dc2626" : "#16a34a" }}>
            {forecast.daysElapsed > 0 && forecast.daysRemaining > 0 ? fmt(forecast.requiredDaily) : "—"}
          </div>
          {forecast.daysElapsed > 0 && forecast.daysRemaining > 0 && (
            <div className="ktr">
              {forecast.requiredDaily <= forecast.avgDaily
                ? <><CheckCircle size={13} color="#16a34a"/><span className="cup">Achievable</span></>
                : <><AlertTriangle size={13} color="#dc2626"/><span className="cdn">+{fmt(forecast.requiredDaily - forecast.avgDaily)}/day needed</span></>}
            </div>
          )}
          <div className="ks">To reach {fmt(goal)}</div>
        </div>
        <div className="kc">
          <div className="kl"><Calendar />Month Progress</div>
          <div className="kv">{forecast.daysElapsed}/{totalDays}</div>
          <div className="pb"><div className="pf" style={{ width:`${pctMo}%`, background:"#1d4ed8" }}/></div>
          <div className="ks">{pctMo}% of month elapsed</div>
        </div>
        <div className="kc">
          <div className="kl"><FileText />Total Orders</div>
          <div className="kv">{fmtN(records.reduce((s,r) => s + (r.orders||0), 0))}</div>
          <div className="ks">
            AOV: {records.reduce((s,r)=>s+(r.orders||0),0)>0 ? fmt(forecast.totalSoFar/records.reduce((s,r)=>s+(r.orders||0),0)) : "—"}
          </div>
        </div>
        <div className="kc">
          <div className="kl"><TrendingUp />Pace vs Schedule</div>
          <div className="kv" style={{ color: pctGoal >= pctMo ? "#16a34a" : "#dc2626" }}>
            {pctMo > 0 ? `${pctGoal >= pctMo ? "+" : ""}${pctGoal - pctMo}%` : "—"}
          </div>
          <div className="ks">{pctGoal >= pctMo ? "Ahead of schedule" : "Behind schedule"}</div>
        </div>
      </div>

      {/* Cumulative Chart */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="ch">
          <div>
            <div className="ct" style={{ marginBottom:0 }}>Cumulative Sales — {MONTHS[TODAY.getMonth()]} {TODAY.getFullYear()}</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>Actual trajectory vs. target path</div>
          </div>
        </div>
        {records.length === 0 ? (
          <div className="empty"><BarChart2 size={40}/><p>Add your first daily record to see the chart.</p></div>
        ) : (
          <ResponsiveContainer width="100%" height={230}>
            <ComposedChart data={chartData} margin={{ top:5, right:10, left:10, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="day" tick={{ fontSize:11, fill:"#94a3b8" }}/>
              <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} tickFormatter={n => n>=1000?`${(n/1000).toFixed(0)}k`:n}/>
              <Tooltip contentStyle={{ background:"#0f172a", border:"none", borderRadius:6, fontSize:12, color:"#e2e8f0" }} labelFormatter={d=>`Day ${d}`} formatter={(v,n)=>[v?fmt(v):"-", n==="actual"?"Actual":"Target"]}/>
              <Area type="monotone" dataKey="target" stroke="#94a3b8" strokeDasharray="4 4" fill="none" strokeWidth={1.5} name="target"/>
              <Area type="monotone" dataKey="actual" stroke="#1d4ed8" fill="#dbeafe" fillOpacity={0.35} strokeWidth={2} connectNulls={false} name="actual"/>
              <ReferenceLine y={goal} stroke="#dc2626" strokeDasharray="6 3" label={{ value:"Goal", fill:"#dc2626", fontSize:10 }}/>
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Daily Bars */}
      {records.length > 0 && (
        <div className="card" style={{ marginBottom:20 }}>
          <div className="ct">Daily Sales Breakdown</div>
          <ResponsiveContainer width="100%" height={170}>
            <BarChart data={chartData.filter(d=>d.dailySales!==null)} margin={{ top:5, right:10, left:10, bottom:5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="day" tick={{ fontSize:11, fill:"#94a3b8" }}/>
              <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} tickFormatter={n=>n>=1000?`${(n/1000).toFixed(0)}k`:n}/>
              <Tooltip contentStyle={{ background:"#0f172a", border:"none", borderRadius:6, fontSize:12, color:"#e2e8f0" }} formatter={v=>[fmt(v),"Sales"]} labelFormatter={d=>`Day ${d}`}/>
              <Bar dataKey="dailySales" radius={[3,3,0,0]}>
                {chartData.filter(d=>d.dailySales!==null).map((e,i)=>(
                  <Cell key={i} fill={e.dailySales>=(goal/totalDays) ? "#16a34a" : "#1d4ed8"}/>
                ))}
              </Bar>
              <ReferenceLine y={goal/totalDays} stroke="#d97706" strokeDasharray="4 3" label={{ value:"Daily Target", fill:"#d97706", fontSize:10 }}/>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ fontSize:11, color:"#94a3b8", marginTop:8 }}>
            <span className="dot" style={{ background:"#16a34a" }}/>Met daily target &nbsp;
            <span className="dot" style={{ background:"#1d4ed8" }}/>Below daily target
          </div>
        </div>
      )}

      {/* Records Table */}
      <div className="card">
        <div className="ch">
          <div className="ct" style={{ marginBottom:0 }}>Daily Records</div>
          <span className="badge bb">{records.length} entries</span>
        </div>
        {records.length === 0 ? (
          <div className="empty"><FileText size={40}/><p>No records yet. Click "Add Today's Data" to begin.</p></div>
        ) : (
          <div className="twrap">
            <table>
              <thead><tr><th>Date</th><th>Sales</th><th>Orders</th><th>Avg Order Value</th><th>vs Daily Target</th><th>Notes</th><th></th></tr></thead>
              <tbody>
                {records.map(r => {
                  const dt = goal / totalDays;
                  const diff = Math.round((r.sales - dt) / dt * 100);
                  return (
                    <tr key={r.id}>
                      <td style={{ fontWeight:500 }}>{fmtDate(r.date)}</td>
                      <td style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontWeight:700 }}>{fmt(r.sales)}</td>
                      <td>{r.orders || "—"}</td>
                      <td>{r.orders > 0 ? fmt(r.sales / r.orders) : "—"}</td>
                      <td><span className={`badge ${diff>=0?"bg":"br"}`}>{diff>=0?"+":""}{diff}%</span></td>
                      <td style={{ color:"#94a3b8", fontSize:12, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.notes || ""}</td>
                      <td>
                        <div style={{ display:"flex", gap:5 }}>
                          <button className="btn b-ghost b-sm b-ico" onClick={()=>onEdit(r)} title="Edit"><Edit2 size={12}/></button>
                          <button className="btn b-ghost b-sm b-ico" onClick={()=>onDelete(r.id)} style={{ color:"#dc2626" }} title="Delete"><Trash2 size={12}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ANALYTICS PAGE ────────────────────────────────────────────────────────────
function Analytics({ records, history, goal, forecast, fmt, totalDays }) {
  const curM = TODAY.getMonth(), curY = TODAY.getFullYear();
  const allMonths = [...history, { label:SHORT[curM], month:curM, year:curY, total:forecast.main, goal, orders:records.reduce((s,r)=>s+(r.orders||0),0), isCurrent:true }];
  const avgHist = history.length > 0 ? history.reduce((s,m)=>s+m.total,0)/history.length : 0;
  const lastMo = history[history.length-1];
  const growth = lastMo&&lastMo.total>0 ? ((forecast.main-lastMo.total)/lastMo.total*100).toFixed(1) : null;

  const dow = Array(7).fill(0).map((_,i)=>({ name:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][i], total:0, count:0 }));
  records.forEach(r => { const d=new Date(r.date+"T12:00:00").getDay(); dow[d].total+=r.sales; dow[d].count++; });
  const dowAvg = dow.map(d=>({ ...d, avg:d.count>0?Math.round(d.total/d.count):0 }));
  const maxDow = Math.max(...dowAvg.map(d=>d.avg));

  return (
    <div>
      <div className="three" style={{ marginBottom:20 }}>
        <div className="kc"><div className="kl">6-Month Average</div><div className="kv">{avgHist>0?fmt(avgHist):"—"}</div><div className="ks">Monthly baseline</div></div>
        <div className="kc"><div className="kl">Best Month</div><div className="kv">{history.length>0?fmt(Math.max(...history.map(m=>m.total))):"—"}</div><div className="ks">{history.length>0?history.reduce((a,b)=>a.total>b.total?a:b).label:""}</div></div>
        <div className="kc">
          <div className="kl">Projected Growth</div>
          <div className="kv" style={{ color:growth!==null?(Number(growth)>=0?"#16a34a":"#dc2626"):"#0f172a" }}>{growth!==null?`${Number(growth)>=0?"+":""}${growth}%`:"—"}</div>
          <div className="ks">vs last month</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom:20 }}>
        <div className="ch">
          <div>
            <div className="ct" style={{ marginBottom:0 }}>Monthly Revenue — Last 7 Months</div>
            <div style={{ fontSize:11, color:"#94a3b8", marginTop:3 }}>Historical actuals + current month projection</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={allMonths} margin={{ top:5, right:10, left:10, bottom:5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="label" tick={{ fontSize:11, fill:"#94a3b8" }}/>
            <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} tickFormatter={n=>`${(n/1000).toFixed(0)}k`}/>
            <Tooltip contentStyle={{ background:"#0f172a", border:"none", borderRadius:6, fontSize:12, color:"#e2e8f0" }} formatter={v=>[fmt(v),"Revenue"]}/>
            <ReferenceLine y={goal} stroke="#dc2626" strokeDasharray="5 3" label={{ value:"Goal", fill:"#dc2626", fontSize:10 }}/>
            <Bar dataKey="total" radius={[4,4,0,0]}>
              {allMonths.map((e,i)=>(
                <Cell key={i} fill={e.isCurrent?"#d97706":e.total>=e.goal?"#16a34a":"#1d4ed8"} opacity={e.isCurrent?.8:1}/>
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div style={{ display:"flex", gap:16, marginTop:10, fontSize:11, color:"#64748b", flexWrap:"wrap" }}>
          <span><span className="dot" style={{background:"#16a34a"}}/>Met goal</span>
          <span><span className="dot" style={{background:"#1d4ed8"}}/>Below goal</span>
          <span><span className="dot" style={{background:"#d97706", opacity:.8}}/>Current (projected)</span>
        </div>
      </div>

      <div className="two" style={{ marginBottom:20 }}>
        <div className="card">
          <div className="ct">Performance by Day of Week</div>
          {records.length < 3 ? (
            <div className="empty" style={{ padding:"20px" }}><p>Add 3+ days of data to see patterns.</p></div>
          ) : (
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={dowAvg} margin={{ top:5, right:5, left:5, bottom:5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="name" tick={{ fontSize:11, fill:"#94a3b8" }}/>
                <YAxis tick={{ fontSize:11, fill:"#94a3b8" }} tickFormatter={n=>n>=1000?`${(n/1000).toFixed(0)}k`:n}/>
                <Tooltip contentStyle={{ background:"#0f172a", border:"none", borderRadius:6, fontSize:12, color:"#e2e8f0" }} formatter={v=>[v>0?fmt(v):"No data","Avg Sales"]}/>
                <Bar dataKey="avg" radius={[3,3,0,0]}>
                  {dowAvg.map((e,i)=><Cell key={i} fill={e.avg===maxDow&&e.avg>0?"#16a34a":"#1d4ed8"}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="card">
          <div className="ct">Month Summary</div>
          <div className="twrap">
            <table>
              <thead><tr><th>Month</th><th>Revenue</th><th>vs Goal</th></tr></thead>
              <tbody>
                {allMonths.map((m,i) => {
                  const pct = m.goal>0?Math.round(m.total/m.goal*100):0;
                  return (
                    <tr key={i}>
                      <td style={{ fontWeight:m.isCurrent?700:400, fontSize:12 }}>
                        {m.label} {m.year}{m.isCurrent&&<span className="badge by" style={{ marginLeft:6, fontSize:9 }}>EST</span>}
                      </td>
                      <td style={{ fontWeight:600, fontSize:12 }}>{fmt(m.total)}</td>
                      <td><span className={`badge ${m.total>=m.goal?"bg":"br"}`}>{pct}%</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FORECAST ENGINE PAGE ──────────────────────────────────────────────────────
function ForecastPage({ forecast, goal, totalDays, simInput, setSimInput, fmt }) {
  const simRate = Number(simInput) || 0;
  const simProj = simRate > 0 && forecast.daysRemaining > 0 ? Math.round(forecast.totalSoFar + simRate * forecast.daysRemaining) : null;
  const scenarios = forecast.daysElapsed > 0 ? [
    { label:"Pessimistic", desc:"15% below recent pace", value:forecast.pessimistic, color:"#dc2626" },
    { label:"Conservative", desc:"Overall average trend", value:forecast.linear, color:"#d97706" },
    { label:"Base Case", desc:"Weighted recent pace", value:forecast.main, color:"#1d4ed8" },
    { label:"Optimistic", desc:"15% above recent pace", value:forecast.optimistic, color:"#16a34a" },
  ] : [];

  return (
    <div>
      <div className="sim">
        <h3>What-If Scenario Simulator</h3>
        <p>Enter a hypothetical daily sales rate to project the end-of-month outcome.</p>
        <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <input className="si" type="number" min="0" placeholder={`e.g. ${Math.round(forecast.avgDaily||3000)}`} value={simInput} onChange={e=>setSimInput(e.target.value)}/>
          <span style={{ color:"#64748b", fontSize:13 }}>per day &times; {forecast.daysRemaining} remaining days</span>
        </div>
        {simProj && (
          <div className="sr">
            <div><div className="srl">Projected Total</div><div className="srv" style={{ color:simProj>=goal?"#86efac":"#fca5a5" }}>{fmt(simProj)}</div></div>
            <div><div className="srl">vs Goal</div><div className="srv" style={{ color:simProj>=goal?"#86efac":"#fca5a5" }}>{simProj>=goal?"+":""}{fmt(simProj-goal)}</div></div>
            <div><div className="srl">Achievement</div><div className="srv" style={{ color:simProj>=goal?"#86efac":"#fca5a5" }}>{Math.round(simProj/goal*100)}%</div></div>
            <div><div className="srl">vs Current Avg</div><div className="srv" style={{ fontSize:16 }}>{forecast.avgDaily>0?`${simRate>=forecast.avgDaily?"+":""}${Math.round((simRate-forecast.avgDaily)/forecast.avgDaily*100)}%`:"—"}</div></div>
          </div>
        )}
      </div>

      {forecast.daysElapsed > 0 && (
        <div className="card" style={{ marginBottom:20 }}>
          <div className="ct">Forecast Scenarios</div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {scenarios.map(s => {
              const pct = Math.round(s.value/goal*100);
              return (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:120, flexShrink:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:s.color }}>{s.label}</div>
                    <div style={{ fontSize:10, color:"#94a3b8", marginTop:1 }}>{s.desc}</div>
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ height:8, background:"#f1f5f9", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ width:`${Math.min(115,pct)}%`, height:"100%", background:s.color, borderRadius:4, opacity:.8 }}/>
                    </div>
                  </div>
                  <div style={{ width:110, textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:15, fontWeight:700, color:s.color }}>{fmt(s.value)}</div>
                    <div style={{ fontSize:10, color:"#94a3b8" }}>{pct}% of goal</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="div"/>
          <div style={{ fontSize:12, color:"#64748b" }}>
            <strong>Goal: {fmt(goal)}</strong> &nbsp;|&nbsp; To date: {fmt(forecast.totalSoFar)} &nbsp;|&nbsp; {forecast.daysRemaining} days remaining &nbsp;|&nbsp; Required: {fmt(forecast.requiredDaily)}/day
          </div>
        </div>
      )}

      {forecast.daysElapsed > 0 && (
        <div className="two">
          <div className="card">
            <div className="ct">Goal Threshold Targets</div>
            {[100, 90, 80, 75].map(pct => {
              const target = goal * pct / 100;
              const need = forecast.daysRemaining > 0 ? Math.max(0, (target - forecast.totalSoFar) / forecast.daysRemaining) : 0;
              return (
                <div key={pct} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid #f1f5f9" }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600 }}>{pct}% of Goal</div>
                    <div style={{ fontSize:11, color:"#94a3b8" }}>{fmt(target)}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Libre Baskerville',Georgia,serif", fontSize:14, fontWeight:700, color:need<=forecast.avgDaily?"#16a34a":"#dc2626" }}>{fmt(need)}/day</div>
                    <div style={{ fontSize:10, color:"#94a3b8" }}>required</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <div className="ct">Performance Snapshot</div>
            {[
              { label:"Days Elapsed", value:`${forecast.daysElapsed} of ${totalDays}` },
              { label:"Total Revenue", value:fmt(forecast.totalSoFar) },
              { label:"Overall Avg/Day", value:fmt(forecast.avgDaily) },
              { label:"Last 7 Days Avg", value:fmt(forecast.recentAvg) },
              { label:"Required/Day", value:fmt(forecast.requiredDaily), red:forecast.requiredDaily>forecast.avgDaily },
              { label:"Momentum Score", value:`${forecast.momentumScore}/100`, green:forecast.momentumScore>=65 },
            ].map(item => (
              <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:"1px solid #f1f5f9" }}>
                <span style={{ fontSize:12, color:"#64748b" }}>{item.label}</span>
                <span style={{ fontSize:13, fontWeight:700, color:item.red?"#dc2626":item.green?"#16a34a":"#0f172a" }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {forecast.daysElapsed === 0 && (
        <div className="empty"><Sliders size={40}/><p>Add daily records on the Dashboard to unlock forecast analysis.</p></div>
      )}
    </div>
  );
}

// ─── RECOMMENDATIONS PAGE ──────────────────────────────────────────────────────
function Recommendations({ recs, loading, onFetch, forecast, goal, fmt }) {
  const pc = { high:"#dc2626", medium:"#d97706", low:"#16a34a" };
  return (
    <div>
      <div className="card" style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div className="ct" style={{ marginBottom:4 }}>AI-Powered Sales Intelligence</div>
            <div style={{ fontSize:13, color:"#64748b", lineHeight:1.6, maxWidth:460 }}>
              Analyzes your current trajectory, momentum, and performance gaps to generate actionable recommendations for your growth team.
            </div>
          </div>
          <button className="btn b-blue" onClick={onFetch} disabled={loading||forecast.daysElapsed===0} style={{ flexShrink:0, marginLeft:20 }}>
            {loading ? <span className="spin"/> : <Brain size={14}/>}
            {loading ? "Analyzing..." : "Generate Recommendations"}
          </button>
        </div>
        {forecast.daysElapsed > 0 && (
          <div style={{ display:"flex", gap:20, marginTop:16, padding:14, background:"#f8fafc", borderRadius:6, flexWrap:"wrap" }}>
            {[
              { label:"Momentum", value:`${forecast.momentumScore}/100` },
              { label:"Current Pace", value:`${fmt(forecast.avgDaily)}/day` },
              { label:"Required Pace", value:`${fmt(forecast.requiredDaily)}/day`, red:true },
              { label:"Projected Achievement", value:forecast.main>0?`${Math.round(forecast.main/goal*100)}%`:"—", color:forecast.main>=goal?"#16a34a":"#dc2626" },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:.8, color:"#94a3b8", marginBottom:2 }}>{item.label}</div>
                <strong style={{ fontSize:14, color:item.color||(item.red?"#dc2626":"#0f172a") }}>{item.value}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {recs.length === 0 && !loading && (
        <div className="empty">
          <Brain size={40}/>
          <p>{forecast.daysElapsed===0 ? "Add data on the Dashboard first, then generate recommendations." : "Click \"Generate Recommendations\" to get AI-powered insights."}</p>
        </div>
      )}

      {recs.map((r, i) => (
        <div key={i} className="rec" style={{ borderLeftColor:pc[r.priority]||"#94a3b8" }}>
          <div className="rp" style={{ color:pc[r.priority] }}>{r.priority?.toUpperCase()} PRIORITY</div>
          <div className="rt">{r.title}</div>
          <div className="rb">{r.body}</div>
          {r.impact && <div className="ri">Expected Impact: {r.impact}</div>}
        </div>
      ))}
    </div>
  );
}

// ─── SETTINGS PAGE ──────────────────────────────────────────────────────────────
function SettingsPage({ goal, setGoal, currency, setCurrency, totalDays }) {
  const [gi, setGi] = useState(String(goal));
  const fmt2 = makeFmt(currency);
  return (
    <div>
      <div className="card" style={{ marginBottom:16 }}>
        <div className="stitle">Monthly Sales Goal</div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <input className="fi" type="number" min="0" value={gi} onChange={e=>setGi(e.target.value)} style={{ maxWidth:200 }}/>
          <button className="btn b-blue" onClick={()=>{ const n=Number(gi); if(n>0) setGoal(n); }}>Save Goal</button>
        </div>
        <div style={{ fontSize:12, color:"#94a3b8", marginTop:8 }}>Daily target: {fmt2(Number(gi)/totalDays)}/day over {totalDays} days</div>
      </div>
      <div className="card" style={{ marginBottom:16 }}>
        <div className="stitle">Display Currency</div>
        <select className="fi" style={{ maxWidth:220 }} value={currency} onChange={e=>setCurrency(e.target.value)}>
          <option value="USD">USD — US Dollar</option>
          <option value="SAR">SAR — Saudi Riyal</option>
          <option value="AED">AED — UAE Dirham</option>
          <option value="EGP">EGP — Egyptian Pound</option>
          <option value="EUR">EUR — Euro</option>
          <option value="GBP">GBP — British Pound</option>
        </select>
      </div>
      <div className="card">
        <div className="stitle">About Future Sales</div>
        <p style={{ fontSize:13, color:"#64748b", lineHeight:1.7 }}>Future Sales is a professional sales performance intelligence platform for eCommerce and growth teams. Enter daily figures to get real-time projections, trend analysis, and AI-powered recommendations that inform your daily operational decisions.</p>
        <div style={{ marginTop:14, padding:12, background:"#f8fafc", borderRadius:6, fontSize:12, color:"#94a3b8" }}>All data is stored locally in your browser and persists across sessions.</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function FutureSalesApp() {
  const y = TODAY.getFullYear(), m = TODAY.getMonth();
  const totalDays = daysIn(y, m);

  const [page, setPage] = useState("dashboard");
  const [records, setRecords] = useState([]);
  const [goal, setGoal] = useState(90000);
  const [currency, setCurrency] = useState("USD");
  const [history, setHistory] = useState(() => genHistory(m, y, 90000));
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ date:TODAY.toISOString().split("T")[0], sales:"", orders:"", notes:"" });
  const [aiRecs, setAiRecs] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [simInput, setSimInput] = useState("");
  const [ready, setReady] = useState(false);

  // Persist
  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("fs2-records"); if(r) setRecords(JSON.parse(r.value));
        const g = await window.storage.get("fs2-goal"); if(g) setGoal(Number(g.value));
        const c = await window.storage.get("fs2-currency"); if(c) setCurrency(c.value);
        const h = await window.storage.get("fs2-history"); if(h) setHistory(JSON.parse(h.value));
      } catch(e) {}
      setReady(true);
    })();
  }, []);

  useEffect(() => { if(ready) window.storage.set("fs2-records", JSON.stringify(records)).catch(()=>{}); }, [records, ready]);
  useEffect(() => { if(ready) window.storage.set("fs2-goal", String(goal)).catch(()=>{}); }, [goal, ready]);
  useEffect(() => { if(ready) window.storage.set("fs2-currency", currency).catch(()=>{}); }, [currency, ready]);

  const fmt = useMemo(() => makeFmt(currency), [currency]);
  const forecast = useMemo(() => calcForecast(records, totalDays, goal), [records, totalDays, goal]);
  const chartData = useMemo(() => buildChart(records, totalDays, goal), [records, totalDays, goal]);
  const sorted = useMemo(() => [...records].sort((a,b) => new Date(b.date)-new Date(a.date)), [records]);

  const openAdd = () => { setEditing(null); setForm({ date:TODAY.toISOString().split("T")[0], sales:"", orders:"", notes:"" }); setShowModal(true); };
  const openEdit = r => { setEditing(r); setForm({ date:r.date, sales:String(r.sales), orders:String(r.orders||""), notes:r.notes||"" }); setShowModal(true); };
  const saveRecord = () => {
    if(!form.sales||!form.date) return;
    const rec = { id:editing?editing.id:Date.now(), date:form.date, sales:Number(form.sales), orders:Number(form.orders)||0, notes:form.notes||"" };
    if(editing) { setRecords(p=>p.map(r=>r.id===editing.id?rec:r)); }
    else { setRecords(p=>{ const ex=p.find(r=>r.date===form.date); return ex?p.map(r=>r.date===form.date?rec:r):[...p,rec]; }); }
    setShowModal(false); setEditing(null);
  };
  const deleteRecord = id => setRecords(p=>p.filter(r=>r.id!==id));

  const fetchAI = async () => {
    setAiLoading(true); setAiRecs([]);
    try {
      const ctx = { daysElapsed:forecast.daysElapsed, daysRemaining:forecast.daysRemaining, totalSoFar:forecast.totalSoFar, goal, projectedFinal:forecast.main, avgDaily:Math.round(forecast.avgDaily), recentAvg:Math.round(forecast.recentAvg), requiredDaily:Math.round(forecast.requiredDaily), momentumScore:forecast.momentumScore, pctGoal:goal>0?Math.round(forecast.totalSoFar/goal*100):0, currency };
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
          messages:[{ role:"user", content:`You are an expert eCommerce growth analyst. Return ONLY a JSON array of 4 recommendations based on this data: ${JSON.stringify(ctx)}. Format: [{"priority":"high"|"medium"|"low","title":"string","body":"string","impact":"string"}]. Be specific and data-driven. No markdown, no explanation outside the JSON array.` }]
        })
      });
      const data = await res.json();
      const text = data.content?.[0]?.text||"[]";
      setAiRecs(JSON.parse(text.replace(/```json|```/g,"").trim()));
    } catch(e) {
      setAiRecs([
        { priority:"high", title:"Close the Daily Gap Immediately", body:`Your current pace of ${fmt(forecast.avgDaily)}/day is ${fmt(Math.abs(forecast.requiredDaily-forecast.avgDaily))} ${forecast.requiredDaily>forecast.avgDaily?"below":"above"} the ${fmt(forecast.requiredDaily)}/day needed to hit goal. Scale top-performing ad campaigns today.`, impact:"Estimated +15-20% projected total" },
        { priority:"high", title:"Launch a 48-Hour Flash Promotion", body:"Deploy a time-limited offer targeting your highest-converting customer segments. Flash sales in the middle of the month typically generate 2-3x daily revenue with minimal long-term margin impact.", impact:"Estimated +1 to 2 days of extra revenue" },
        { priority:"medium", title:"Activate CRM Reactivation Sequence", body:"Trigger an automated email sequence for customers who purchased 30-90 days ago. Personalized win-back flows with a 10-15% exclusive discount typically convert at 8-12%.", impact:"Estimated 8-12% lift in orders" },
        { priority:"low", title:"Reduce Cart Abandonment Rate", body:"Implement or optimize a 3-step cart abandonment email sequence (1hr, 24hr, 72hr). Focus on addressing shipping concerns and offering a small incentive on the third email only.", impact:"Estimated 5-8% recovery of lost carts" }
      ]);
    }
    setAiLoading(false);
  };

  const exportPDF = () => {
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Future Sales Report</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap');
      body{font-family:'Source Sans 3',Arial,sans-serif;color:#0f172a;margin:0;padding:36px;background:#fff}
      h1{font-family:'Libre Baskerville',Georgia,serif;font-size:26px;margin-bottom:4px}
      .sub{color:#64748b;font-size:13px;margin-bottom:28px}
      .fbox{background:#1e3a8a;color:#fff;padding:20px 24px;border-radius:8px;margin-bottom:24px}
      .fbox .lbl{font-size:10px;text-transform:uppercase;letter-spacing:1px;opacity:.7}
      .fbox .val{font-family:'Libre Baskerville',Georgia,serif;font-size:34px;font-weight:700;margin:4px 0}
      .fbox .s{font-size:12px;opacity:.8}
      .krow{display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap}
      .kk{flex:1;min-width:140px;padding:14px;background:#f8fafc;border-radius:6px;border:1px solid #e2e8f0}
      .kk .l{font-size:9px;text-transform:uppercase;letter-spacing:1px;color:#64748b;font-weight:700;margin-bottom:5px}
      .kk .v{font-family:'Libre Baskerville',Georgia,serif;font-size:20px;font-weight:700}
      h2{font-family:'Libre Baskerville',Georgia,serif;font-size:15px;margin-bottom:12px;color:#1e3a8a;margin-top:24px}
      table{width:100%;border-collapse:collapse;font-size:12px;margin-bottom:20px}
      th{background:#f1f5f9;padding:8px 12px;text-align:left;font-weight:700;color:#475569;border-bottom:1px solid #e2e8f0}
      td{padding:8px 12px;border-bottom:1px solid #f8fafc}
      .rec{padding:12px 14px;margin-bottom:10px;border-radius:6px;border-left:4px solid}
      .rec.high{border-color:#dc2626;background:#fff1f2}.rec.medium{border-color:#d97706;background:#fffbeb}.rec.low{border-color:#16a34a;background:#f0fdf4}
      .rec .t{font-weight:700;margin-bottom:3px;font-size:13px}.rec .b{font-size:12px;color:#475569}
      footer{margin-top:32px;font-size:11px;color:#94a3b8;text-align:center;border-top:1px solid #e2e8f0;padding-top:14px}
    </style></head><body>
    <h1>Future Sales</h1>
    <div class="sub">Monthly Performance Report — ${MONTHS[m]} ${y}</div>
    <div class="fbox">
      <div class="lbl">Projected End-of-Month Total</div>
      <div class="val">${fmt(forecast.main)}</div>
      <div class="s">Goal: ${fmt(goal)} &nbsp;|&nbsp; Momentum: ${forecast.momentumScore}/100 &nbsp;|&nbsp; ${forecast.daysRemaining} days remaining</div>
    </div>
    <div class="krow">
      <div class="kk"><div class="l">Sales to Date</div><div class="v">${fmt(forecast.totalSoFar)}</div></div>
      <div class="kk"><div class="l">Goal Progress</div><div class="v">${goal>0?Math.round(forecast.totalSoFar/goal*100):0}%</div></div>
      <div class="kk"><div class="l">Avg Daily</div><div class="v">${fmt(forecast.avgDaily)}</div></div>
      <div class="kk"><div class="l">Required Daily</div><div class="v">${fmt(forecast.requiredDaily)}</div></div>
    </div>
    <h2>Daily Records — ${MONTHS[m]} ${y}</h2>
    <table><thead><tr><th>Date</th><th>Sales</th><th>Orders</th><th>Avg Order Value</th><th>Notes</th></tr></thead>
    <tbody>${sorted.map(r=>`<tr><td>${fmtDate(r.date)}</td><td><strong>${fmt(r.sales)}</strong></td><td>${r.orders||"—"}</td><td>${r.orders>0?fmt(r.sales/r.orders):"—"}</td><td>${r.notes||""}</td></tr>`).join("")}</tbody></table>
    ${aiRecs.length>0?`<h2>AI Recommendations</h2>${aiRecs.map(r=>`<div class="rec ${r.priority}"><div class="t">${r.title}</div><div class="b">${r.body}</div>${r.impact?`<div style="margin-top:7px;font-size:11px;color:#64748b;font-weight:600">${r.impact}</div>`:""}</div>`).join("")}`:""}
    <footer>Generated by Future Sales &nbsp;|&nbsp; ${new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"})}</footer>
    <script>window.print();</script></body></html>`;
    const w = window.open("","_blank"); w.document.write(html); w.document.close();
  };

  const pageLabels = { dashboard:"Dashboard", analytics:"Analytics", forecast:"Forecast Engine", recommendations:"AI Recommendations", settings:"Settings" };

  return (
    <>
      <G/>
      <div id="fsapp">
        {/* SIDEBAR */}
        <aside className="sb">
          <div className="sb-logo">
            <div className="sb-name">Future Sales</div>
            <div className="sb-sub">Performance Intelligence</div>
          </div>
          <nav className="sb-nav">
            {[
              { id:"dashboard", label:"Dashboard", Icon:LayoutDashboard },
              { id:"analytics", label:"Analytics", Icon:BarChart2 },
              { id:"forecast", label:"Forecast Engine", Icon:Sliders },
              { id:"recommendations", label:"Recommendations", Icon:Lightbulb },
              { id:"settings", label:"Settings", Icon:Settings },
            ].map(({ id, label, Icon }) => (
              <button key={id} className={`ni ${page===id?"active":""}`} onClick={()=>setPage(id)}>
                <Icon size={14}/>{label}
              </button>
            ))}
          </nav>
          <div className="sb-foot">
            <div>{MONTHS[m]} {y}</div>
            <div style={{ fontSize:10, color:"#475569", marginTop:3 }}>Day {TODAY.getDate()} of {totalDays}</div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="main">
          <header className="topbar">
            <div className="topbar-title">{pageLabels[page]}</div>
            <div className="topbar-actions">
              {page === "dashboard" && (
                <button className="btn b-blue" onClick={openAdd}><Plus size={14}/>Add Today's Data</button>
              )}
              <button className="btn b-ghost" onClick={exportPDF}><Download size={14}/>Export PDF</button>
            </div>
          </header>

          <main className="content">
            {page==="dashboard" && <Dashboard records={sorted} forecast={forecast} goal={goal} totalDays={totalDays} chartData={chartData} fmt={fmt} onEdit={openEdit} onDelete={deleteRecord}/>}
            {page==="analytics" && <Analytics records={records} history={history} goal={goal} forecast={forecast} fmt={fmt} totalDays={totalDays}/>}
            {page==="forecast" && <ForecastPage forecast={forecast} goal={goal} totalDays={totalDays} simInput={simInput} setSimInput={setSimInput} fmt={fmt}/>}
            {page==="recommendations" && <Recommendations recs={aiRecs} loading={aiLoading} onFetch={fetchAI} forecast={forecast} goal={goal} fmt={fmt}/>}
            {page==="settings" && <SettingsPage goal={goal} setGoal={setGoal} currency={currency} setCurrency={setCurrency} totalDays={totalDays}/>}
          </main>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="mo" onClick={e=>e.target===e.currentTarget&&setShowModal(false)}>
            <div className="mb">
              <div className="mt">{editing?"Edit Record":"Add Daily Record"}</div>
              <div className="fr"><label className="fl">Date</label><input className="fi" type="date" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))}/></div>
              <div className="fr"><label className="fl">Sales Amount ({currency})</label><input className="fi" type="number" min="0" placeholder="e.g. 3500" value={form.sales} onChange={e=>setForm(p=>({...p,sales:e.target.value}))}/></div>
              <div className="fr"><label className="fl">Number of Orders</label><input className="fi" type="number" min="0" placeholder="e.g. 28" value={form.orders} onChange={e=>setForm(p=>({...p,orders:e.target.value}))}/></div>
              <div className="fr"><label className="fl">Notes (optional)</label><input className="fi" type="text" placeholder="e.g. Flash sale day, campaign launch..." value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))}/></div>
              <div className="ma">
                <button className="btn b-ghost" onClick={()=>{setShowModal(false);setEditing(null);}}>Cancel</button>
                <button className="btn b-blue" onClick={saveRecord}>{editing?"Save Changes":"Add Record"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
