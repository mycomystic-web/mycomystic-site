import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function XCallback() {
  const [message, setMessage] = useState("Verifying X account...");

  useEffect(() => {
    const verifyX = async () => {
      try {
        const params = new URLSearchParams(window.location.search);

        const code = params.get("code");
        const state = params.get("state");

        const savedState =
          localStorage.getItem("x_oauth_state");

        const codeVerifier =
          localStorage.getItem("x_code_verifier");

        if (!code || !state) {
          setMessage("X verification failed.");
          return;
        }

        if (state !== savedState) {
          setMessage("X verification failed: invalid state.");
          return;
        }

        if (!codeVerifier) {
          setMessage("X verification failed: missing verifier.");
          return;
        }

        const redirectUri =
          `${window.location.origin}/x-callback`;

        const { data, error } =
          await supabase.functions.invoke("x-verify", {
            body: {
              code,
              codeVerifier,
              redirectUri,
            },
          });

        if (error) {
          console.error(error);
          setMessage("Could not verify X account.");
          return;
        }

        if (!data?.success || !data?.user) {
  console.error(data);
  localStorage.removeItem("x_verified");
  setMessage("Could not verify X account.");
  return;
}

if (!data.followsBabyOrca) {
  console.log("X account does NOT follow BabyOrcaX");

  localStorage.removeItem("x_verified");
  localStorage.removeItem("x_user");

  setMessage(
    "You must follow @BabyOrcaX on X before joining the whitelist."
  );

  return;
}

localStorage.setItem(
  "x_verified",
  "true"
);

        localStorage.setItem(
          "x_user",
          JSON.stringify(data.user)
        );

        localStorage.removeItem("x_oauth_state");
        localStorage.removeItem("x_code_verifier");

        window.location.href = "/whitelist";
      } catch (error) {
        console.error(error);
        setMessage("Could not verify X account.");
      }
    };

    verifyX();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1a1a2e, #0a0a0a)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: "20px",
      }}
    >
      {message}
    </div>
  );
}

export default XCallback;