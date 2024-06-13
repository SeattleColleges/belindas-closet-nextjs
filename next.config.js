/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    // variable call would be process.env.BELINDAS_CLOSET_PUBLIC_API_URL,
    BELINDAS_CLOSET_PUBLIC_API_URL: "https://belindascloset.com/api",
  },
  // Enable security headers
  security: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' https://fonts.googleapis.com;",
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  // Implement version control and change management practices
  version: '1.0.0',
  // Configure applications, frameworks, and platforms with secure default settings
  defaultConfig: {
    // Review and adjust default configurations to minimize the attack surface and reduce exposure to common security risks
  },
  // Develop and implement a security patch management program
  patchManagement: {
    // Monitor security advisories and vendor announcements for patches addressing known vulnerabilities
  },
  // Use automated tools and scripts to perform continuous configuration audits and vulnerability assessments
  audit: {
    // Scan for misconfigurations, insecure settings, and deviations from security best practices
  },
  // Apply the principle of least privilege to restrict access permissions and privileges to the minimum necessary
  accessControl: {
    // Enforce strict access controls and authorization mechanisms to limit access to sensitive resources
  },
};

module.exports = nextConfig;