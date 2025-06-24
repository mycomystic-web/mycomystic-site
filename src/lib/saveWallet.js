import fs from 'fs';
import path from 'path';

export function saveWalletIfNew(address) {
  const filePath = path.resolve('public/raffle-data/mystic-participants.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  if (!data.includes(address)) {
    data.push(address);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}
