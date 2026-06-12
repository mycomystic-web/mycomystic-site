const wallets = `
0xCcdFfd5bb1CeFB6dBBD2f223Edc0F10e6Aa93A54
0x8F482CcC59d2ca1641e1cc0F1d30164f987248B1
0x4B9995B5E946EE842519f9d7136076E49eA30BA4
0xC48F4Dde0959147c2E119e6f86a85C438bdfA4c2
0x9A609e531B7E6CeB625d6a8507D2cf425F7BB5E4
0x08002e92f6be4eda006de207d85b5415bcd634ae
0xD815fc07c567891D57411FcDA87bcDdc13856418
0xc8318c7e411b85f219249ee4ec0c2d91cf8c8ecb
0x3b5D555E2C960FF9B405834852aCdC409410e12D
0x12C2a6146D435f2787AcA5893c236837A5239120
0x434BC011fF7c3149160d77b01Adc2D1Cc8F55000
0xd6b13a1eadaad2a78761ce134f1654fc0bfab822
0x981EC183533f4860aDC8C2dafbe01202Fd2d16c4
0x3BF4E3e67dB0784Cff8dD34DA54787F87e98b5B5
0x08002e92f6be4eda006de207d85b5415bcd634ae
0x9A609e531B7E6CeB625d6a8507D2cf425F7BB5E4
0xD815fc07c567891D57411FcDA87bcDdc13856418
0xc8318c7e411b85f219249ee4ec0c2d91cf8c8ecb
0x3b5D555E2C960FF9B405834852aCdC409410e12D
0x434BC011fF7c3149160d77b01Adc2D1Cc8F55000
0x981EC183533f4860aDC8C2dafbe01202Fd2d16c4
0xd6b13a1eadaad2a78761ce134f1654fc0bfab822
`;

const cantidadGanadores = 6;

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