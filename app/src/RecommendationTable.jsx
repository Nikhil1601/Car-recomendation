function RecommendationTable({ recommendations }) {
  if (!recommendations?.length) {
    return null
  }

  const hasEV = recommendations.some(
    (car) => car.fuel?.toLowerCase() === 'ev'
  )

  return (
    <section className="panel">
      <h2>Recommended Cars</h2>

      <div className="table-wrapper">
        <table className="recommendation-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Car</th>
              <th>Fuel</th>
              <th>Variant</th>
              <th>Price (Lakhs)</th>
              <th>Safety</th>
              <th>Mileage</th>
              {hasEV && <th>Range (km)</th>}
            </tr>
          </thead>

          <tbody>
            {recommendations.map((car, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{car.name}</td>
                <td>{car.fuel}</td>
                <td>{car.variant}</td>
                <td>{car.price}</td>
                <td>{car.safety_ratings}</td>
                <td>{car.mileage}</td>
                {hasEV && (
                  <td>
                    {car.fuel?.toLowerCase() === 'ev'
                      ? car.range ?? '-'
                      : '-'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default RecommendationTable