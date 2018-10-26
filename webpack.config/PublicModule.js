const path=require("path")
const ExtractTextPlugin=require("extract-text-webpack-plugin");

const CSSModuleConfig={
    loader:"css-loader",
    options:{
        module:true,
        localIdentName:"[local]-[hash:base64]"
    }    
}

module.exports={
	rules:[{
        //因历史原因之前的scss没有开启CSSModule,需要用普通方式单独加载
		test:/\.scss$/,
        use:ExtractTextPlugin.extract({
            use:[{loader:"css-loader"},{loader:"sass-loader"}],
            fallback:"style-loader",
        }),
        exclude:/\.module\.scss$/
	},{
        //新的方案采用CSSModule进行加载
        test:/\.module\.scss$/,
        use:ExtractTextPlugin.extract({
            use:[CSSModuleConfig,{loader:"sass-loader"}],
            fallback:"style-loader",
        })
    },{
		//项目中的所有的css不使用CSSModule进行加载
		test:/\.css$/,
        use:ExtractTextPlugin.extract({
            use:{loader:"css-loader"},
            fallback:"style-loader",
        }),
    },{
		test:/\.(js|jsx)$/,
		use:[{loader:"babel-loader"}],
		exclude:/(node_modules)|(JZKER\.COMPONENTS)/,
	},{
		test:/\.(otf|eot|svg|ttf|woff|woff2)$/,
        use:[{
            loader:"file-loader",
            options:{
            	name:"myFiles-[name]-[hash].[ext]",
            	outputPath:"./fonts/",
            	publicPath:"./"
            }  
        }]
	},{
		test:/\.(png|jpg|jpeg|gif)$/,
        use:[{
            loader:"file-loader",
            options:{
            	name:"myFiles-[name]-[hash].[ext]",
            	outputPath:"images/",
            	publicPath:"./",
            }  
        }]
	},{
		test:/\.json$/,
		use:["json-loader"]
	},{
		test:/\.(html|htm)$/,
		use:[{loader:"html-loader"}]
	}],
}