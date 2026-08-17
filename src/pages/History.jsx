import { useState } from "react";
import { useNavigate } from "react-router-dom";

// =====================================
// DATOS DE PRUEBA
// =====================================

const babyOrcaHistory = {
  1230: [
    {
      date: "August 26, 2026",
      title: "Coming Soon #001",
      reward: "The history of this Baby Orca will begin after the mint.",
    },
  ],

  4581: [
    {
      date: "August 26, 2026",
      title: "Coming Soon #002",
      reward: "The history of this Baby Orca will begin after the mint.",
    },
  ],

  777: [
    {
      date: "August 26, 2026",
      title: "Coming Soon",
      reward: "The history of this Baby Orca will begin after the mint.",
    },
  ],

  2041: [
    {
      date: "August 26, 2026",
      title: "Coming Soon #003",
      reward: "The history of this Baby Orca will begin after the mint.",
    },
  ],

  6500: [
    {
      date: "August 26, 2026",
      title: "Coming Soon",
      reward: "The history of this Baby Orca will begin after the mint.",
    },
  ],
};

// =====================================
// HISTORY PAGE
// =====================================

function History() {
  const navigate = useNavigate();

  const [tokenId, setTokenId] = useState("");
  const [searchId, setSearchId] = useState(null);

  const historyEntries = Object.entries(babyOrcaHistory);

  const visibleEntries =
    searchId === null
      ? historyEntries
      : historyEntries.filter(
          ([id]) => id === String(searchId)
        );

  // =====================================
  // BUSCAR NFT
  // =====================================

  const handleSearch = () => {
    const id = Number(tokenId);

    if (
      tokenId === "" ||
      !Number.isInteger(id) ||
      id < 0 ||
      id > 7776
    ) {
      setSearchId(null);
      return;
    }

    setSearchId(id);
  };

  // =====================================
  // MOSTRAR TODOS
  // =====================================

  const showAll = () => {
    setTokenId("");
    setSearchId(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>

        {/* =================================
            BACK
        ================================= */}

        <button
          onClick={() => navigate("/")}
          style={styles.backButton}
        >
          ← Back to Baby Orca
        </button>

        {/* =================================
            HEADER
        ================================= */}

        <header style={styles.header}>
          <h1 style={styles.title}>
            🐋 Baby Orca History
          </h1>

          <p style={styles.subtitle}>
            Discover the history and achievements
            of each Baby Orca.
          </p>
        </header>

        {/* =================================
            SEARCH
        ================================= */}

        <section style={styles.searchBox}>
          <h2 style={styles.searchTitle}>
            Find Your Baby Orca
          </h2>

          <div style={styles.searchRow}>

            <input
              type="number"
              min="0"
              max="7776"
              value={tokenId}
              onChange={(event) =>
                setTokenId(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Enter Token ID"
              style={styles.input}
            />

            <button
              onClick={handleSearch}
              style={styles.searchButton}
            >
              Search
            </button>

            {searchId !== null && (
              <button
                onClick={showAll}
                style={styles.showAllButton}
              >
                Show All
              </button>
            )}

          </div>
        </section>

        {/* =================================
            SECTION TITLE
        ================================= */}

        <div style={styles.sectionHeader}>

          <h2 style={styles.sectionTitle}>
            Historical Baby Orcas
          </h2>

          <span style={styles.counter}>
            {visibleEntries.length} recorded
          </span>

        </div>

        {/* =================================
            CARDS
        ================================= */}

        {visibleEntries.length > 0 ? (

          <div
             style={styles.grid}
             data-baby-orca-history-grid
              >

            {visibleEntries.map(([id, events]) => (

              <article
                key={id}
                style={styles.card}
              >

                {/* CARD HEADER */}

                <div style={styles.cardHeader}>

                  <div style={styles.orcaCircle}>
                    🐋
                  </div>

                  <div>

                    <div style={styles.cardLabel}>
                      BABY ORCA
                    </div>

                    <div style={styles.tokenNumber}>
                      #{id}
                    </div>

                  </div>

                </div>

                {/* DIVIDER */}

                <div style={styles.divider} />

                {/* HISTORY */}

                <div style={styles.historyLabel}>
                  HISTORY
                </div>

                <div style={styles.events}>

                  {events.map((event, index) => (

                    <div
                      key={index}
                      style={styles.event}
                    >

                      <div style={styles.eventIcon}>
                        🏆
                      </div>

                      <div style={styles.eventInfo}>

                        <div style={styles.eventTitle}>
                          {event.title}
                        </div>

                        <div style={styles.eventDate}>
                          {event.date}
                        </div>

                        {event.reward &&
                          event.reward !== "None" && (
                            <div style={styles.reward}>
                              Reward: {event.reward}
                            </div>
                          )}

                      </div>

                    </div>

                  ))}

                </div>

                {/* CARD FOOTER */}

                <div style={styles.cardFooter}>
                  {events.length}{" "}
                  {events.length === 1
                    ? "Historical Achievement"
                    : "Historical Achievements"}
                </div>

              </article>

            ))}

          </div>

        ) : (

          /* =================================
             NO RESULTS
          ================================= */

          <div style={styles.noResults}>

            <div style={styles.noResultsIcon}>
              🐋
            </div>

            <h3 style={styles.noResultsTitle}>
              No history found
            </h3>

            <p style={styles.noResultsText}>
              Baby Orca #{searchId} has no
              historical achievements yet.
            </p>

            <button
              onClick={showAll}
              style={styles.searchButton}
            >
              Show All Baby Orcas
            </button>

          </div>

        )}

      </div>
    </div>
  );
}

export default History;

// =====================================
// STYLES
// =====================================

const styles = {

  container: {
    minHeight: "100vh",
    width: "100%",
    background:
      "radial-gradient(circle at top, #1a1a2e 0%, #0a0a0a 70%)",
    color: "white",
    fontFamily: "sans-serif",
    padding: "40px 20px 80px",
    boxSizing: "border-box",
  },

  content: {
    width: "100%",
    maxWidth: "1500px",
    margin: "0 auto",
  },

  // =====================================
  // BACK BUTTON
  // =====================================

  backButton: {
    background: "transparent",
    border:
      "1px solid rgba(255,255,255,0.18)",
    color: "white",
    padding: "10px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: "35px",
  },

  // =====================================
  // HEADER
  // =====================================

  header: {
    textAlign: "center",
    marginBottom: "45px",
  },

  title: {
    margin: 0,
    fontSize: "clamp(36px, 5vw, 58px)",
    lineHeight: 1.1,
    background:
      "linear-gradient(135deg, #a29bfe, #6c5ce7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    marginTop: "16px",
    fontSize: "18px",
    lineHeight: 1.5,
    opacity: 0.72,
  },

  // =====================================
  // SEARCH
  // =====================================

  searchBox: {
    width: "100%",
    boxSizing: "border-box",
    background:
      "rgba(255,255,255,0.045)",
    border:
      "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "25px",
    marginBottom: "45px",
  },

  searchTitle: {
    margin: "0 0 18px",
    fontSize: "22px",
  },

  searchRow: {
    display: "flex",
    alignItems: "stretch",
    gap: "12px",
    width: "100%",
  },

  input: {
    flex: 1,
    minWidth: 0,
    background: "#10101b",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.18)",
    borderRadius: "10px",
    padding: "14px",
    fontSize: "16px",
    outline: "none",
    boxSizing: "border-box",
  },

  searchButton: {
    background:
      "linear-gradient(135deg, #6c5ce7, #a29bfe)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "14px 22px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  showAllButton: {
    background: "transparent",
    color: "white",
    border:
      "1px solid rgba(255,255,255,0.2)",
    borderRadius: "10px",
    padding: "14px 18px",
    fontSize: "15px",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  // =====================================
  // SECTION
  // =====================================

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "25px",
  },

  counter: {
    fontSize: "14px",
    opacity: 0.5,
    whiteSpace: "nowrap",
  },

  // =====================================
  // GRID
  // =====================================

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(5, minmax(0, 1fr))",
    gap: "18px",
    alignItems: "stretch",
  },

  // =====================================
  // CARD
  // =====================================

  card: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025))",
    border:
      "1px solid rgba(255,255,255,0.12)",
    borderRadius: "16px",
    padding: "20px",
    boxSizing: "border-box",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  orcaCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background:
      "rgba(108,92,231,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    flexShrink: 0,
  },

  cardLabel: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    opacity: 0.5,
  },

  tokenNumber: {
    fontSize: "23px",
    fontWeight: "bold",
    marginTop: "3px",
  },

  divider: {
    height: "1px",
    background:
      "rgba(255,255,255,0.1)",
    margin: "18px 0",
  },

  historyLabel: {
    fontSize: "10px",
    letterSpacing: "2px",
    opacity: 0.5,
    marginBottom: "14px",
  },

  // =====================================
  // EVENTS
  // =====================================

  events: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  event: {
    display: "flex",
    alignItems: "flex-start",
    gap: "9px",
  },

  eventIcon: {
    fontSize: "18px",
    lineHeight: 1.3,
    flexShrink: 0,
  },

  eventInfo: {
    minWidth: 0,
  },

  eventTitle: {
    fontSize: "13px",
    fontWeight: "bold",
    lineHeight: 1.35,
    overflowWrap: "anywhere",
  },

  eventDate: {
    fontSize: "11px",
    lineHeight: 1.4,
    opacity: 0.55,
    marginTop: "4px",
  },

  reward: {
    fontSize: "11px",
    lineHeight: 1.4,
    color: "#a29bfe",
    fontWeight: "bold",
    marginTop: "5px",
  },

  // =====================================
  // CARD FOOTER
  // =====================================

  cardFooter: {
    marginTop: "auto",
    paddingTop: "18px",
    marginTop: "20px",
    borderTop:
      "1px solid rgba(255,255,255,0.08)",
    fontSize: "10px",
    opacity: 0.45,
    lineHeight: 1.4,
  },

  // =====================================
  // NO RESULTS
  // =====================================

  noResults: {
    textAlign: "center",
    padding: "60px 20px",
    background:
      "rgba(255,255,255,0.03)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
  },

  noResultsIcon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  noResultsTitle: {
    margin: "0 0 8px",
    fontSize: "22px",
  },

  noResultsText: {
    opacity: 0.6,
    marginBottom: "22px",
    lineHeight: 1.5,
  },
};

// =====================================
// RESPONSIVE BREAKPOINTS
// =====================================

if (
  typeof document !== "undefined" &&
  !document.getElementById("baby-orca-history-responsive")
) {
  const responsiveStyle = document.createElement("style");

  responsiveStyle.id = "baby-orca-history-responsive";

  responsiveStyle.innerHTML = `

    /* LAPTOP */
    @media (max-width: 1250px) {
      [data-baby-orca-history-grid] {
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
      }
    }

    /* TABLET */
    @media (max-width: 900px) {
      [data-baby-orca-history-grid] {
        grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      }
    }

    /* MOBILE */
    @media (max-width: 650px) {
      [data-baby-orca-history-grid] {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }

      [data-baby-orca-history-grid] article {
        width: 100% !important;
        min-width: 0 !important;
      }
    }
  `;

  document.head.appendChild(responsiveStyle);
}