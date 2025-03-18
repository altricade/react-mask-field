import{r as o,R as r}from"./index-DmM0KDA7.js";import{M as me}from"./MaskField-C2xlNsk4.js";const ye={visa:/^4/,mastercard:/^(5[1-5]|2[2-7])/,amex:/^3[47]/,discover:/^(6011|65|64[4-9]|622)/,diners:/^(36|38|30[0-5])/,jcb:/^35/,unionpay:/^62/},I={amex:"9999 999999 9999",diners:"9999 999999 9999",default:"9999 9999 9999 9999"},ge=({cardType:t,detectCardType:d=!0,onCardTypeChange:e,onChange:s,...n},V)=>{var A;const[l,i]=o.useState(t||null),[c,p]=o.useState(((A=n.value)==null?void 0:A.toString())||""),_=()=>{const a=t||l;return a==="amex"?I.amex:a==="diners"?I.diners:I.default},D=a=>{const u=a.replace(/\D/g,"");if(!u)return null;for(const[m,ue]of Object.entries(ye))if(ue.test(u))return m;return"other"},oe=a=>{const u=a.target.value;if(p(u),d&&!t){const m=D(u);m!==l&&(i(m),e==null||e(m))}s==null||s(a)};o.useEffect(()=>{if(t)i(t),e==null||e(t);else if(d&&c){const a=D(c);a!==l&&(i(a),e==null||e(a))}},[t,c,d,l,e]);const{cardType:Ce,detectCardType:fe,onCardTypeChange:Te,error:de,helperText:ce,errorColor:le,helperTextStyle:ie,...pe}=n;return r.createElement(me,{mask:_(),inputMode:"numeric",type:"tel",autoComplete:"cc-number",placeholder:_().replace(/9/g,"_"),maxLength:_().length,error:de,helperText:ce,errorColor:le,helperTextStyle:ie,...pe,value:c,onChange:oe,ref:V})},C=o.forwardRef(ge);C.displayName="CreditCardInput";C.__docgenInfo={description:"",methods:[],displayName:"CreditCardInput",props:{detectCardType:{defaultValue:{value:"true",computed:!1},required:!1}}};const xe={title:"Components/CreditCardInput",component:C,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{cardType:{control:"select",options:[void 0,"visa","mastercard","amex","discover","diners","jcb","unionpay","other"],description:"Force a specific card type mask"},detectCardType:{control:"boolean",description:"Enable auto-detection of card type from number"},onCardTypeChange:{action:"cardTypeChanged",description:"Callback when card type is detected"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},f={args:{detectCardType:!0}},T={args:{cardType:"visa",detectCardType:!1}},v={args:{cardType:"amex",detectCardType:!1}},h={args:{cardType:"mastercard",detectCardType:!1}},x={args:{cardType:"discover",detectCardType:!1}},y=()=>{const[t,d]=o.useState(""),[e,s]=o.useState(null);return r.createElement("div",null,r.createElement(C,{value:t,onChange:n=>d(n.target.value),detectCardType:!0,onCardTypeChange:n=>s(n)}),r.createElement("div",{style:{marginTop:"10px"}},"Current value: ",t),r.createElement("div",{style:{marginTop:"5px"}},"Detected card type: ",e||"None"),r.createElement("div",{style:{marginTop:"15px",fontSize:"12px",color:"#666"}},"Try entering:",r.createElement("ul",{style:{margin:"5px 0 0 20px",padding:0}},r.createElement("li",null,"4... for Visa"),r.createElement("li",null,"5... for Mastercard"),r.createElement("li",null,"34... or 37... for Amex"),r.createElement("li",null,"6... for Discover"))))},E={args:{detectCardType:!0,error:!0,helperText:"Please enter a valid credit card number"}},S={args:{detectCardType:!0,error:!0,helperText:"Please enter a valid credit card number",errorColor:"#ff6b6b"}},b={args:{detectCardType:!0,helperText:"Enter your 16-digit credit card number"}},g=()=>{const[t,d]=o.useState(""),[e,s]=o.useState(!1),[n,V]=o.useState(null),l=i=>{const c=i.target.value;d(c);const p=c.replace(/\D/g,"");p.length>0?s(n==="amex"?p.length!==15:p.length!==16):s(!1)};return r.createElement("div",null,r.createElement(C,{value:t,onChange:l,detectCardType:!0,onCardTypeChange:V,error:e,helperText:e?`Invalid card number for ${n||"this card type"}`:"Enter your credit card number"}),r.createElement("div",{style:{marginTop:"10px",fontSize:"12px",color:"#666"}},"Card type: ",n||"None detected yet"))};y.__docgenInfo={description:"",methods:[],displayName:"ControlledCreditCardInput"};g.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var M,N,W;f.parameters={...f.parameters,docs:{...(M=f.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    detectCardType: true
  }
}`,...(W=(N=f.parameters)==null?void 0:N.docs)==null?void 0:W.source}}};var k,O,R;T.parameters={...T.parameters,docs:{...(k=T.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    cardType: 'visa',
    detectCardType: false
  }
}`,...(R=(O=T.parameters)==null?void 0:O.docs)==null?void 0:R.source}}};var w,P,z;v.parameters={...v.parameters,docs:{...(w=v.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    cardType: 'amex',
    detectCardType: false
  }
}`,...(z=(P=v.parameters)==null?void 0:P.docs)==null?void 0:z.source}}};var F,j,H;h.parameters={...h.parameters,docs:{...(F=h.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    cardType: 'mastercard',
    detectCardType: false
  }
}`,...(H=(j=h.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var L,$,q;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    cardType: 'discover',
    detectCardType: false
  }
}`,...(q=($=x.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var K,B,G;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`() => {
  const [cardValue, setCardValue] = useState('');
  const [cardType, setCardType] = useState<string | null>(null);
  return <div>
      <CreditCardInput value={cardValue} onChange={e => setCardValue(e.target.value)} detectCardType={true} onCardTypeChange={type => setCardType(type)} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {cardValue}</div>
      <div style={{
      marginTop: '5px'
    }}>Detected card type: {cardType || 'None'}</div>
      <div style={{
      marginTop: '15px',
      fontSize: '12px',
      color: '#666'
    }}>
        Try entering:
        <ul style={{
        margin: '5px 0 0 20px',
        padding: 0
      }}>
          <li>4... for Visa</li>
          <li>5... for Mastercard</li>
          <li>34... or 37... for Amex</li>
          <li>6... for Discover</li>
        </ul>
      </div>
    </div>;
}`,...(G=(B=y.parameters)==null?void 0:B.docs)==null?void 0:G.source}}};var J,Q,U;E.parameters={...E.parameters,docs:{...(J=E.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    error: true,
    helperText: 'Please enter a valid credit card number'
  }
}`,...(U=(Q=E.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    error: true,
    helperText: 'Please enter a valid credit card number',
    errorColor: '#ff6b6b'
  }
}`,...(Z=(Y=S.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,re,te;b.parameters={...b.parameters,docs:{...(ee=b.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    helperText: 'Enter your 16-digit credit card number'
  }
}`,...(te=(re=b.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,ne,se;g.parameters={...g.parameters,docs:{...(ae=g.parameters)==null?void 0:ae.docs,source:{originalSource:`() => {
  const [cardValue, setCardValue] = useState('');
  const [error, setError] = useState(false);
  const [cardType, setCardType] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardValue(value);

    // Simple validation: check if the card number has the right number of digits
    // This is a basic check - in a real app you'd use the Luhn algorithm
    const digitsOnly = value.replace(/\\D/g, '');
    if (digitsOnly.length > 0) {
      // Different card types have different valid lengths
      if (cardType === 'amex') {
        setError(digitsOnly.length !== 15);
      } else {
        setError(digitsOnly.length !== 16);
      }
    } else {
      setError(false);
    }
  };
  return <div>
      <CreditCardInput value={cardValue} onChange={handleChange} detectCardType={true} onCardTypeChange={setCardType} error={error} helperText={error ? \`Invalid card number for \${cardType || 'this card type'}\` : 'Enter your credit card number'} />
      <div style={{
      marginTop: '10px',
      fontSize: '12px',
      color: '#666'
    }}>
        Card type: {cardType || 'None detected yet'}
      </div>
    </div>;
}`,...(se=(ne=g.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};const Ee=["AutoDetectCardType","VisaCard","AmexCard","MastercardFormat","DiscoverCard","ControlledCreditCardInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{v as AmexCard,f as AutoDetectCardType,y as ControlledCreditCardInput,x as DiscoverCard,h as MastercardFormat,T as VisaCard,S as WithCustomErrorColor,E as WithError,b as WithHelperText,g as WithValidation,Ee as __namedExportsOrder,xe as default};
