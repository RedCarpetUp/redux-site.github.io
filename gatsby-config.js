module.exports = {
  siteMetadata: {
    title:`RedCarpet`,
    description: `RedCarpet - Get Instant Credit`,
    siteUrl:`https://www.reduxfinance.com`,
    defaultImage: ``,
    author: `@RedcarpetUp`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Redcarpet`,
        short_name: `Redcarpet`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/rcicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
        sourceMap: true,
        loader: 'sass-resources-loader',
        includePaths: [
          require('path').resolve(__dirname, 'node_modules')
        ],

      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              backgroundColor: 'transparent'
            },
          },
          {
						resolve: "gatsby-remark-copy-linked-files",
						options: {
							// `ignoreFileExtensions` defaults to [`png`, `jpg`, `jpeg`, `bmp`, `tiff`]
							// as we assume you'll use gatsby-remark-images to handle
							// images in markdown as it automatically creates responsive
							// versions of images.
							//
							// If you'd like to not use gatsby-remark-images and just copy your
							// original images to the public directory, set
							// `ignoreFileExtensions` to an empty array.
							ignoreFileExtensions: [],
            }
          }
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/pages`,
      },
    },

  // `gatsby-plugin-sitemap`,
  'gatsby-plugin-offline',
  ],
}
