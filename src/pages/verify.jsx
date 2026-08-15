import { useEffect, useState } from "react";

export default function VerifyPage() {
  const [status, setStatus] = useState("Connecting with Discord...");

  useEffect(() => {
    const verifyDiscord = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (!code) {
          setStatus("Discord authorization code was not received.");
          return;
        }

        const response = await fetch(
          "https://uyftcwzoevdqjtxkmvpm.supabase.co/functions/v1/discord-verify",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
              redirect_uri: `${window.location.origin}/verify`,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.error("Discord verification error:", data);
          setStatus("Discord verification failed.");
          return;
        }

        console.log("Discord verification:", data);

        // Guardar que Discord fue verificado
        localStorage.setItem("discord_verified", "true");

        // Guardar información básica del usuario de Discord
        if (data.user) {
          localStorage.setItem(
            "discord_user",
            JSON.stringify(data.user)
          );
        }

        setStatus("✅ Discord verified successfully! Redirecting...");

        // Regresar automáticamente al Dashboard
        setTimeout(() => {
          window.location.href = "/whitelist";
        }, 1500);

      } catch (error) {
        console.error("Verification error:", error);
        setStatus("Discord verification failed.");
      }
    };

    verifyDiscord();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "30px",
      }}
    >
      <div>
        <h1>Baby Orca Verification</h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          {status}
        </p>
      </div>
    </div>
  );
}