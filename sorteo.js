const wallets = `
0xC48F4Dde0959147c2E119e6f86a85C438bdfA4c2
0x749237C3cca8eF1D89aa41733F11b936E67A786B
0x00C0285C78e1f4fa3A62C14407829a9ba826A3a9
0x79E1d9897A4EEC9D5720016E581393aC6Fd9EbB5
0x5B0D1dCEAf2e33b63faf7770f6ed77E6B5D06696
0x0124464f9f7D128ADD6E2B1c67E1Aa2f748DE209
0x8682C18d7dC074a4C5DE33d0ada13c380AF9A5fC
`;

const cantidadGanadores = 1;

// Eliminar duplicados
const unicas = [...new Set(
  wallets
    .split("\n")
    .map(w => w.trim())
    .filter(Boolean)
)];

console.log("Participantes únicos:", unicas.length);

// Elegir ganadores
const disponibles = [...unicas];
const ganadores = [];

for (let i = 0; i < cantidadGanadores; i++) {

  if (disponibles.length === 0) break;

  const indice = Math.floor(
    Math.random() * disponibles.length
  );

  ganadores.push(disponibles[indice]);

  disponibles.splice(indice, 1);
}

console.log("\n🏆 GANADORES\n");

ganadores.forEach((g, i) => {
  console.log(`${i + 1}. ${g}`);
});