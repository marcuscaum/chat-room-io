/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
}

const intercept = require("intercept-stdout")

// safely ignore recoil stdout warning messages 
function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return ''
  }
  return text
}

intercept(interceptStdout)
