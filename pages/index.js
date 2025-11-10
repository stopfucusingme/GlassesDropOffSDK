import QuoteForm from '../components/QuoteForm'

export default function Home(){
  return (
    <div className="container">
      <div className="header">
        <div className="logo" />
        <div className="brand">Glasses Drop Off</div>
      </div>
      <h1>Premium Prescription Lenses — Mail-In Made Easy</h1>
      <p className="note">Replace the lenses in your favorite frames. Simple pricing, fast turnaround, and we’ll mail your finished glasses back to you.</p>
      <QuoteForm />
      <hr/>
      <p className="footer-note">Questions? Email support@glassesdropoff.com • Brand color can be adjusted in <code>styles/globals.css</code>.</p>
    </div>
  )
}
