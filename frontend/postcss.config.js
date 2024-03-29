// Purge css classes that are not being used
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './src/**/*.js'
    // etc.
  ],

  // This is the function used to extract class names from your templates
  defaultExtractor: (content) => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    return broadMatches.concat(innerMatches);
  }
});

// Minification of CSS
const cssnano = require('cssnano')({
  preset: 'default'
});

module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
  // Here we include both purging and minification
  ...(process.env.NODE_ENV === 'production' ? [purgecss, cssnano] : [])
};
