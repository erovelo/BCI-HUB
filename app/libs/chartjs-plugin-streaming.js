/*!
 * chartjs-plugin-streaming v1.8.0
 * https://nagix.github.io/chartjs-plugin-streaming
 * (c) 2019 Akihiko Kusanagi
 * Released under the MIT license
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("chart.js"),require("moment")):"function"==typeof define&&define.amd?define(["chart.js","moment"],t):(e=e||self).ChartStreaming=t(e.Chart,e.moment)}(this,function(e,t){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,t=t&&t.hasOwnProperty("default")?t.default:t;var a=e.helpers,r=function(){if("undefined"!=typeof window)return window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||function(e){return window.clearTimeout(e)}}(),i={startFrameRefreshTimer:function(e,t){if(!e.frameRequestID){var r=function(){t(),e.frameRequestID=a.requestAnimFrame.call(window,r)};e.frameRequestID=a.requestAnimFrame.call(window,r)}},stopFrameRefreshTimer:function(e){var t=e.frameRequestID;t&&(r.call(window,t),delete e.frameRequestID)}},n=e.helpers,o=n.canvas,s=e.scaleService,l=s.getScaleConstructor("time");s.getScaleConstructor=function(e){return"time"===e&&(e="realtime"),this.constructors.hasOwnProperty(e)?this.constructors[e]:void 0};var u={parse:function(e,a){return"string"==typeof e&&"string"==typeof a?e=t(e,a):e instanceof t||(e=t(e)),e.isValid()?e.valueOf():null}};function p(e,t){if(n.isNullOrUndef(t))return null;var a=e.options.time,r=function(e,t){var a=e._adapter||u,r=e.options.time,i=r.parser,n=i||r.format,o=t;return"function"==typeof i&&(o=i(o)),("number"==typeof o||o instanceof Number)&&isFinite(o)||(o="string"==typeof n?a.parse(o,n):a.parse(o)),null!==o?+o:(i||"function"!=typeof n||("number"==typeof(o=n(t))||o instanceof Number)&&isFinite(o)||(o=a.parse(o)),o)}(e,e.getRightValue(t));return null===r?r:(a.round&&(r=+e._adapter.startOf(r,a.round)),r)}function d(e,t){var a=e.options.realtime,r=e.chart.options.plugins.streaming;return n.valueOrDefault(a[t],r[t])}var m=["pointBackgroundColor","pointBorderColor","pointBorderWidth","pointRadius","pointRotation","pointStyle","pointHitRadius","pointHoverBackgroundColor","pointHoverBorderColor","pointHoverBorderWidth","pointHoverRadius","backgroundColor","borderColor","borderSkipped","borderWidth","hoverBackgroundColor","hoverBorderColor","hoverBorderWidth","hoverRadius","hitRadius","radius","rotation"];function c(e){var t=e.realtime,a=t.refreshTimerID;a&&(clearInterval(a),delete t.refreshTimerID,delete t.refreshInterval)}function f(e){var t=e.realtime,a=d(e,"refresh");t.refreshTimerID=setInterval(function(){var a=d(e,"refresh");!function(e){var t,a,r,i,o,s,l,u=e.chart,p=e.id,c=d(e,"duration"),f=d(e,"delay"),h=d(e,"ttl"),v=d(e,"pause"),y=d(e,"onRefresh"),g=e.max,x=Date.now()-(isNaN(h)?c+f:h);y&&y(u),u.data.datasets.forEach(function(d,c){if(t=u.getDatasetMeta(c),p===t.xAxisID||p===t.yAxisID){if(a=d.data,r=a.length,v){for(i=0;i<r&&e._getTimeForIndex(i,c)<g;++i);o=i+2}else o=0;for(i=o;i<r&&e._getTimeForIndex(i,c)<=x;++i);s=i-o,isNaN(h)&&(s=Math.max(s-2,0)),a.splice(o,s),m.forEach(function(e){d.hasOwnProperty(e)&&n.isArray(d[e])&&d[e].splice(o,s)}),n.each(d.datalabels,function(e){n.isArray(e)&&e.splice(o,s)}),"object"!=typeof a[0]&&(l={start:o,count:s})}}),l&&u.data.labels.splice(l.start,l.count),u.update({preservation:!0})}(e),t.refreshInterval===a||isNaN(a)||(c(e),f(e))},a),t.refreshInterval=a}var h={x:{data:["x","controlPointPreviousX","controlPointNextX"],dataset:["x"],tooltip:["x","caretX"]},y:{data:["y","controlPointPreviousY","controlPointNextY"],dataset:["y"],tooltip:["y","caretY"]}};function v(e,t,a){var r,i,n=e._start||{},o=e._view||{},s=e._model||{};for(r=0,i=t.length;r<i;++r){var l=t[r];n.hasOwnProperty(l)&&(n[l]-=a),o.hasOwnProperty(l)&&o!==n&&(o[l]-=a),s.hasOwnProperty(l)&&s!==o&&(s[l]-=a)}}var y=l.extend({initialize:function(){var e=this;l.prototype.initialize.apply(e,arguments),("time"!==e.options.type||e.chart.options.plugins.streaming)&&(e.realtime=e.realtime||{},f(e))},update:function(){var e=this,t=e.realtime;return"time"!==e.options.type||e.chart.options.plugins.streaming?(d(e,"pause")?i.stopFrameRefreshTimer(t):(i.startFrameRefreshTimer(t,function(){var t,a,r,i,o,s,l,u,p,m,c,f,y,g,x,b;p=(t=e).chart,m=t.realtime,c=d(t,"duration"),f=d(t,"delay"),y=t.id,g=p.tooltip,x=g._active,b=Date.now(),t.isHorizontal()?(a=t.width,r=h.x):(a=t.height,r=h.y),i=a*(b-m.head)/c,t.options.ticks.reverse&&(i=-i),n.each(p.data.datasets,function(e,t){if(o=p.getDatasetMeta(t),y===o.xAxisID||y===o.yAxisID){for(s=o.data||[],l=0,u=s.length;l<u;++l)v(s[l],r.data,i);o.dataset&&v(o.dataset,r.dataset,i)}}),x&&x[0]&&(o=p.getDatasetMeta(x[0]._datasetIndex),y!==o.xAxisID&&y!==o.yAxisID||v(g,r.tooltip,i)),t.max=t._table[1].time=b-f,t.min=t._table[0].time=t.max-c,m.head=b}),t.head=Date.now()),l.prototype.update.apply(e,arguments)):l.prototype.update.apply(e,arguments)},buildTicks:function(){var e=this,t=e.options;if("time"===t.type&&!e.chart.options.plugins.streaming)return l.prototype.buildTicks.apply(e,arguments);var a,r=t.time,i=t.ticks.major,o=d(e,"duration"),s=d(e,"delay"),u=d(e,"refresh"),p=t.bounds,m=t.distribution,c=t.offset,f=r.min,h=r.max,v=i.enabled,y=e.realtime.head-s,g=y-o,x=[y+u,y];return t.bounds=void 0,t.distribution="linear",t.offset=!1,r.min=-1e15,r.max=1e15,i.enabled=!0,Object.defineProperty(e,"min",{get:function(){return g},set:n.noop}),Object.defineProperty(e,"max",{get:function(){return x.shift()},set:n.noop}),a=l.prototype.buildTicks.apply(e,arguments),delete e.min,delete e.max,e.min=g,e.max=y,t.bounds=p,t.distribution=m,t.offset=c,r.min=f,r.max=h,i.enabled=v,e._table=[{time:g,pos:0},{time:y,pos:1}],a},fit:function(){var e=this,t=e.options;l.prototype.fit.apply(e,arguments),("time"!==t.type||e.chart.options.plugins.streaming)&&t.ticks.display&&t.display&&e.isHorizontal()&&(e.paddingLeft=3,e.paddingRight=3,e.handleMargins())},draw:function(e){var t=this,a=t.chart;if("time"!==t.options.type||a.options.plugins.streaming){var r=t.ctx,i=t.isHorizontal()?{left:e.left,top:0,right:e.right,bottom:a.height}:{left:0,top:e.top,right:a.width,bottom:e.bottom};o.clipArea(r,i),l.prototype.draw.apply(t,arguments),o.unclipArea(r)}else l.prototype.draw.apply(t,arguments)},destroy:function(){("time"!==this.options.type||this.chart.options.plugins.streaming)&&(i.stopFrameRefreshTimer(this.realtime),c(this))},_getTimeForIndex:function(e,t){var a,r=this._timestamps,i=r.datasets[t][e];return n.isNullOrUndef(i)&&(a=this.chart.data.datasets[t].data[e],i=n.isObject(a)?p(this,a):p(this,r.labels[e])),i}});s.registerScaleType("realtime",y,{position:"bottom",distribution:"linear",bounds:"data",adapters:{},time:{parser:!1,format:!1,unit:!1,round:!1,displayFormat:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{millisecond:"h:mm:ss.SSS a",second:"h:mm:ss a",minute:"h:mm a",hour:"hA",day:"MMM D",week:"ll",month:"MMM YYYY",quarter:"[Q]Q - YYYY",year:"YYYY"}},realtime:{},ticks:{autoSkip:!1,source:"auto",major:{enabled:!0}}});var g=e.helpers,x=g.canvas;function b(t){var a,r,i,n,o=this,s=t&&t.preservation;s&&(a=o.tooltip,r=o.lastActive,i=a._lastActive,o._bufferedRender=!0),e.prototype.update.apply(o,arguments),s&&(o._bufferedRender=!1,o._bufferedRequest=null,o.lastActive=r,a._lastActive=i,o.animating?e.animationService.animations.forEach(function(e){e.chart===o&&o.render({duration:16.66*(e.numSteps-e.currentStep)})}):o.data.datasets.forEach(function(e,t){o.getDatasetMeta(t).controller.transition(1)}),a._active&&a.update(!0),(n=o.streaming.lastMouseEvent)&&o.eventHandler(n))}e.defaults.global.plugins.streaming={duration:1e4,delay:0,frameRate:30,refresh:1e3,onRefresh:null,pause:!1,ttl:void 0};var w={id:"streaming",beforeInit:function(e){var t=e.streaming=e.streaming||{},a=t.canvas=e.canvas,r=t.mouseEventListener=function(a){var r=g.getRelativePosition(a,e);t.lastMouseEvent={type:"mousemove",chart:e,native:a,x:r.x,y:r.y}};a.addEventListener("mousedown",r),a.addEventListener("mouseup",r)},afterInit:function(t){t.update=b,t.resetZoom&&e.Zoom.updateResetZoom(t)},beforeUpdate:function(e){var t=e.options,a=t.scales;return a&&a.xAxes.concat(a.yAxes).forEach(function(e){"realtime"!==e.type&&"time"!==e.type||(t.elements.line.capBezierPoints=!1)}),!0},afterUpdate:function(e,t){var a=e.streaming,r=!0;g.each(e.scales,function(e){e instanceof y&&(r&=g.valueOrDefault(e.options.realtime.pause,t.pause))}),r?i.stopFrameRefreshTimer(a):i.startFrameRefreshTimer(a,function(){!function(e){var t=e.streaming,a=e.options.plugins.streaming.frameRate,r=1e3/(Math.max(a,0)||30),i=t.lastDrawn+r||0,n=Date.now(),o=t.lastMouseEvent;i<=n&&(e.animating||e.tooltip._start||e.draw(),o&&e.eventHandler(o),t.lastDrawn=i+r>n?i:n)}(e)})},beforeDatasetDraw:function(e,t){var a=t.meta,r=e.chartArea,i={left:0,top:0,right:e.width,bottom:e.height};return a.xAxisID&&a.controller.getScaleForId(a.xAxisID)instanceof y&&(i.left=r.left,i.right=r.right),a.yAxisID&&a.controller.getScaleForId(a.yAxisID)instanceof y&&(i.top=r.top,i.bottom=r.bottom),x.clipArea(e.ctx,i),!0},afterDatasetDraw:function(e){x.unclipArea(e.ctx)},beforeEvent:function(e,t){var a=e.streaming;return"mousemove"===t.type?a.lastMouseEvent=t:"mouseout"===t.type&&delete a.lastMouseEvent,!0},destroy:function(e){var t=e.streaming,a=t.canvas,r=t.mouseEventListener;i.stopFrameRefreshTimer(t),a.removeEventListener("mousedown",r),a.removeEventListener("mouseup",r),g.each(e.scales,function(e){e instanceof y&&e.destroy()})}},D=e.helpers,A=e.Zoom=e.Zoom||{};function F(e,t){if(e.scaleAxes&&e.rangeMax&&!D.isNullOrUndef(e.rangeMax[e.scaleAxes])){var a=e.rangeMax[e.scaleAxes];t>a&&(t=a)}return t}function I(e,t){if(e.scaleAxes&&e.rangeMin&&!D.isNullOrUndef(e.rangeMin[e.scaleAxes])){var a=e.rangeMin[e.scaleAxes];t<a&&(t=a)}return t}return A.zoomFunctions=A.zoomFunctions||{},A.panFunctions=A.panFunctions||{},A.zoomFunctions.realtime=function(e,t,a,r){var i,n,o=e.options.realtime,s=e.chart.options.plugins.streaming,l=D.valueOrDefault(o.duration,s.duration),u=D.valueOrDefault(o.delay,s.delay),p=l*(2-t);i=e.isHorizontal()?(e.right-a.x)/(e.right-e.left):(e.bottom-a.y)/(e.bottom-e.top),n=t<1?F(r,p):I(r,p),o.duration=n,o.delay=u+i*(l-n)},A.panFunctions.realtime=function(e,t,a){var r=e.options.realtime,i=e.chart.options.plugins.streaming,n=D.valueOrDefault(r.delay,i.delay)+(e.getValueForPixel(t)-e.getValueForPixel(0));r.delay=t>0?F(a,n):I(a,n)},A.updateResetZoom=function(e){var t=e.$zoom||{_originalOptions:{}},a=e.resetZoom,r=e.update,i=function(){D.each(e.scales,function(e){var a=e.options.realtime,r=t._originalOptions[e.id]||e.originalOptions;a&&(r?(a.duration=r.realtime.duration,a.delay=r.realtime.delay):(delete a.duration,delete a.delay))}),r.call(e,{duration:0})};e.resetZoom=function(){e.update=i,a(),e.update=r}},e.helpers.streaming=i,e.plugins.register(w),w});
