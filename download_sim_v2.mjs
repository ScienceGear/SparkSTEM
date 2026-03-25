import fs from 'fs';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Correct target path: stem-lab/public/simulations/projectile-motion.html
const targetDir = path.join(__dirname, 'stem-lab', 'public', 'simulations');

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir, { recursive: true });
}

const dest = path.join(targetDir, "projectile-motion.html");
const url = "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html";

console.log(`Downloading to ${dest}`);

const file = fs.createWriteStream(dest);

https.get(url, function(response) {
  if (response.statusCode !== 200) {
      console.error(`Request failed with status code ${response.statusCode}`);
      return;
  }
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download completed successfully.");
  });
}).on('error', function(err) {
  fs.unlink(dest, () => {}); 
  console.error("Error downloading file:", err.message);
});