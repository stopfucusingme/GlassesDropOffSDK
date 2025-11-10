export default function handler(req, res){
  if(req.method !== 'POST'){
    return res.status(405).json({ ok:false, message: 'Method not allowed'})
  }
  const { name='', email='', address='', lensType='single', addons=[], notes='' } = req.body || {}
  const base = lensType === 'single' ? 150 : 350
  const extras = Array.isArray(addons) ? addons.length * 50 : 0
  const total = base + extras
  return res.status(200).json({
    ok: true,
    total,
    form: { name, email, address, lensType, addons, notes }
  })
}
