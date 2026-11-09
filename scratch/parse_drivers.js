const fs = require('fs');
const { execSync } = require('child_process');

const raw = execSync('gsheets readonly read 16XXrVrCvZZ7THAc36Uffm52hR5pXJ2ww1wmqwaRZqAE Choferes!A1:Q200', { encoding: 'utf8' });
const lines = raw.split(/\r?\n/).filter(Boolean);
const map = {
  '99999999': { name: 'pruebashalom', categoria: 'A3C', grupo: 'CAPACITACION-SHALOM', placa: 'CCY-904', celular: '999888777' },
  '41422665': { name: 'EDWIN MELCHOR GALARZA AMARILLO', categoria: 'A2B', grupo: 'SUCURSALES-HUACHIPA', placa: 'BFS-863', celular: '987654321' }
};

for (const line of lines) {
  const cols = line.split('\t');
  if (cols.length >= 15) {
    const dni = cols[8].trim();
    if (dni.length >= 8 && !isNaN(Number(dni))) {
      const first = cols[11].trim();
      const mid = cols[12].trim();
      const pat = cols[13].trim();
      const mat = cols[14].trim();
      const name = [first, mid, pat, mat].filter(Boolean).join(' ').replace(/\s+/g, ' ').toUpperCase();
      const phone = cols[15].trim();
      const branch = cols[16] ? cols[16].trim() : 'HUACHIPA CO';
      map[dni] = { name, categoria: 'A3C', grupo: branch, celular: phone };
    }
  }
}

console.log('Total entries:', Object.keys(map).length);
console.log('Sample 42701498:', map['42701498']);
console.log('Sample 43513263:', map['43513263']);

const jsContent = 'const KNOWN_DRIVERS = ' + JSON.stringify(map, null, 2) + ';\n';
fs.writeFileSync('scratch/drivers.js', jsContent, 'utf8');
console.log('Written to scratch/drivers.js');
