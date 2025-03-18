import{M as f}from"./MaskField-By_mZeOG.js";import{r as E,R as o}from"./index-DmM0KDA7.js";const F={title:"Components/MaskField",component:f,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{mask:{control:"text",description:"The mask pattern to apply to the input (9: digit, a: letter, *: alphanumeric)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"},placeholder:{control:"text",description:"Placeholder text to display when the input is empty"},maskChar:{control:"text",description:"Character to use as a placeholder for unfilled parts of the mask"}}},a={args:{mask:"(999) 999-9999",placeholder:"(___) ___-____"}},r={args:{mask:"(999) 999-9999",maskChar:"#",placeholder:"(###) ###-####"}},t={args:{mask:"aaa-9999",placeholder:"___-____"}},s={args:{mask:"*** *** ***",placeholder:"___ ___ ___"}},e=()=>{const[n,y]=E.useState("");return o.createElement("div",null,o.createElement(f,{mask:"9999-aaaa-9999",value:n,onChange:S=>y(S.target.value),placeholder:"____-____-____"}),o.createElement("div",{style:{marginTop:"10px"}},"Current value: ",n))};e.__docgenInfo={description:"",methods:[],displayName:"ControlledInput"};var c,l,_;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____'
  }
}`,...(_=(l=a.parameters)==null?void 0:l.docs)==null?void 0:_.source}}};var p,d,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    maskChar: '#',
    placeholder: '(###) ###-####'
  }
}`,...(m=(d=r.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,i,h;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    mask: 'aaa-9999',
    placeholder: '___-____'
  }
}`,...(h=(i=t.parameters)==null?void 0:i.docs)==null?void 0:h.source}}};var g,k,v;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    mask: '*** *** ***',
    placeholder: '___ ___ ___'
  }
}`,...(v=(k=s.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var C,x,M;e.parameters={...e.parameters,docs:{...(C=e.parameters)==null?void 0:C.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  return <div>
      <MaskField mask="9999-aaaa-9999" value={value} onChange={e => setValue(e.target.value)} placeholder="____-____-____" />
      <div style={{
      marginTop: '10px'
    }}>Current value: {value}</div>
    </div>;
}`,...(M=(x=e.parameters)==null?void 0:x.docs)==null?void 0:M.source}}};const V=["Basic","CustomMaskChar","LetterMask","AlphanumericMask","ControlledInput"];export{s as AlphanumericMask,a as Basic,e as ControlledInput,r as CustomMaskChar,t as LetterMask,V as __namedExportsOrder,F as default};
