import{r as y,R as n}from"./index-DmM0KDA7.js";import{M as oe}from"./MaskField-DcSL4R4g.js";const P={US:"+1 (999) 999-9999",CA:"+1 (999) 999-9999",UK:"+44 99 9999 9999",RU:"+7 (999)999-9999",AU:"+61 9 9999 9999",IN:"+\\91 99999 99999"},ne=({countryCode:e="RU",customMask:r,...o},c)=>{const v=e==="custom"?r||P.US:P[e];return n.createElement(oe,{type:"tel",inputMode:"tel",autoComplete:"tel",...o,mask:v,ref:c})},s=y.forwardRef(ne);s.displayName="PhoneInput";s.__docgenInfo={description:"",methods:[],displayName:"PhoneInput",props:{countryCode:{defaultValue:{value:"'RU'",computed:!1},required:!1}}};const se={title:"Components/PhoneInput",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{countryCode:{control:"select",options:["US","CA","UK","AU","IN"],description:"Country code to determine phone number format"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},u={args:{countryCode:"RU"}},d={args:{countryCode:"US"}},p={args:{countryCode:"UK"}},l={args:{countryCode:"CA"}},i={args:{countryCode:"AU"}},m={args:{countryCode:"IN"}},t=()=>{const[e,r]=y.useState("");return n.createElement("div",null,n.createElement(s,{countryCode:"RU",value:e,onChange:o=>{r(o.target.value)}}),n.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))},h={args:{countryCode:"RU",error:!0,helperText:"Please enter a valid phone number"}},g={args:{countryCode:"RU",error:!0,helperText:"Please enter a valid phone number",errorColor:"#ff6b6b"}},C={args:{countryCode:"RU",helperText:"Enter your phone number with area code"}},a=()=>{const[e,r]=y.useState(""),[o,c]=y.useState(!1),v=ee=>{const U=ee.target.value;if(r(U),U.length===14){const re=U.replace(/\D/g,"");c(re.length!==10)}else c(!1)};return n.createElement("div",null,n.createElement(s,{countryCode:"US",value:e,onChange:v,error:o,helperText:o?"Invalid phone number format":"Enter your 10-digit phone number"}))};t.__docgenInfo={description:"",methods:[],displayName:"ControlledPhoneInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var S,b,f;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU'
  }
}`,...(f=(b=u.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var E,I,N;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    countryCode: 'US'
  }
}`,...(N=(I=d.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var R,x,T;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    countryCode: 'UK'
  }
}`,...(T=(x=p.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var A,X,W;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    countryCode: 'CA'
  }
}`,...(W=(X=l.parameters)==null?void 0:X.docs)==null?void 0:W.source}}};var _,K,O;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    countryCode: 'AU'
  }
}`,...(O=(K=i.parameters)==null?void 0:K.docs)==null?void 0:O.source}}};var w,H,M;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    countryCode: 'IN'
  }
}`,...(M=(H=m.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var V,k,D;t.parameters={...t.parameters,docs:{...(V=t.parameters)==null?void 0:V.docs,source:{originalSource:`() => {
  const [phone, setPhone] = useState('');
  return <div>
      <PhoneInput countryCode="RU" value={phone} onChange={e => {
      setPhone(e.target.value);
    }} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {phone}</div>
    </div>;
}`,...(D=(k=t.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};var q,F,L;h.parameters={...h.parameters,docs:{...(q=h.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number'
  }
}`,...(L=(F=h.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var j,z,B;g.parameters={...g.parameters,docs:{...(j=g.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number',
    errorColor: '#ff6b6b'
  }
}`,...(B=(z=g.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var G,J,Q;C.parameters={...C.parameters,docs:{...(G=C.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    helperText: 'Enter your phone number with area code'
  }
}`,...(Q=(J=C.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var Y,Z,$;a.parameters={...a.parameters,docs:{...(Y=a.parameters)==null?void 0:Y.docs,source:{originalSource:`() => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);

    // Simple validation: check if the US phone number is complete
    // US format: (XXX) XXX-XXXX
    if (value.length === 14) {
      const digitsOnly = value.replace(/\\D/g, '');
      setError(digitsOnly.length !== 10);
    } else {
      setError(false);
    }
  };
  return <div>
      <PhoneInput countryCode="US" value={phone} onChange={handleChange} error={error} helperText={error ? 'Invalid phone number format' : 'Enter your 10-digit phone number'} />
    </div>;
}`,...($=(Z=a.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const ce=["RUPhoneNumber","USPhoneNumber","UKPhoneNumber","CanadianPhoneNumber","AustralianPhoneNumber","IndianPhoneNumber","ControlledPhoneInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{i as AustralianPhoneNumber,l as CanadianPhoneNumber,t as ControlledPhoneInput,m as IndianPhoneNumber,u as RUPhoneNumber,p as UKPhoneNumber,d as USPhoneNumber,g as WithCustomErrorColor,h as WithError,C as WithHelperText,a as WithValidation,ce as __namedExportsOrder,se as default};
