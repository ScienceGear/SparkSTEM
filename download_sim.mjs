import fs from 'fs';
import https from 'https';
import path from 'path';

const url = "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html";
const dest = path.join(process.cwd(), "frontend/public/simulations/projectile-motion.html");

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download completed");
  });
}).on('error', function(err) {
  fs.unlink(dest); 
  console.error("Error downloading file:", err.message);
});