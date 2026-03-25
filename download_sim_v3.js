const fs = require('fs');
const https = require('https');
const path = require('path');

console.log("Script started");

const targetDir = path.join(__dirname, 'frontend', 'public', 'simulations');
if (!fs.existsSync(targetDir)){
    console.log("Creating directory: " + targetDir);
    fs.mkdirSync(targetDir, { recursive: true });
}

const dest = path.join(targetDir, "projectile-motion.html");
const file = fs.createWriteStream(dest);
const url = "https://phet.colorado.edu/sims/html/projectile-motion/latest/projectile-motion_en.html";

console.log("Downloading " + url + " to " + dest);

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log("Download completed");
  });
}).on('error', function(err) {
  fs.unlink(dest, () => {}); 
  console.error("Error: " + err.message);
});