(this.webpackJsonptodo=this.webpackJsonptodo||[]).push([[0],{116:function(e,t,a){e.exports=a(167)},121:function(e,t,a){},167:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),c=a.n(o),l=(a(121),a(74)),i=a(11),u=a(75),s=a.n(u),m=a(99),d=a(76),p=a.n(d);p.a.initializeApp({apiKey:"AIzaSyBlc-9cBQVLLXdLxYfVpgh8I3iFALoQ7E0",authDomain:"todo-2ac34.firebaseapp.com",databaseURL:"https://todo-2ac34.firebaseio.com",projectId:"todo-2ac34",storageBucket:"todo-2ac34.appspot.com",messagingSenderId:"144767486267",appId:"1:144767486267:web:53c6a77d36c83e42db4f1e"});var f=p.a,g=a(24),h=r.a.createContext(),b=function(e){var t=e.children,a=Object(n.useState)(null),o=Object(g.a)(a,2),c=o[0],l=o[1],i=Object(n.useState)(!0),u=Object(g.a)(i,2),s=u[0],m=u[1];return Object(n.useEffect)((function(){f.auth().onAuthStateChanged((function(e){l(e),m(!1)}))}),[]),s?r.a.createElement(r.a.Fragment,null,"Loading..."):r.a.createElement(h.Provider,{value:{currentUser:c}},t)},E=a(215),v=a(205),j=a(30),O=a.n(j),w=a(204),x=a(203),y=O()((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,0,2)}}})),S=Object(i.f)((function(e){var t=e.history,a=y(),o=Object(n.useCallback)(function(){var e=Object(m.a)(s.a.mark((function e(a){var n,r,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.preventDefault(),n=a.target.elements,r=n.email,o=n.password,e.prev=2,e.next=5,f.auth().signInWithEmailAndPassword(r.value,o.value);case 5:t.push("/"),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(2),alert(e.t0);case 11:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(t){return e.apply(this,arguments)}}(),[t]);return Object(n.useContext)(h).currentUser?r.a.createElement(i.a,{to:"/"}):r.a.createElement(x.a,{component:"main",maxWidth:"xs"},r.a.createElement(w.a,null),r.a.createElement("div",{className:a.paper},r.a.createElement("form",{className:a.form,noValidate:!0,onSubmit:o},r.a.createElement(E.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email Address",name:"email",autoComplete:"email",autoFocus:!0}),r.a.createElement(E.a,{variant:"outlined",margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Password",type:"password",id:"password",autoComplete:"current-password"}),r.a.createElement(v.a,{type:"submit",fullWidth:!0,variant:"contained",className:a.submit,color:"primary"},"Sign In"))))})),k=a(107),C=function(e){var t=e.component,a=Object(k.a)(e,["component"]),o=Object(n.useContext)(h).currentUser;return r.a.createElement(i.b,Object.assign({},a,{render:function(e){return o?r.a.createElement(t,e):r.a.createElement(i.a,{to:"/login"})}}))},I=a(68),N=(a(157),a(208)),A=a(207),T=a(104),D=a.n(T),L=a(210),B=a(217),W=a(79),F=a(103),U=a.n(F),V=a(209),P=a(105),G=a.n(P),q=a(211),z=a(216),J=function(e){var t=e.value,a=e.index,o=e.updateItemTitle,c=Object(n.useState)(t),l=Object(g.a)(c,2),i=l[0],u=l[1],s=Object(n.useState)(!1),m=Object(g.a)(s,2),d=m[0],p=m[1],f=O()({input:{height:"50px",border:0,opacity:1,borderBottom:0,"&:before":{borderBottom:0}},showAsText:{display:d?"none":""},showAsInputField:{display:d?"":"none"}})(),h=Object(n.useRef)(null);Object(n.useEffect)((function(){h.current.focus()}),[d]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{width:"80%",cursor:"pointer"},className:f.showAsText,onClick:function(){p(!0)}},i),r.a.createElement("input",{style:{width:"80%"},onBlur:function(){p(!1),o(i,a)},onKeyDown:function(e){"Enter"===e.key&&(p(!1),o(i,a))},className:f.showAsInputField,ref:h,defaultValue:i,onChange:function(e){u(e.target.value)},type:"text"}))},K=a(206),Q=O()((function(e){return{root:{margin:e.spacing(1),listStyleType:"none",display:"flex",justifyContent:"center"},pcb:{color:"red"},card:{width:"800px",minWidth:"300px"},input:{marginLeft:e.spacing(1),marginBottom:e.spacing(1),padding:e.spacing(1),flex:1},inputfield:{}}})),R=function(){var e=Object(n.useState)(""),t=Object(g.a)(e,2),a=t[0],o=t[1],c=Object(n.useState)([]),l=Object(g.a)(c,2),i=l[0],u=l[1],s=Object(n.useState)(!1),m=Object(g.a)(s,2),d=m[0],p=m[1],b=Object(n.useContext)(h).currentUser,E=Object(n.useState)(!0),v=Object(g.a)(E,2),j=v[0],O=v[1],w=Q();Object(n.useEffect)((function(){var e;p(!0),(e=b.email,f.firestore().collection("todoLists").doc(e).get().then((function(e){return e.data().tasks}))).then((function(e){u(e)})).catch((function(e){console.log("Failed to load todo-list",e)})).finally((function(){p(!1)}))}),[b.email]),Object(n.useEffect)((function(){var e,t;j||(console.log("SAVING",i),e=b.email,t=i,f.firestore().collection("todoLists").doc(e).set({tasks:t}).then((function(){console.log("Document successfully written!")})).catch((function(e){console.error("Error updating/creating document: ",e)})),O(!0))}),[i,j,b.email]);return r.a.createElement("div",{className:w.root},r.a.createElement(K.a,{className:w.card},r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={itemTitle:a,id:Object(z.a)(),favorite:!1,done:!1};u([].concat(Object(I.a)(i),[t])),o(""),O(!1)}},r.a.createElement(B.a,{className:w.input,variant:"standard",fullWidth:!0,placeholder:"Legg til en oppgave",value:a,onChange:function(e){return o(e.currentTarget.value)}})),r.a.createElement(W.Container,{onDrop:function(e){var t=e.removedIndex,a=e.addedIndex;u((function(e){return U()(e,t,a)})),O(!1)},dragHandleSelector:".drag-handle",lockAxis:"y",dropPlaceholder:{animationDuration:150,showOnTop:!0,className:"cards-drop-preview"}},i&&i.map((function(e,t){var a=e.id,n=e.itemTitle;return r.a.createElement(W.Draggable,{key:a},r.a.createElement(A.a,null,r.a.createElement(J,{value:n,index:t,updateItemTitle:function(e,t){return function(e,t){console.log(t),i[t].itemTitle=e,console.log(i),u(Object(I.a)(i)),O(!1)}(e,t)}}),r.a.createElement(N.a,null,r.a.createElement(V.a,null,r.a.createElement(L.a,{onClick:function(e){return function(e,t){t.preventDefault(),i.splice(e,1),u(Object(I.a)(i)),O(!1)}(t,e)}},r.a.createElement(D.a,null))),r.a.createElement(V.a,{style:{minWidth:"0"},className:"drag-handle"},r.a.createElement(G.a,null)))),r.a.createElement(q.a,null))}))),d&&r.a.createElement("pre",null,"fetching data ...")))},H=a(212),M=a(213),X=a(214),Y=O()((function(e){return{root:{backgroundColor:e.palette.primary},title:{flexGrow:1},userName:{flexGrow:1}}})),$=function(){var e=Y(),t=Object(n.useContext)(h).currentUser;return r.a.createElement(H.a,{position:"static",className:e.root},r.a.createElement(M.a,null,!t&&r.a.createElement(v.a,{color:"inherit"},"Login"),!!t&&r.a.createElement(r.a.Fragment,null,r.a.createElement(X.a,{className:e.userName,variant:"h6"},t.email," "),r.a.createElement(v.a,{color:"inherit",onClick:function(){return f.auth().signOut()}},"Sign out"))))},Z=a(106),_=a(202),ee=Object(Z.a)({palette:{primary:{main:"#494D5F"},secondary:{main:"#8458B3"}}}),te=function(){return r.a.createElement(_.a,{theme:ee},r.a.createElement(b,null,r.a.createElement($,null),r.a.createElement(l.a,null,r.a.createElement(C,{exact:!0,path:"/",component:R}),r.a.createElement(i.b,{exact:!0,path:"/login",component:S}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[116,1,2]]]);
//# sourceMappingURL=main.3c509a42.chunk.js.map