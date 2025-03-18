import{r as v,R as t}from"./index-DmM0KDA7.js";import{M as ce}from"./MaskField-C2xlNsk4.js";const f={US:"+1 (999) 999-9999",CA:"+1 (999) 999-9999",UK:"+44 99 9999 9999",RU:"+7 (999)999-9999",AU:"+61 9 9999 9999",IN:"+91 99999 99999"},ue=({countryCode:e="RU",customMask:r,value:o="",...c},U)=>{const P=e==="custom"&&r?r:f[e]||f.US,{countryCode:u,customMask:S,error:oe,helperText:te,errorColor:ne,helperTextStyle:ae,...se}=c;return t.createElement(ce,{mask:P,value:o,type:"tel",inputMode:"tel",autoComplete:"tel",error:oe,helperText:te,errorColor:ne,helperTextStyle:ae,...se,ref:U})},s=v.forwardRef(ue);s.displayName="PhoneInput";s.__docgenInfo={description:"",methods:[],displayName:"PhoneInput",props:{countryCode:{defaultValue:{value:"'RU'",computed:!1},required:!1},value:{defaultValue:{value:"''",computed:!1},required:!1}}};const pe={title:"Components/PhoneInput",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{countryCode:{control:"select",options:["US","CA","UK","AU","IN"],description:"Country code to determine phone number format"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},l={args:{countryCode:"RU"}},d={args:{countryCode:"US"}},p={args:{countryCode:"UK"}},m={args:{countryCode:"CA"}},i={args:{countryCode:"AU"}},h={args:{countryCode:"IN"}},n=()=>{const[e,r]=v.useState("");return t.createElement("div",null,t.createElement(s,{countryCode:"RU",value:e,onChange:o=>r(o.target.value)}),t.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))},g={args:{countryCode:"RU",error:!0,helperText:"Please enter a valid phone number"}},C={args:{countryCode:"RU",error:!0,helperText:"Please enter a valid phone number",errorColor:"#ff6b6b"}},y={args:{countryCode:"RU",helperText:"Enter your phone number with area code"}},a=()=>{const[e,r]=v.useState(""),[o,c]=v.useState(!1),U=P=>{const u=P.target.value;if(r(u),u.length===14){const S=u.replace(/\D/g,"");c(S.length!==10)}else c(!1)};return t.createElement("div",null,t.createElement(s,{countryCode:"US",value:e,onChange:U,error:o,helperText:o?"Invalid phone number format":"Enter your 10-digit phone number"}))};n.__docgenInfo={description:"",methods:[],displayName:"ControlledPhoneInput"};a.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var b,E,I;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU'
  }
}`,...(I=(E=l.parameters)==null?void 0:E.docs)==null?void 0:I.source}}};var N,R,x;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    countryCode: 'US'
  }
}`,...(x=(R=d.parameters)==null?void 0:R.docs)==null?void 0:x.source}}};var T,_,A;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    countryCode: 'UK'
  }
}`,...(A=(_=p.parameters)==null?void 0:_.docs)==null?void 0:A.source}}};var X,W,K;m.parameters={...m.parameters,docs:{...(X=m.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    countryCode: 'CA'
  }
}`,...(K=(W=m.parameters)==null?void 0:W.docs)==null?void 0:K.source}}};var M,O,V;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    countryCode: 'AU'
  }
}`,...(V=(O=i.parameters)==null?void 0:O.docs)==null?void 0:V.source}}};var k,w,H;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    countryCode: 'IN'
  }
}`,...(H=(w=h.parameters)==null?void 0:w.docs)==null?void 0:H.source}}};var q,D,F;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const [phone, setPhone] = useState('');
  return <div>
      <PhoneInput countryCode="RU" value={phone} onChange={e => setPhone(e.target.value)} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {phone}</div>
    </div>;
}`,...(F=(D=n.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var L,j,z;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number'
  }
}`,...(z=(j=g.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var B,G,J;C.parameters={...C.parameters,docs:{...(B=C.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    error: true,
    helperText: 'Please enter a valid phone number',
    errorColor: '#ff6b6b'
  }
}`,...(J=(G=C.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var Q,Y,Z;y.parameters={...y.parameters,docs:{...(Q=y.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    countryCode: 'RU',
    helperText: 'Enter your phone number with area code'
  }
}`,...(Z=(Y=y.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var $,ee,re;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
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
}`,...(re=(ee=a.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};const me=["RUPhoneNumber","USPhoneNumber","UKPhoneNumber","CanadianPhoneNumber","AustralianPhoneNumber","IndianPhoneNumber","ControlledPhoneInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{i as AustralianPhoneNumber,m as CanadianPhoneNumber,n as ControlledPhoneInput,h as IndianPhoneNumber,l as RUPhoneNumber,p as UKPhoneNumber,d as USPhoneNumber,C as WithCustomErrorColor,g as WithError,y as WithHelperText,a as WithValidation,me as __namedExportsOrder,pe as default};
