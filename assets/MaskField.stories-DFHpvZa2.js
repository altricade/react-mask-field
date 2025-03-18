import{M as h}from"./MaskField-C2xlNsk4.js";import{r as u,R as a}from"./index-DmM0KDA7.js";const X={title:"Components/MaskField",component:h,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{mask:{control:"text",description:"The mask pattern to apply to the input (9: digit, a: letter, *: alphanumeric)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"},placeholder:{control:"text",description:"Placeholder text to display when the input is empty"},maskChar:{control:"text",description:"Character to use as a placeholder for unfilled parts of the mask"},error:{control:"boolean",description:"If true, the input will be marked as having an error"},helperText:{control:"text",description:"Helper text to display below the input"},errorColor:{control:"color",description:"Color for the error state border and text"}}},o={args:{mask:"(999) 999-9999",placeholder:"(___) ___-____"}},s={args:{mask:"(999) 999-9999",maskChar:"#",placeholder:"(###) ###-####"}},n={args:{mask:"aaa-9999",placeholder:"___-____"}},l={args:{mask:"*** *** ***",placeholder:"___ ___ ___"}},e=()=>{const[t,m]=u.useState("");return a.createElement("div",null,a.createElement(h,{mask:"9999-aaaa-9999",value:t,onChange:i=>m(i.target.value),placeholder:"____-____-____"}),a.createElement("div",{style:{marginTop:"10px"}},"Current value: ",t))},_={args:{mask:"(999) 999-9999",placeholder:"(___) ___-____",error:!0,helperText:"Please enter a valid phone number"}},c={args:{mask:"(999) 999-9999",placeholder:"(___) ___-____",helperText:"Enter your phone number"}},p={args:{mask:"(999) 999-9999",placeholder:"(___) ___-____",error:!0,errorColor:"#ff6b00",helperText:"Invalid phone number format"}},r=()=>{const[t,m]=u.useState(""),[i,g]=u.useState(!1),[G,k]=u.useState("Enter a phone number"),J=K=>{const d=K.target.value;m(d),d.length>0&&d.length<14?(g(!0),k("Phone number is incomplete")):(g(!1),k("Enter a phone number"))};return a.createElement("div",null,a.createElement(h,{mask:"(999) 999-9999",value:t,onChange:J,placeholder:"(___) ___-____",error:i,helperText:G}))};e.__docgenInfo={description:"",methods:[],displayName:"ControlledInput"};r.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var v,C,x;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____'
  }
}`,...(x=(C=o.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var f,E,T;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    maskChar: '#',
    placeholder: '(###) ###-####'
  }
}`,...(T=(E=s.parameters)==null?void 0:E.docs)==null?void 0:T.source}}};var b,S,V;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    mask: 'aaa-9999',
    placeholder: '___-____'
  }
}`,...(V=(S=n.parameters)==null?void 0:S.docs)==null?void 0:V.source}}};var y,M,w;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    mask: '*** *** ***',
    placeholder: '___ ___ ___'
  }
}`,...(w=(M=l.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var I,H,W;e.parameters={...e.parameters,docs:{...(I=e.parameters)==null?void 0:I.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  return <div>
      <MaskField mask="9999-aaaa-9999" value={value} onChange={e => setValue(e.target.value)} placeholder="____-____-____" />
      <div style={{
      marginTop: '10px'
    }}>Current value: {value}</div>
    </div>;
}`,...(W=(H=e.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};var P,F,L;_.parameters={..._.parameters,docs:{...(P=_.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    error: true,
    helperText: 'Please enter a valid phone number'
  }
}`,...(L=(F=_.parameters)==null?void 0:F.docs)==null?void 0:L.source}}};var R,A,B;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    helperText: 'Enter your phone number'
  }
}`,...(B=(A=c.parameters)==null?void 0:A.docs)==null?void 0:B.source}}};var N,O,j;p.parameters={...p.parameters,docs:{...(N=p.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    mask: '(999) 999-9999',
    placeholder: '(___) ___-____',
    error: true,
    errorColor: '#ff6b00',
    helperText: 'Invalid phone number format'
  }
}`,...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var q,z,D;r.parameters={...r.parameters,docs:{...(q=r.parameters)==null?void 0:q.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('Enter a phone number');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Simple validation - check if the input has the expected length
    if (newValue.length > 0 && newValue.length < 14) {
      setError(true);
      setHelperText('Phone number is incomplete');
    } else {
      setError(false);
      setHelperText('Enter a phone number');
    }
  };
  return <div>
      <MaskField mask="(999) 999-9999" value={value} onChange={handleChange} placeholder="(___) ___-____" error={error} helperText={helperText} />
    </div>;
}`,...(D=(z=r.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};const Y=["Basic","CustomMaskChar","LetterMask","AlphanumericMask","ControlledInput","WithError","WithHelperText","CustomErrorColor","WithValidation"];export{l as AlphanumericMask,o as Basic,e as ControlledInput,p as CustomErrorColor,s as CustomMaskChar,n as LetterMask,_ as WithError,c as WithHelperText,r as WithValidation,Y as __namedExportsOrder,X as default};
