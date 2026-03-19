"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui", padding: "2rem", textAlign: "center", backgroundColor: "#F5F0E8", color: "#2C2C2C" }}>
        <h1>Something went wrong</h1>
        <p>Please try again or contact support.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#8B5E3C",
            color: "#F5F0E8",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
