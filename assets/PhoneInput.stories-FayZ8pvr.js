import{r as x,R as u}from"./index-DmM0KDA7.js";import{M as q}from"./MaskField-By_mZeOG.js";const m={US:"+1 (999) 999-9999",CA:"+1 (999) 999-9999",UK:"+44 99 9999 9999",RU:"+7 (999)999-9999",AU:"+61 9 9999 9999",IN:"+91 99999 99999"},w=({countryCode:e="RU",customMask:r,value:p="",...R},M)=>{const T=e==="custom"&&r?r:m[e]||m.US,{countryCode:O,customMask:V,...k}=R;return u.createElement(q,{mask:T,value:p,type:"tel",inputMode:"tel",autoComplete:"tel",...k,ref:M})},d=x.forwardRef(w);d.displayName="PhoneInput";d.__docgenInfo={description:"",methods:[],displayName:"PhoneInput",props:{countryCode:{defaultValue:{value:"'RU'",computed:!1},required:!1},value:{defaultValue:{value:"''",computed:!1},required:!1}}};const j={title:"Components/PhoneInput",component:d,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{countryCode:{control:"select",options:["US","CA","UK","AU","IN"],description:"Country code to determine phone number format"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},n={args:{countryCode:"US"}},t={args:{countryCode:"UK"}},a={args:{countryCode:"CA"}},s={args:{countryCode:"AU"}},c={args:{countryCode:"IN"}},o=()=>{const[e,r]=x.useState("");return u.createElement("div",null,u.createElement(d,{countryCode:"US",value:e,onChange:p=>r(p.target.value)}),u.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))};o.__docgenInfo={description:"",methods:[],displayName:"ControlledPhoneInput"};var l,i,h;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    countryCode: 'US'
  }
}`,...(h=(i=n.parameters)==null?void 0:i.docs)==null?void 0:h.source}}};var C,g,P;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    countryCode: 'UK'
  }
}`,...(P=(g=t.parameters)==null?void 0:g.docs)==null?void 0:P.source}}};var y,U,S;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    countryCode: 'CA'
  }
}`,...(S=(U=a.parameters)==null?void 0:U.docs)==null?void 0:S.source}}};var v,N,I;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    countryCode: 'AU'
  }
}`,...(I=(N=s.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var f,b,A;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    countryCode: 'IN'
  }
}`,...(A=(b=c.parameters)==null?void 0:b.docs)==null?void 0:A.source}}};var _,E,K;o.parameters={...o.parameters,docs:{...(_=o.parameters)==null?void 0:_.docs,source:{originalSource:`() => {
  const [phone, setPhone] = useState('');
  return <div>
      <PhoneInput countryCode="US" value={phone} onChange={e => setPhone(e.target.value)} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {phone}</div>
    </div>;
}`,...(K=(E=o.parameters)==null?void 0:E.docs)==null?void 0:K.source}}};const z=["USPhoneNumber","UKPhoneNumber","CanadianPhoneNumber","AustralianPhoneNumber","IndianPhoneNumber","ControlledPhoneInput"];export{s as AustralianPhoneNumber,a as CanadianPhoneNumber,o as ControlledPhoneInput,c as IndianPhoneNumber,t as UKPhoneNumber,n as USPhoneNumber,z as __namedExportsOrder,j as default};
