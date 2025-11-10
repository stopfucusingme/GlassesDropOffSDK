import { useState } from 'react'

const ADDONS = [
  { id: 'transitions', label: 'Transitions' },
  { id: 'sunglass', label: 'Sunglass Tint' },
  { id: 'bluelight', label: 'Blue-Light Filter' },
]

function formatUSD(n){
  return n.toLocaleString('en-US',{style:'currency',currency:'USD'})
}

export default function QuoteForm(){
  const [form, setForm] = useState({
    name:'',
    email:'',
    address:'',
    lensType:'single',
    addons:[],
    notes:'',
  })
  const [total, setTotal] = useState(150)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const calc = (lensType, addons) => {
    const base = lensType === 'single' ? 150 : 350
    const extras = addons.length * 50
    return base + extras
  }

  const onChange = (e)=>{
    const { name, value } = e.target
    const updated = {...form, [name]: value}
    if(name==='lensType'){
      setTotal(calc(value, form.addons))
    }
    setForm(updated)
  }

  const toggleAddon = (id)=>{
    const exists = form.addons.includes(id)
    const nextAddons = exists ? form.addons.filter(a=>a!==id) : [...form.addons, id]
    setForm({...form, addons: nextAddons})
    setTotal(calc(form.lensType, nextAddons))
  }

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const res = await fetch('/api/quote',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    }catch(err){
      setResult({ ok:false, message:'Something went wrong. Try again.'})
    }finally{
      setLoading(false)
    }
  }

  const copySummary = async ()=>{
    if(!result) return
    const text = [
      `Glasses Drop Off — Order Summary`,
      `Name: ${result.form.name}`,
      `Email: ${result.form.email}`,
      `Address: ${result.form.address}`,
      `Lens Type: ${result.form.lensType==='single'?'Single Vision':'Progressive'}`,
      `Add-ons: ${result.form.addons.length? result.form.addons.join(', '):'None'}`,
      `Notes: ${result.form.notes||'-'}`,
      `Total: ${formatUSD(result.total)}`,
    ].join('\n')
    await navigator.clipboard.writeText(text)
    alert('Summary copied to clipboard.')
  }

  return (
    <div className="card">
      <h2>Instant Lens Quote</h2>
      <p className="note">Pricing: Single Vision $150, Progressive $350. Each add‑on is +$50 (Transitions, Sunglass Tint, Blue‑Light).</p>
      <form onSubmit={submit}>
        <div className="row">
          <div>
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={onChange} placeholder="Jane Doe" required />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" required />
          </div>
        </div>

        <label htmlFor="address">Shipping Address (we mail your finished glasses here)</label>
        <textarea id="address" name="address" rows={3} value={form.address} onChange={onChange} placeholder="Street, City, State, ZIP" required />

        <div className="row">
          <div>
            <label>Lens Type</label>
            <select name="lensType" value={form.lensType} onChange={onChange}>
              <option value="single">Single Vision — $150</option>
              <option value="progressive">Progressive — $350</option>
            </select>
          </div>
          <div>
            <label>Upgrades (+$50 each)</label>
            <div className="flex" style={{flexWrap:'wrap'}}>
              {ADDONS.map(a=> (
                <label key={a.id} className="badge" style={{marginRight:8, marginBottom:8, cursor:'pointer'}}>
                  <input type="checkbox" checked={form.addons.includes(a.id)} onChange={()=>toggleAddon(a.id)} style={{marginRight:6}}/>
                  {a.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label htmlFor="notes">Notes (PD, special requests, etc.)</label>
        <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={onChange} placeholder="Optional" />

        <div className="flex" style={{justifyContent:'space-between', marginTop:12}}>
          <div className="total">Total: {formatUSD(total)}</div>
          <div className="flex">
            <button type="button" className="cta secondary" onClick={()=>{setForm({...form, lensType:'single', addons:[], notes:''}); setTotal(150)}}>Reset</button>
            <button className="cta" disabled={loading}>{loading?'Calculating...':'Get Quote'}</button>
          </div>
        </div>
      </form>

      {result && (
        <div className="card success">
          <h3>Quote Ready</h3>
          <p><strong>Total:</strong> {formatUSD(result.total)}</p>
          <p className="note">Next: Click “Copy Summary” and paste it into an email or message if you want to save it. Payment + shipping label can be added later.</p>
          <div className="flex">
            <button className="cta" onClick={copySummary}>Copy Summary</button>
          </div>
        </div>
      )}
    </div>
  )
}
