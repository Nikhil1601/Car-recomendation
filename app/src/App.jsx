import { useState } from 'react'
import Select from 'react-select'
import RecommendationTable from './RecommendationTable'

const priorityOptions = [
  { value: 'mileage', label: 'Mileage' },
  { value: 'safety', label: 'Safety' },
]

function App() {
  const [fuel, setFuel] = useState('Petrol')
  const [price, setPrice] = useState(15)
  const [variant, setVariant] = useState('XZ')
  const [priorities, setPriorities] = useState([priorityOptions[0], priorityOptions[1]])
  const [limit, setLimit] = useState(5)
  const [recommendations, setRecommendations] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      fuel,
      price,
      variant,
      priorities: priorities.map((p) => p.value),
    limit,
    };
    console.log(payload);
    try {
      const response = await fetch('http://127.0.0.1:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      setRecommendations(data)
      console.log('Recommendations:', data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Car Recommendation AI</p>
          <h1>Find the best car for your needs</h1>
        </div>
      </header>

      <main className="content">
        <section className="panel">
          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Fuel type
              <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>EV</option>
              </select>
            </label>

            <label>
              Max price (lakhs)
              <input
                type="number"
                min="0"
                step="0.1"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </label>

            <label>
              Variant
              <select value={variant} onChange={(e) => setVariant(e.target.value)}>
  <option>XZ</option>
  <option>ZXi+</option>
  <option>SX(O)</option>
  <option>LX(O)</option>
  <option>HTX</option>
  <option>XTA</option>
  <option>AX7</option>
  <option>Alpha</option>
  <option>Sharp</option>
  <option>XZA+</option>
</select>
            </label>

            <label>
              Preferences
              <Select
  isMulti
  options={priorityOptions}
  value={priorities}
  onChange={setPriorities}
  getOptionLabel={(option) => option.label}
  classNamePrefix="react-select"
/>

<div>
  {priorities.map((p, index) => (
    <div key={p.value}>
      Priority {index + 1}: {p.label}
    </div>
  ))}
</div>
            </label>

            <label>
              Limit
              <input
                type="number"
                min="1"
                max="20"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              />
              Max limit is 20
            </label>

            <button type="submit">Get Recommendations</button>
          </form>
        </section>
        <section className="table">
         <div className="recommendation-table-placeholder">
         <RecommendationTable recommendations={recommendations} />
    </div>
        </section>
      </main>
    </div>
  )
}

export default App
