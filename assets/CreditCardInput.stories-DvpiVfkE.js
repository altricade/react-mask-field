import{r as n,R as r}from"./index-DmM0KDA7.js";import{M as Q}from"./MaskField-By_mZeOG.js";const U={visa:/^4/,mastercard:/^(5[1-5]|2[2-7])/,amex:/^3[47]/,discover:/^(6011|65|64[4-9]|622)/,diners:/^(36|38|30[0-5])/,jcb:/^35/,unionpay:/^62/},S={amex:"9999 999999 9999",diners:"9999 999999 9999",default:"9999 9999 9999 9999"},W=({cardType:a,detectCardType:c=!0,onCardTypeChange:e,onChange:o,...s},L)=>{var _;const[p,T]=n.useState(a||null),[u,B]=n.useState(((_=s.value)==null?void 0:_.toString())||""),x=()=>{const t=a||p;return t==="amex"?S.amex:t==="diners"?S.diners:S.default},E=t=>{const d=t.replace(/\D/g,"");if(!d)return null;for(const[l,J]of Object.entries(U))if(J.test(d))return l;return"other"},G=t=>{const d=t.target.value;if(B(d),c&&!a){const l=E(d);l!==p&&(T(l),e==null||e(l))}o==null||o(t)};n.useEffect(()=>{if(a)T(a),e==null||e(a);else if(c&&u){const t=E(u);t!==p&&(T(t),e==null||e(t))}},[a,u,c,p,e]);const{cardType:X,detectCardType:Y,onCardTypeChange:Z,...H}=s;return r.createElement(Q,{mask:x(),inputMode:"numeric",type:"tel",autoComplete:"cc-number",placeholder:x().replace(/9/g,"_"),maxLength:x().length,...H,value:u,onChange:G,ref:L})},g=n.forwardRef(W);g.displayName="CreditCardInput";g.__docgenInfo={description:"",methods:[],displayName:"CreditCardInput",props:{detectCardType:{defaultValue:{value:"true",computed:!1},required:!1}}};const te={title:"Components/CreditCardInput",component:g,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{cardType:{control:"select",options:[void 0,"visa","mastercard","amex","discover","diners","jcb","unionpay","other"],description:"Force a specific card type mask"},detectCardType:{control:"boolean",description:"Enable auto-detection of card type from number"},onCardTypeChange:{action:"cardTypeChanged",description:"Callback when card type is detected"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},m={args:{detectCardType:!0}},f={args:{cardType:"visa",detectCardType:!1}},y={args:{cardType:"amex",detectCardType:!1}},v={args:{cardType:"mastercard",detectCardType:!1}},C={args:{cardType:"discover",detectCardType:!1}},i=()=>{const[a,c]=n.useState(""),[e,o]=n.useState(null);return r.createElement("div",null,r.createElement(g,{value:a,onChange:s=>c(s.target.value),detectCardType:!0,onCardTypeChange:s=>o(s)}),r.createElement("div",{style:{marginTop:"10px"}},"Current value: ",a),r.createElement("div",{style:{marginTop:"5px"}},"Detected card type: ",e||"None"),r.createElement("div",{style:{marginTop:"15px",fontSize:"12px",color:"#666"}},"Try entering:",r.createElement("ul",{style:{margin:"5px 0 0 20px",padding:0}},r.createElement("li",null,"4... for Visa"),r.createElement("li",null,"5... for Mastercard"),r.createElement("li",null,"34... or 37... for Amex"),r.createElement("li",null,"6... for Discover"))))};i.__docgenInfo={description:"",methods:[],displayName:"ControlledCreditCardInput"};var V,D,I;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    detectCardType: true
  }
}`,...(I=(D=m.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var A,b,M;f.parameters={...f.parameters,docs:{...(A=f.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    cardType: 'visa',
    detectCardType: false
  }
}`,...(M=(b=f.parameters)==null?void 0:b.docs)==null?void 0:M.source}}};var h,k,w;y.parameters={...y.parameters,docs:{...(h=y.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    cardType: 'amex',
    detectCardType: false
  }
}`,...(w=(k=y.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var N,R,F;v.parameters={...v.parameters,docs:{...(N=v.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    cardType: 'mastercard',
    detectCardType: false
  }
}`,...(F=(R=v.parameters)==null?void 0:R.docs)==null?void 0:F.source}}};var j,z,O;C.parameters={...C.parameters,docs:{...(j=C.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    cardType: 'discover',
    detectCardType: false
  }
}`,...(O=(z=C.parameters)==null?void 0:z.docs)==null?void 0:O.source}}};var P,q,K;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
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
}`,...(K=(q=i.parameters)==null?void 0:q.docs)==null?void 0:K.source}}};const re=["AutoDetectCardType","VisaCard","AmexCard","MastercardFormat","DiscoverCard","ControlledCreditCardInput"];export{y as AmexCard,m as AutoDetectCardType,i as ControlledCreditCardInput,C as DiscoverCard,v as MastercardFormat,f as VisaCard,re as __namedExportsOrder,te as default};
