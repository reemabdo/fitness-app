export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      
      <header style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "700" }}>
          FitFuel
        </h1>
        <p style={{ fontSize: "18px", color: "#555" }}>
          Personalized workouts + nutrition plans tailored to your goals.
        </p>

        <button style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          background: "black",
          color: "white",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}>
          Get Started
        </button>
      </header>

      <section style={{ marginBottom: "40px" }}>
        <h2>What You Get</h2>
        <ul>
          <li>Custom workout plans based on your goals</li>
          <li>Personalized meal plans</li>
          <li>Weekly updates & adjustments</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}>
        <h2>Plans</h2>
        <div style={{ display: "flex", gap: "20px" }}>
          
          <div style={{ border: "1px solid #ddd", padding: "20px", flex: 1 }}>
            <h3>Starter</h3>
            <p>$9.99 / month</p>
            <p>Basic workouts + meal templates</p>
          </div>

          <div style={{ border: "2px solid black", padding: "20px", flex: 1 }}>
            <h3>Pro</h3>
            <p>$19.99 / month</p>
            <p>Personalized plans + weekly updates</p>
          </div>

        </div>
      </section>

      <footer style={{ textAlign: "center", marginTop: "60px", color: "#777" }}>
        © 2026 FitFuel. All rights reserved.
      </footer>

    </main>
  );
}