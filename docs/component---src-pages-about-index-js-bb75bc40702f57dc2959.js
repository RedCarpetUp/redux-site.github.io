(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"1eu9":function(e,t,a){"use strict";var r=a("PJYZ"),i=a("VbXa"),n=a("TqRt");t.__esModule=!0,t.default=void 0;var s=n(a("lSNA")),o=n(a("q1tI")),l=n(a("17x9")),d=n(a("MVkf")),c=a("doIQ"),u=a("AjcD"),f=a("nKes"),g=a("KuKR"),p=function(e){function t(t){var a;a=e.call(this,t)||this,(0,s.default)(r(a),"_isMounted",!1);var i=!0,n=!1,o=t.fadeIn,l=(0,u.inImageCache)(t);!l&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=!1,n=!0),"undefined"==typeof window&&(i=!1),t.critical&&(i=!0,n=!1);var c=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:i,imgLoaded:!1,IOSupported:n,fadeIn:o,hasNoScript:c,seenBefore:l},a.bgImage="",a.backgroundStyles=(0,d.default)(a.props.className),a.handleImageLoaded=a.handleImageLoaded.bind(r(a)),a.handleRef=a.handleRef.bind(r(a)),a.imageRef=(0,u.createPictureRef)(a.props,a.handleImageLoaded),a}i(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this._isMounted=!0,this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:(0,u.inImageCache)(this.props)}),this.props.critical){var e=this.imageRef;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this._isMounted=!1},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&(0,g.listenToIntersections)(e,(function(){var e=(0,u.inImageCache)(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0,imgLoaded:e})}))},a.handleImageLoaded=function(){this._isMounted&&((0,u.activateCacheForImage)(this.props),this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad())},a.render=function(){var e=(0,f.fixOpacity)((0,c.convertProps)(this.props)),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.fluid,l=e.fixed,d=e.backgroundColor,g=e.Tag,p=e.classId,m=void 0===p?Math.random().toString(36).replace(/[^a-z]+/g,"").substr(0,7):p,h=e.children,b="boolean"==typeof d?"lightgray":void 0!==d?d:"",y=this.backgroundStyles.hasOwnProperty("backgroundSize")?this.backgroundStyles.backgroundSize:"cover",v="background-repeat: "+(this.backgroundStyles.hasOwnProperty("backgroundRepeat")?this.backgroundStyles.backgroundRepeat:"no-repeat")+";",S=this.state.imgLoaded?"0.5s":"0.25s";if(s){var w=s,I=this.bgImage,E="";w.tracedSVG&&(E='"'+w.tracedSVG+'"'),w.base64&&!w.tracedSVG&&(E=w.base64),this.state.isVisible&&(E=this.imageRef.currentSrc||w.src);var k=!w.base64,R=E!==(I=""===I?E:this.bgImage)||!1===this.state.fadeIn?1:0;this.bgImage=I;var L={classId:m,backgroundSize:y,backgroundRepeat:v,transitionDelay:S,bgImage:I,nextImage:E,afterOpacity:R,bgColor:b,noBase64:k};return o.default.createElement(g,{className:(r||"")+" gatsby-background-image-"+m+" gatsby-image-wrapper",style:Object.assign({position:"relative",overflow:"hidden",opacity:.99},n,this.backgroundStyles),ref:this.handleRef,key:"fluid-"+JSON.stringify(w.srcSet)},o.default.createElement("style",{dangerouslySetInnerHTML:{__html:(0,f.createPseudoStyles)(L)}}),this.state.hasNoScript&&o.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:(0,u.noscriptImg)(Object.assign({alt:a,title:t},w))}}),h)}if(l){var x=l,O=Object.assign({position:"relative",overflow:"hidden",display:"inline-block",width:x.width,height:x.height,opacity:.99},n);"inherit"===n.display&&delete O.display;var C=this.bgImage,z=null;x.tracedSVG&&(z='"'+x.tracedSVG+'"'),x.base64&&!x.tracedSVG&&(z=x.base64),this.state.isVisible&&(z=this.imageRef.currentSrc||x.src);var N=!!x.base64,T=z!==(C=""===C?z:this.bgImage)||!1===this.state.fadeIn?1:0;this.bgImage=C;var V={classId:m,backgroundSize:y,backgroundRepeat:v,transitionDelay:S,bgImage:C,nextImage:z,afterOpacity:T,bgColor:b,noBase64:N};return o.default.createElement(g,{className:(r||"")+" gatsby-background-image-"+m+" gatsby-image-wrapper",style:Object.assign({},O,this.backgroundStyles),ref:this.handleRef,key:"fixed-"+JSON.stringify(x.srcSet)},o.default.createElement("style",{dangerouslySetInnerHTML:{__html:(0,f.createPseudoStyles)(V)}}),this.state.hasNoScript&&o.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:(0,u.noscriptImg)(Object.assign({alt:a,title:t,width:x.width,height:x.height},x))}}),h)}return null},t}(o.default.Component);p.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var m=l.default.shape({width:l.default.number.isRequired,height:l.default.number.isRequired,src:l.default.string.isRequired,srcSet:l.default.string.isRequired,base64:l.default.string,tracedSVG:l.default.string,srcWebp:l.default.string,srcSetWebp:l.default.string}),h=l.default.shape({aspectRatio:l.default.number.isRequired,src:l.default.string.isRequired,srcSet:l.default.string.isRequired,sizes:l.default.string.isRequired,base64:l.default.string,tracedSVG:l.default.string,srcWebp:l.default.string,srcSetWebp:l.default.string});p.propTypes={resolutions:m,sizes:h,fixed:m,fluid:h,fadeIn:l.default.bool,title:l.default.string,alt:l.default.string,className:l.default.oneOfType([l.default.string,l.default.object]),critical:l.default.bool,style:l.default.object,imgStyle:l.default.object,placeholderStyle:l.default.object,placeholderClassName:l.default.string,backgroundColor:l.default.oneOfType([l.default.string,l.default.bool]),onLoad:l.default.func,onError:l.default.func,onStartLoad:l.default.func,Tag:l.default.string,classId:l.default.string};var b=p;t.default=b},"9eSz":function(e,t,a){"use strict";var r=a("TqRt");t.__esModule=!0,t.default=void 0;var i,n=r(a("PJYZ")),s=r(a("VbXa")),o=r(a("8OQS")),l=r(a("pVnL")),d=r(a("q1tI")),c=r(a("17x9")),u=function(e){var t=(0,l.default)({},e),a=t.resolutions,r=t.sizes,i=t.critical;return a&&(t.fixed=a,delete t.resolutions),r&&(t.fluid=r,delete t.sizes),i&&(t.loading="eager"),t.fluid&&(t.fluid=I([].concat(t.fluid))),t.fixed&&(t.fixed=I([].concat(t.fixed))),t},f=function(e){var t=e.media;return!!t&&(y&&!!window.matchMedia(t).matches)},g=function(e){var t=e.fluid,a=e.fixed,r=p(t||a||[]);return r&&r.src},p=function(e){if(y&&function(e){return!!e&&Array.isArray(e)&&e.some((function(e){return void 0!==e.media}))}(e)){var t=e.findIndex(f);if(-1!==t)return e[t];var a=e.findIndex((function(e){return void 0===e.media}));if(-1!==a)return e[a]}return e[0]},m=Object.create({}),h=function(e){var t=u(e),a=g(t);return m[a]||!1},b="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype,y="undefined"!=typeof window,v=y&&window.IntersectionObserver,S=new WeakMap;function w(e){return e.map((function(e){var t=e.src,a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return d.default.createElement(d.default.Fragment,{key:t},r&&d.default.createElement("source",{type:"image/webp",media:i,srcSet:r,sizes:n}),a&&d.default.createElement("source",{media:i,srcSet:a,sizes:n}))}))}function I(e){var t=[],a=[];return e.forEach((function(e){return(e.media?t:a).push(e)})),[].concat(t,a)}function E(e){return e.map((function(e){var t=e.src,a=e.media,r=e.tracedSVG;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function k(e){return e.map((function(e){var t=e.src,a=e.media,r=e.base64;return d.default.createElement("source",{key:t,media:a,srcSet:r})}))}function R(e,t){var a=e.srcSet,r=e.srcSetWebp,i=e.media,n=e.sizes;return"<source "+(t?"type='image/webp' ":"")+(i?'media="'+i+'" ':"")+'srcset="'+(t?r:a)+'" '+(n?'sizes="'+n+'" ':"")+"/>"}var L=function(e,t){var a=(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver((function(e){e.forEach((function(e){if(S.has(e.target)){var t=S.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(e.target),S.delete(e.target),t())}}))}),{rootMargin:"200px"})),i);return a&&(a.observe(e),S.set(e,t)),function(){a.unobserve(e),S.delete(e)}},x=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",n=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",o=e.height?'height="'+e.height+'" ':"",l=e.crossOrigin?'crossorigin="'+e.crossOrigin+'" ':"",d=e.loading?'loading="'+e.loading+'" ':"",c=e.draggable?'draggable="'+e.draggable+'" ':"";return"<picture>"+e.imageVariants.map((function(e){return(e.srcSetWebp?R(e,!0):"")+R(e)})).join("")+"<img "+d+s+o+a+r+t+n+i+l+c+'style="position:absolute;top:0;left:0;opacity:1;width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},O=d.default.forwardRef((function(e,t){var a=e.src,r=e.imageVariants,i=e.generateSources,n=e.spreadProps,s=e.ariaHidden,o=d.default.createElement(C,(0,l.default)({ref:t,src:a},n,{ariaHidden:s}));return r.length>1?d.default.createElement("picture",null,i(r),o):o})),C=d.default.forwardRef((function(e,t){var a=e.sizes,r=e.srcSet,i=e.src,n=e.style,s=e.onLoad,c=e.onError,u=e.loading,f=e.draggable,g=e.ariaHidden,p=(0,o.default)(e,["sizes","srcSet","src","style","onLoad","onError","loading","draggable","ariaHidden"]);return d.default.createElement("img",(0,l.default)({"aria-hidden":g,sizes:a,srcSet:r,src:i},p,{onLoad:s,onError:c,ref:t,loading:u,draggable:f,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},n)}))}));C.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var z=function(e){function t(t){var a;(a=e.call(this,t)||this).seenBefore=y&&h(t),a.isCritical="eager"===t.loading||t.critical,a.addNoScript=!(a.isCritical&&!t.fadeIn),a.useIOSupport=!b&&v&&!a.isCritical&&!a.seenBefore;var r=a.isCritical||y&&(b||!a.useIOSupport);return a.state={isVisible:r,imgLoaded:!1,imgCached:!1,fadeIn:!a.seenBefore&&t.fadeIn,isHydrated:!1},a.imageRef=d.default.createRef(),a.placeholderRef=t.placeholderRef||d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,n.default)(a)),a.handleRef=a.handleRef.bind((0,n.default)(a)),a}(0,s.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.setState({isHydrated:y}),this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:h(this.props)}),this.isCritical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.componentWillUnmount=function(){this.cleanUpListeners&&this.cleanUpListeners()},a.handleRef=function(e){var t=this;this.useIOSupport&&e&&(this.cleanUpListeners=L(e,(function(){var e=h(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0},(function(){t.setState({imgLoaded:e,imgCached:!(!t.imageRef.current||!t.imageRef.current.currentSrc)})}))})))},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=u(e),(a=g(t))&&(m[a]=!0),this.setState({imgLoaded:!0}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,r=e.className,i=e.style,n=void 0===i?{}:i,s=e.imgStyle,o=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,g=e.placeholderClassName,m=e.fluid,h=e.fixed,b=e.backgroundColor,y=e.durationFadeIn,v=e.Tag,S=e.itemProp,I=e.loading,R=e.draggable,L=m||h;if(!L)return null;var z=!1===this.state.fadeIn||this.state.imgLoaded,N=!0===this.state.fadeIn&&!this.state.imgCached,T=(0,l.default)({opacity:z?1:0,transition:N?"opacity "+y+"ms":"none"},o),V="boolean"==typeof b?"lightgray":b,P={transitionDelay:y+"ms"},_=(0,l.default)({opacity:this.state.imgLoaded?0:1},N&&P,o,f),j={title:t,alt:this.state.isVisible?"":a,style:_,className:g,itemProp:S},M=this.state.isHydrated?p(L):L[0];if(m)return d.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden",maxWidth:M.maxWidth?M.maxWidth+"px":null,maxHeight:M.maxHeight?M.maxHeight+"px":null},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(M.srcSet)},d.default.createElement(v,{"aria-hidden":!0,style:{width:"100%",paddingBottom:100/M.aspectRatio+"%"}}),V&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:V,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,right:0,left:0},N&&P)}),M.base64&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:j,imageVariants:L,generateSources:k}),M.tracedSVG&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:j,imageVariants:L,generateSources:E}),this.state.isVisible&&d.default.createElement("picture",null,w(L),d.default.createElement(C,{alt:a,title:t,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:I,draggable:R})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:x((0,l.default)({alt:a,title:t,loading:I},M,{imageVariants:L}))}}));if(h){var q=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:M.width,height:M.height},n);return"inherit"===n.display&&delete q.display,d.default.createElement(v,{className:(r||"")+" gatsby-image-wrapper",style:q,ref:this.handleRef,key:"fixed-"+JSON.stringify(M.srcSet)},V&&d.default.createElement(v,{"aria-hidden":!0,title:t,style:(0,l.default)({backgroundColor:V,width:M.width,opacity:this.state.imgLoaded?0:1,height:M.height},N&&P)}),M.base64&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:M.base64,spreadProps:j,imageVariants:L,generateSources:k}),M.tracedSVG&&d.default.createElement(O,{ariaHidden:!0,ref:this.placeholderRef,src:M.tracedSVG,spreadProps:j,imageVariants:L,generateSources:E}),this.state.isVisible&&d.default.createElement("picture",null,w(L),d.default.createElement(C,{alt:a,title:t,width:M.width,height:M.height,sizes:M.sizes,src:M.src,crossOrigin:this.props.crossOrigin,srcSet:M.srcSet,style:T,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:S,loading:I,draggable:R})),this.addNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:x((0,l.default)({alt:a,title:t,loading:I},M,{imageVariants:L}))}}))}return null},t}(d.default.Component);z.defaultProps={fadeIn:!0,durationFadeIn:500,alt:"",Tag:"div",loading:"lazy"};var N=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string}),T=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string,media:c.default.string,maxWidth:c.default.number,maxHeight:c.default.number});function V(e){return function(t,a,r){var i;if(!t.fixed&&!t.fluid)throw new Error("The prop `fluid` or `fixed` is marked as required in `"+r+"`, but their values are both `undefined`.");c.default.checkPropTypes(((i={})[a]=e,i),t,"prop",r)}}z.propTypes={resolutions:N,sizes:T,fixed:V(c.default.oneOfType([N,c.default.arrayOf(N)])),fluid:V(c.default.oneOfType([T,c.default.arrayOf(T)])),fadeIn:c.default.bool,durationFadeIn:c.default.number,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,crossOrigin:c.default.oneOfType([c.default.string,c.default.bool]),style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,onStartLoad:c.default.func,Tag:c.default.string,itemProp:c.default.string,loading:c.default.oneOf(["auto","lazy","eager"]),draggable:c.default.bool};var P=z;t.default=P},AjcD:function(e,t,a){"use strict";t.__esModule=!0,t.noscriptImg=t.createPictureRef=t.activateCacheForImage=t.inImageCache=void 0;var r=a("doIQ"),i={};t.inImageCache=function(e){var t=(0,r.convertProps)(e),a=t.fluid?t.fluid.src:t.fixed.src;return i[a]||!1};t.activateCacheForImage=function(e){var t=(0,r.convertProps)(e),a=t.fluid?t.fluid.src:t.fixed.src;i[a]=!0};t.createPictureRef=function(e,t){void 0===t&&(t=function(){});var a=(0,r.convertProps)(e);if("undefined"!=typeof window&&(void 0!==a.fluid||void 0!==a.fixed)){var i=e.fluid?e.fluid:e.fixed,n=new Image,s=document.createElement("picture");if(i.srcSetWebp){var o=document.createElement("source");o.type="image/webp",o.srcset=i.srcSetWebp,o.sizes=i.sizes,s.appendChild(o)}return s.appendChild(n),n.onload=function(){return t()},n.complete||"function"!=typeof a.onLoad||n.addEventListener("load",a.onLoad),"function"==typeof a.onError&&n.addEventListener("error",a.onError),n.srcset=i.srcSet?i.srcSet:"",n.src=i.src?i.src:"",n}return null};t.noscriptImg=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",r=e.srcSetWebp?"<source type='image/webp' srcset=\""+e.srcSetWebp+'" '+a+"/>":"",i=e.srcSet?'srcset="'+e.srcSet+'" ':"",n=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+r+"<img "+o+l+a+i+t+s+n+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'}},KuKR:function(e,t,a){"use strict";var r;t.__esModule=!0,t.listenToIntersections=t.getIO=t.callbackIO=void 0;var i=[],n=function(e){e.forEach((function(e){i.forEach((function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())}))}))};t.callbackIO=n;var s=function(){return void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(n,{rootMargin:"200px"})),r};t.getIO=s;t.listenToIntersections=function(e,t){s().observe(e),i.push([e,t])}},MVkf:function(e,t,a){"use strict";a("E9XD"),t.__esModule=!0,t.default=t.getBackgroundStylesForSingleClass=t.getStyleRules=t.toCamelCase=t.rulesForCssText=t.getStyle=void 0;var r=function(e){for(var t="undefined"!=typeof window?window.document.styleSheets:[],a=0;a<t.length;a++){var r=void 0;try{r=void 0!==t[a].rules?t[a].rules:void 0!==t[a].cssRules?t[a].cssRules:""}catch(s){}if(r)for(var i=0;i<r.length;i++)if(r[i].selectorText===e){var n=r[i].cssText?r[i].cssText:r[i].style.cssText;return-1===n.indexOf(r[i].selectorText)?r[i].selectorText+"{"+n+"}":n}}};t.getStyle=r;var i=function(e){if("undefined"!=typeof document&&e){var t=document.implementation.createHTMLDocument(""),a=document.createElement("style");return a.textContent=e,t.body.appendChild(a),a.sheet.cssRules}return{}};t.rulesForCssText=i;var n=function(e){return"string"==typeof e&&e.toLowerCase().replace(/(?:^\w|-|[A-Z]|\b\w)/g,(function(e,t){return 0===t?e.toLowerCase():e.toUpperCase()})).replace(/\s|\W+/g,"")};t.toCamelCase=n;var s=function(e){var t={};if(e.length>0&&void 0!==e[0].style)switch(e[0].style.constructor.name){case"CSS2Properties":Object.values(e[0].style).forEach((function(a){t[n(a)]=e[0].style[a]}));break;case"CSSStyleDeclaration":t=e[0].style;break;default:console.error("Unknown style object prototype")}return t};t.getStyleRules=s;var o=function(e){var t=r("."+e),a=i(t);return a.length>0&&void 0!==a[0].style?Object.keys(s(a)).filter((function(e){return 0===e.indexOf("background")&&""!==a[0].style[e]})).reduce((function(e,t){return e[t]=a[0].style[t],e}),{}):{}};t.getBackgroundStylesForSingleClass=o;var l=function(e){if("undefined"!=typeof window&&null!==e&&(e instanceof Object||e instanceof String||"string"==typeof e)&&!(e instanceof Array)){if(e.includes(" ")){var t=e.split(" "),a=[];return t.forEach((function(e){return a.push(o(e))})),Object.assign.apply(Object,a)}return o(e)}return{}};t.default=l},O0dG:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return l}));var r=a("q1tI"),i=a.n(r),n=a("Bl7J"),s=a("vrFN"),o=a("RMg3");a("1eu9"),a("9eSz");function l(e){var t=e.data,a=t.allAboutYaml.edges[0].node.Meta,r=t.allAboutYaml.edges[0].node.Header,l=(t.allAboutYaml.edges[0].node.ScrollImages,t.allAboutYaml.edges[0].node.Testimonials,t.allAboutYaml.edges[0].node.Partners,t.allAboutYaml.edges[0].node.Team,t.allAboutYaml.edges[0].node.Join,t.allAboutYaml.edges[0].node.founder);t.allAboutYaml.edges[0].node.Backers,t.allAboutYaml.edges[0].node.Advisors;return i.a.createElement(n.a,null,i.a.createElement(s.a,{title:a.title,description:a.description}),i.a.createElement(o.a,null),i.a.createElement("header",{className:"header",style:{marginTop:"-4rem"}},i.a.createElement("section",{class:"section shadow-8",style:{margin:"2%"}},i.a.createElement("div",{class:"container"},i.a.createElement("div",{class:"row"},i.a.createElement("div",{class:"col-md-6 mr-md-auto"},i.a.createElement("h4",null,r[0].title),i.a.createElement("p",{className:""},r[0].description)),i.a.createElement("div",{class:"col-md-6"},i.a.createElement("h4",null,l[0].title),i.a.createElement("p",{className:""},l[1].quote),l.slice(2).map((function(e,t){return i.a.createElement("p",{className:"",key:t},e.quote)})))))),i.a.createElement("section",{class:"section shadow-8",style:{margin:"2%"}},i.a.createElement("div",{class:"container"},i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("h1",{className:"sourcing-partner"},"Our Sourcing Partners")),i.a.createElement("div",{style:{marginTop:"50px",textAlign:"center"}},i.a.createElement("img",{src:"/assets/img/logo/redcarpet_logo.png",alt:"RedCarpet Logo",width:150}),i.a.createElement("h4",null,"RedCarpet Pvt Ltd"),i.a.createElement("a",{href:"https://www.redcarpetup.com/contact/",target:"_blank"},i.a.createElement("button",{className:"btn btn-success"},"Contact RedCarpet"))))))),i.a.createElement("main",{className:"main-content"}))}},RMg3:function(e,t,a){"use strict";var r=a("q1tI"),i=a.n(r),n=(a("lU2A"),a("uzWQ"),a("ewPE")),s=a.n(n);t.a=function(){return i.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark navbar-stick-dark","data-navbar":"sticky"},i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"navbar-left mr-4"},i.a.createElement("button",{className:"navbar-toggler",type:"button"},"☰"),i.a.createElement("a",{className:"navbar-brand",href:"/"},i.a.createElement("img",{className:"logo-dark",src:s.a,alt:"logo"}),i.a.createElement("img",{className:"logo-light",src:s.a,alt:"logo"}))),i.a.createElement("section",{className:"navbar-mobile"},i.a.createElement("nav",{className:"nav nav-navbar nav-text-normal ml-auto",style:{marginRight:"50px"}}))))}},doIQ:function(e,t,a){"use strict";t.__esModule=!0,t.convertProps=void 0;t.convertProps=function(e){var t=Object.assign({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t}},lSNA:function(e,t){e.exports=function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e},e.exports.__esModule=!0,e.exports.default=e.exports},lU2A:function(e,t,a){e.exports=a.p+"static/logo-dark-988903264a917067f7795e6d61e5920f.png"},nKes:function(e,t,a){"use strict";t.__esModule=!0,t.createPseudoStyles=t.fixOpacity=void 0;t.fixOpacity=function(e){var t=Object.assign({},e);try{t.style&&t.style.opacity&&(isNaN(t.style.opacity)||t.style.opacity>.99)&&(t.style.opacity=.99)}catch(a){}return t};t.createPseudoStyles=function(e){var t=e.classId,a=e.backgroundSize,r=e.backgroundRepeat,i=e.transitionDelay,n=e.bgImage,s=e.nextImage,o=e.afterOpacity,l=e.bgColor;e.noBase64;return"\n          .gatsby-background-image-"+t+":before,\n          .gatsby-background-image-"+t+":after {\n            content: '';\n            display: block;\n            position: absolute;\n            width: 100%;\n            height: 100%;\n            top: 0;\n            left: 0;\n            -webkit-background-size: "+a+";\n            -moz-background-size: "+a+";\n            -o-background-size: "+a+";\n            background-size: "+a+";\n            -webkit-transition-delay: "+i+";\n            -moz-transition-delay: "+i+";\n            -o-transition-delay: "+i+";\n            transition-delay: "+i+";\n            -webkit-transition: opacity 0.5s;\n            -moz-transition: opacity 0.5s;\n            -o-transition: opacity 0.5s;\n            transition: opacity 0.5s;\n          }\n          .gatsby-background-image-"+t+":before {\n            z-index: -100;\n            "+(s&&s!==n?"background-image: url("+s+");":"")+"\n            "+r+"\n            "+(l&&"background-color: "+l+";")+"\n            opacity: "+o+"; \n          }\n          .gatsby-background-image-"+t+":after {\n            z-index: -101;\n            "+(l&&"background-color: "+l+";")+"\n            "+(n&&"background-image: url("+n+");")+"\n            "+r+"\n          }\n        "}}}]);
//# sourceMappingURL=component---src-pages-about-index-js-bb75bc40702f57dc2959.js.map