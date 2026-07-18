import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();

// Configurations
const USERNAME = process.env.PRIVATE_SITE_USERNAME || 'Khanza';
const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-romantic-secret-for-khanza-19-juli-2026';

if (!process.env.SESSION_SECRET) {
  console.warn("WARNING: SESSION_SECRET is not set. Using temporary fallback secret.");
}

// In-memory basic brute force protection (rate-limiter)
const loginAttempts = new Map<string, { count: number; lockUntil: number }>();

app.use(express.json());
app.use(cookieParser(SESSION_SECRET));

// API: Check if authenticated
app.get('/api/check-auth', (req, res) => {
  const sessionCookie = req.signedCookies.session;
  
  if (sessionCookie === 'Vicko' || sessionCookie === USERNAME) {
    return res.json({ authenticated: true, username: sessionCookie });
  }
  
  return res.json({ authenticated: false });
});

// API: Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const ip = req.ip || 'unknown';
  
  console.log(`[LOGIN ATTEMPT] Username entered: "${username}", IP: ${ip}`);
  console.log(`[SERVER CONFIG] Expected USERNAME (env PRIVATE_SITE_USERNAME): "${USERNAME}"`);
  console.log(`[SERVER CONFIG] Has password hash: ${!!process.env.PRIVATE_SITE_PASSWORD_HASH}, Has raw password: ${!!process.env.PRIVATE_SITE_PASSWORD}`);

  // Basic brute force rate limiting
  const attempt = loginAttempts.get(ip) || { count: 0, lockUntil: 0 };
  const now = Date.now();
  
  if (attempt.lockUntil > now) {
    const waitSeconds = Math.ceil((attempt.lockUntil - now) / 1000);
    console.log(`[LOGIN BLOCKED] Rate limited. Lock until: ${attempt.lockUntil}`);
    return res.status(429).json({
      success: false,
      message: `Terlalu banyak mencoba. Silakan tunggu ${waitSeconds} detik ya Sayang.`
    });
  }

  const normalizedInputUser = (username || '').trim().toLowerCase();

  // Check if it's Vicko (always allowed)
  if (normalizedInputUser === 'vicko') {
    if (password === 'Vicko19') {
      console.log(`[LOGIN SUCCESS] User: Vicko (hardcoded admin)`);
      // Reset rate-limiter on success
      loginAttempts.delete(ip);
      
      // Set secure long-lived cookie (1 year)
      res.cookie('session', 'Vicko', {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'strict',
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
        path: '/'
      });
      
      return res.json({
        success: true,
        username: 'Vicko'
      });
    } else {
      console.log(`[LOGIN FAILED] User: Vicko - Incorrect password`);
      attempt.count += 1;
      if (attempt.count >= 5) {
        attempt.lockUntil = now + 60000; // 1 minute lockout
      }
      loginAttempts.set(ip, attempt);
      return res.status(401).json({
        success: false,
        message: 'Password salah untuk akun Vicko.'
      });
    }
  }

  // Check username (case-insensitive for convenience, but default is Khanza)
  if (normalizedInputUser !== USERNAME.toLowerCase()) {
    console.log(`[LOGIN FAILED] Username mismatch. Entered: "${normalizedInputUser}", Expected: "${USERNAME.toLowerCase()}"`);
    attempt.count += 1;
    if (attempt.count >= 5) {
      attempt.lockUntil = now + 60000; // 1 minute lockout
    }
    loginAttempts.set(ip, attempt);
    return res.status(401).json({
      success: false,
      message: 'Sepertinya kunci rahasianya belum cocok. Coba diingat lagi, Dedek.'
    });
  }

  // Password verification
  let isPasswordCorrect = false;

  const envHash = process.env.PRIVATE_SITE_PASSWORD_HASH;
  const fallbackPassword = process.env.PRIVATE_SITE_PASSWORD || 'khanza18'; // Fallback easy password for easy sandbox preview

  if (envHash) {
    // Expected hash format: "pbkdf2:salt:iterations:hash"
    try {
      const [algo, salt, iterationsStr, storedHash] = envHash.split(':');
      if (algo === 'pbkdf2' && salt && iterationsStr && storedHash) {
        const iterations = parseInt(iterationsStr, 10);
        const derived = crypto.pbkdf2Sync(
          password,
          salt,
          iterations,
          storedHash.length / 2,
          'sha256'
        ).toString('hex');
        
        isPasswordCorrect = crypto.timingSafeEqual(
          Buffer.from(derived, 'hex'),
          Buffer.from(storedHash, 'hex')
        );
      } else {
        // Fallback to simple comparison if hash format is invalid
        isPasswordCorrect = (password === envHash);
      }
    } catch (e) {
      console.error("Error verifying PBKDF2 password:", e);
      // Fallback simple matching
      isPasswordCorrect = (password === fallbackPassword);
    }
  } else {
    // If no hash is configured in environment, compare with the direct PASSWORD or default 'khanza18'
    const directPassword = process.env.PRIVATE_SITE_PASSWORD || fallbackPassword;
    isPasswordCorrect = (password === directPassword);
  }

  if (isPasswordCorrect) {
    console.log(`[LOGIN SUCCESS] User: "${USERNAME}"`);
    // Reset rate-limiter on success
    loginAttempts.delete(ip);
    
    // Set secure long-lived cookie (1 year)
    res.cookie('session', USERNAME, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: 'strict',
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
      path: '/'
    });
    
    return res.json({
      success: true,
      username: USERNAME
    });
  } else {
    console.log(`[LOGIN FAILED] User: "${USERNAME}" - Incorrect password/key`);
    attempt.count += 1;
    if (attempt.count >= 5) {
      attempt.lockUntil = now + 60000; // 1 minute lockout
    }
    loginAttempts.set(ip, attempt);
    return res.status(401).json({
      success: false,
      message: 'Sepertinya kunci rahasianya belum cocok. Coba diingat lagi, Dedek.'
    });
  }
});

// API: Logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('session', { path: '/' });
  return res.json({ success: true });
});

// Serve assets folder if needed
const assetsPath = path.join(process.cwd(), 'public', 'assets');
app.use('/assets', express.static(assetsPath));

export default app;
