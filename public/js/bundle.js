!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){angular.module("ChatApp",["ngAnimate","ngMaterial","toastr"]),n(1),n(2),n(3),n(4),n(5),n(6)},function(e,t){angular.module("ChatApp").controller("ChatController",["$scope","$http","$mdDialog","RequestService","ConversationService","userIdsToStringFilter","toastr",function(e,t,n,r,o,s,a){function i(){r.getUserInfo().then(function(t){e.loggedIn=!0,e.currentUserData=t.data,r.getRegisteredUsers().then(function(t){T(e.registeredUsers,t.data)})},function(t){e.errorText="Failed to get user data : "+t.status+" - "+t.statusText})}function u(){r.getGithubLoginPath().then(function(e){window.location.href=e.data.uri})}function c(t){r.getConversations().then(function(n){e.unseenMessages=o.updateCurrentConversations(e.currentConversations,n.data),t||e.unseenMessages.forEach(function(t){t.userid!==e.currentUserData.id&&C(t)})},function(t){e.errorText="Failed to fetch conversations : "+t.status+" - "+t.statusText})}function f(t,n){""!==t&&r.postGuestLogin(t,n).then(function(t){e.loadUserInfo(),e.errorText=""},function(t){e.errorText="Failed to login as guest : "+t.status+" - "+t.statusText})}function d(t,n){t.push(e.currentUserData.id),r.postStartConversation(t,n).then(function(t){e.refreshConversations()},function(t){e.errorText="Failed to start conversation : "+t.status+" - "+t.statusText})}function l(t,n){r.postAddUserToConversation(t,n).then(function(t){e.refreshConversations()},function(t){e.errorText="Failed to add user to conversation : "+t.status+" - "+t.statusText})}function p(t){r.postLeaveConversation(t).then(function(t){e.refreshConversations()},function(t){e.errorText="Failed to leave conversation : "+t.status+" - "+t.statusText})}function v(t,n){r.putUpdateConversationDetails(t,n).then(function(t){e.refreshConversations()},function(t){e.errorText="Failed to rename conversation : "+t.status+" - "+t.statusText})}function g(t){r.postSendMessage(t,e.newMessageValues[t]).then(function(n){e.newMessageValues[t]="",e.refreshConversations()},function(t){e.errorText="Failed to send message : "+t.status+" - "+t.statusText})}function h(t){return _.find(e.registeredUsers,function(e){return e.id===t})}function m(t){return _.find(e.currentConversations,function(e){return e.id===t})}function C(e){var t=h(e.userid).name;a.info(e.text,"Message from "+t)}function x(e,t,n){o.showRenameConversationDialog(e,n).then(function(e){v(t,e)})}function U(t){var n=m(t);if(""!==n.name)return n.name;var r=n.userids.filter(function(t){return e.currentUserData.id!==t});return s(r,e.registeredUsers,!0)}function T(e,t){for(var n=0;n<t.length;n++)e[n]&&e[n].id===e[n].id||e.splice(n,0,t[n])}e.guestLogin=f,e.githubLogin=u,e.loadUserInfo=i,e.startConversation=d,e.addUserToConversation=l,e.leaveConversation=p,e.refreshConversations=c,e.sendMessage=g,e.getUserFromId=h,e.setClearedForConversationMessages=o.setClearedForConversationMessages,e.renameConversation=x,e.getConversationLabel=U,e.newMessageValues={},e.currentUserData={},e.registeredUsers=[],e.nameInputBox="",e.avatarUrlInputBox="http://s.mtgprice.com/images/unknown.png",e.currentConversations=[],e.errorText="",e.unseenMessages=[],e.loggedIn=!1,angular.element(document).ready(function(){e.loadUserInfo(),e.refreshConversations(!0),setInterval(function(){i(),c()},1e3)})}])},function(e,t){angular.module("ChatApp").service("RequestService",["$http",function(e){function t(){return e.get("api/user")}function n(){return e.get("api/users")}function r(){return e.get("/api/oauth/uri")}function o(){return e.get("api/conversations")}function s(t,n){return e({method:"POST",url:"/api/newGuest",data:{name:t,avatarUrl:n}})}function a(t,n){return e({method:"POST",url:"/api/newConversation",data:{userIds:t,conversationName:n}})}function i(t,n){return e({method:"POST",url:"api/addUserToConversation",data:{userid:t,conversationid:n}})}function u(t){return e({method:"POST",url:"api/leaveConversation",data:{conversationid:t}})}function c(t,n){return e({method:"POST",url:"/api/newMessage",data:{conversationId:t,messageText:n}})}function f(t,n){return e({method:"PUT",url:"api/updateConversationDetails",data:{conversationid:t,conversationName:n}})}var d=this;d.getUserInfo=t,d.getRegisteredUsers=n,d.getConversations=o,d.getGithubLoginPath=r,d.postGuestLogin=s,d.postStartConversation=a,d.postLeaveConversation=u,d.postSendMessage=c,d.postAddUserToConversation=i,d.putUpdateConversationDetails=f}])},function(e,t){angular.module("ChatApp").config(["$mdThemingProvider",function(e){e.theme("default").primaryPalette("indigo").accentPalette("deep-orange").backgroundPalette("grey")}])},function(e,t){angular.module("ChatApp").service("ConversationService",["$mdDialog",function(e){function t(e,t,n){e.forEach(function(e){e.id===t&&e.messages.forEach(function(e){e.cleared=n})})}function n(e,t){function n(e,t){for(var n=0;n<t.messages.length;n++)e.messages[n]&&e.messages[n].id===t.messages[n].id||(e.messages.splice(n,0,t.messages[n]),o.push(t.messages[n]))}function r(e,t){_.isEqual(e.userids,t.userids)||(e.userids=t.userids)}var o=[],s=0;for(s=0;s<t.length;s++)e[s]&&e[s].id===t[s].id?(r(e[s],t[s]),n(e[s],t[s]),e[s].name=t[s].name):e.splice(s,0,t[s]);for(s=0;s<e.length;s++)t[s]&&t[s].id===t[s].id||(e.splice(s,1),s--);return o}function r(t,n){var r=e.prompt().title("Name the conversation").initialValue(n).ariaLabel("Conversation name").targetEvent(t).ok("Done").cancel("Cancel");return e.show(r)}this.setClearedForConversationMessages=t,this.updateCurrentConversations=n,this.showRenameConversationDialog=r}])},function(e,t){angular.module("ChatApp").filter("userIdsToString",function(){return function(e,t,n){function r(e){return _.find(t,function(t){return t.id===e})}if(0===e.length)return"No one";if(0===t.length)return"Loading ...";if(1===e.length)return r(e[0]).name;if(n){var o=r(e[0]).name;return o+=" and ",o+=e.length-1,o+=" other",e.length>2&&(o+="s"),o}var s=e.map(function(e){return r(e).name});return s.slice(0,s.length-1).join(", ").concat(" and "+s[s.length-1])}})},function(e,t,n){var r=n(7);"string"==typeof r&&(r=[[e.id,r,""]]);n(9)(r,{});r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(8)(),t.push([e.id,"",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var s=this[o][0];"number"==typeof s&&(r[s]=!0)}for(o=0;o<t.length;o++){var a=t[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=p[r.id];if(o){o.refs++;for(var s=0;s<o.parts.length;s++)o.parts[s](r.parts[s]);for(;s<r.parts.length;s++)o.parts.push(c(r.parts[s],t))}else{for(var a=[],s=0;s<r.parts.length;s++)a.push(c(r.parts[s],t));p[r.id]={id:r.id,refs:1,parts:a}}}}function o(e){for(var t=[],n={},r=0;r<e.length;r++){var o=e[r],s=o[0],a=o[1],i=o[2],u=o[3],c={css:a,media:i,sourceMap:u};n[s]?n[s].parts.push(c):t.push(n[s]={id:s,parts:[c]})}return t}function s(e,t){var n=h(),r=x[x.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function a(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function i(e){var t=document.createElement("style");return t.type="text/css",s(e,t),t}function u(e){var t=document.createElement("link");return t.rel="stylesheet",s(e,t),t}function c(e,t){var n,r,o;if(t.singleton){var s=C++;n=m||(m=i(t)),r=f.bind(null,n,s,!1),o=f.bind(null,n,s,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(t),r=l.bind(null,n),o=function(){a(n),n.href&&URL.revokeObjectURL(n.href)}):(n=i(t),r=d.bind(null,n),o=function(){a(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}function f(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=U(t,o);else{var s=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(s,a[t]):e.appendChild(s)}}function d(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function l(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var o=new Blob([n],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(o),s&&URL.revokeObjectURL(s)}var p={},v=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},g=v(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=v(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,C=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=g()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return r(n,t),function(e){for(var s=[],a=0;a<n.length;a++){var i=n[a],u=p[i.id];u.refs--,s.push(u)}if(e){var c=o(e);r(c,t)}for(var a=0;a<s.length;a++){var u=s[a];if(0===u.refs){for(var f=0;f<u.parts.length;f++)u.parts[f]();delete p[u.id]}}}};var U=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()}]);