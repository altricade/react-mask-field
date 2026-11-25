import{r as s,R as r}from"./index-DmM0KDA7.js";import{M as fe,c as Te,p as he,d as ve}from"./MaskField-DcSL4R4g.js";const xe=[["visa",/^4/],["mastercard",/^(5[1-5]|2[2-7])/],["amex",/^3[47]/],["discover",/^(6011|65|64[4-9]|622)/],["diners",/^(36|38|30[0-5])/],["jcb",/^35/],["unionpay",/^62/]],D={amex:"9999 999999 99999",diners:"9999 999999 9999",default:"9999 9999 9999 9999"};function Ee(e){const o=e.replace(/\D/g,"");if(!o)return null;const t=xe.find(([,a])=>a.test(o));return t?t[0]:"other"}function W(e){return e==="amex"?D.amex:e==="diners"?D.diners:D.default}function O(e){return e==null?"":Array.isArray(e)?e.map(String).join(""):String(e)}const Se=({cardType:e,detectCardType:o=!0,onCardTypeChange:t,onChange:a,onChangeCapture:n,value:C,defaultValue:b,...c},g)=>{const l=C!==void 0,[pe,me]=s.useState(()=>O(b)),k=l?O(C):pe,M=d=>e??(o?Ee(d):null),u=M(k),A=W(u),I=s.useRef(null),ye=d=>{I.current=d.target.value,n==null||n(d)},Ce=d=>{const _=I.current??d.target.value;I.current=null;const ge=M(_),N=W(ge);if(N!==A){const i=d.target;i.value=Te(he(N,c.formatChars??ve),_,c.maskChar??"_",c.alwaysShowMask??!1),i.ownerDocument.activeElement===i&&i.setSelectionRange(i.value.length,i.value.length)}l||me(d.target.value),a==null||a(d)},R=s.useRef(null);return s.useEffect(()=>{u!==R.current&&(R.current=u,t==null||t(u))},[u,t]),r.createElement(fe,{inputMode:"numeric",type:"tel",autoComplete:"cc-number",...c,mask:A,value:k,onChange:Ce,onChangeCapture:ye,ref:g})},y=s.forwardRef(Se);y.displayName="CreditCardInput";y.__docgenInfo={description:"",methods:[],displayName:"CreditCardInput",props:{detectCardType:{defaultValue:{value:"true",computed:!1},required:!1}}};const Ie={title:"Components/CreditCardInput",component:y,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{cardType:{control:"select",options:[void 0,"visa","mastercard","amex","discover","diners","jcb","unionpay","other"],description:"Force a specific card type mask"},detectCardType:{control:"boolean",description:"Enable auto-detection of card type from number"},onCardTypeChange:{action:"cardTypeChanged",description:"Callback when card type is detected"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},f={args:{detectCardType:!0}},T={args:{cardType:"visa",detectCardType:!1}},h={args:{cardType:"amex",detectCardType:!1}},v={args:{cardType:"mastercard",detectCardType:!1}},x={args:{cardType:"discover",detectCardType:!1}},p=()=>{const[e,o]=s.useState(""),[t,a]=s.useState(null);return r.createElement("div",null,r.createElement(y,{value:e,onChange:n=>{o(n.target.value)},detectCardType:!0,onCardTypeChange:n=>{a(n)}}),r.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e),r.createElement("div",{style:{marginTop:"5px"}},"Detected card type: ",t||"None"),r.createElement("div",{style:{marginTop:"15px",fontSize:"12px",color:"#666"}},"Try entering:",r.createElement("ul",{style:{margin:"5px 0 0 20px",padding:0}},r.createElement("li",null,"4... for Visa"),r.createElement("li",null,"5... for Mastercard"),r.createElement("li",null,"34... or 37... for Amex"),r.createElement("li",null,"6... for Discover"))))},E={args:{detectCardType:!0,error:!0,helperText:"Please enter a valid credit card number"}},S={args:{detectCardType:!0,error:!0,helperText:"Please enter a valid credit card number",errorColor:"#ff6b6b"}},V={args:{detectCardType:!0,helperText:"Enter your 16-digit credit card number"}},m=()=>{const[e,o]=s.useState(""),[t,a]=s.useState(!1),[n,C]=s.useState(null),b=c=>{const g=c.target.value;o(g);const l=g.replace(/\D/g,"");l.length>0?a(n==="amex"?l.length!==15:l.length!==16):a(!1)};return r.createElement("div",null,r.createElement(y,{value:e,onChange:b,detectCardType:!0,onCardTypeChange:C,error:t,helperText:t?`Invalid card number for ${n||"this card type"}`:"Enter your credit card number"}),r.createElement("div",{style:{marginTop:"10px",fontSize:"12px",color:"#666"}},"Card type: ",n||"None detected yet"))};p.__docgenInfo={description:"",methods:[],displayName:"ControlledCreditCardInput"};m.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var w,F,P;f.parameters={...f.parameters,docs:{...(w=f.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    detectCardType: true
  }
}`,...(P=(F=f.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};var z,j,H;T.parameters={...T.parameters,docs:{...(z=T.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    cardType: 'visa',
    detectCardType: false
  }
}`,...(H=(j=T.parameters)==null?void 0:j.docs)==null?void 0:H.source}}};var L,$,q;h.parameters={...h.parameters,docs:{...(L=h.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    cardType: 'amex',
    detectCardType: false
  }
}`,...(q=($=h.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var K,U,B;v.parameters={...v.parameters,docs:{...(K=v.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    cardType: 'mastercard',
    detectCardType: false
  }
}`,...(B=(U=v.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};var G,J,Q;x.parameters={...x.parameters,docs:{...(G=x.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    cardType: 'discover',
    detectCardType: false
  }
}`,...(Q=(J=x.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,Y,Z;p.parameters={...p.parameters,docs:{...(X=p.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [cardValue, setCardValue] = useState('');
  const [cardType, setCardType] = useState<string | null>(null);
  return <div>
      <CreditCardInput value={cardValue} onChange={e => {
      setCardValue(e.target.value);
    }} detectCardType={true} onCardTypeChange={type => {
      setCardType(type);
    }} />
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
}`,...(Z=(Y=p.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,re,te;E.parameters={...E.parameters,docs:{...(ee=E.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    error: true,
    helperText: 'Please enter a valid credit card number'
  }
}`,...(te=(re=E.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var ae,ne,se;S.parameters={...S.parameters,docs:{...(ae=S.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    error: true,
    helperText: 'Please enter a valid credit card number',
    errorColor: '#ff6b6b'
  }
}`,...(se=(ne=S.parameters)==null?void 0:ne.docs)==null?void 0:se.source}}};var de,oe,ce;V.parameters={...V.parameters,docs:{...(de=V.parameters)==null?void 0:de.docs,source:{originalSource:`{
  args: {
    detectCardType: true,
    helperText: 'Enter your 16-digit credit card number'
  }
}`,...(ce=(oe=V.parameters)==null?void 0:oe.docs)==null?void 0:ce.source}}};var le,ie,ue;m.parameters={...m.parameters,docs:{...(le=m.parameters)==null?void 0:le.docs,source:{originalSource:`() => {
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
}`,...(ue=(ie=m.parameters)==null?void 0:ie.docs)==null?void 0:ue.source}}};const De=["AutoDetectCardType","VisaCard","AmexCard","MastercardFormat","DiscoverCard","ControlledCreditCardInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{h as AmexCard,f as AutoDetectCardType,p as ControlledCreditCardInput,x as DiscoverCard,v as MastercardFormat,T as VisaCard,S as WithCustomErrorColor,E as WithError,V as WithHelperText,m as WithValidation,De as __namedExportsOrder,Ie as default};
