module.exports = {
  siteMetadata: {
    title: 'UTRUST Mini store',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: 'markdown-pages',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
  ],
  pathPrefix: '/mini-store',
}
