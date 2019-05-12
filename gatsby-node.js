var webpack = require('webpack')
exports.onCreateWebpackConfig = ({
    stage,
    rules,
    loaders,
    plugins,
    actions,
    }) => {
    actions.setWebpackConfig({
        module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                loader: 'file-loader'
            },
        ],
        },
        plugins: [
            new webpack.ProvidePlugin({   
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery'
            })
        ],
    })
}

const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`);

exports.createPages = ({ actions, graphql }) => {
    const { createPage,createRedirect } = actions;
    

  
}


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}
