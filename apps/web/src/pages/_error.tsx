import type { NextPageContext } from "next";

interface ErrorPageProps {
  statusCode?: number;
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#F5F0E8",
        color: "#2C2C2C",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
          {statusCode ? `Error ${statusCode}` : "Something went wrong"}
        </h1>
        <p>Please try again or return to HORO.</p>
      </div>
    </main>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return { statusCode };
};
