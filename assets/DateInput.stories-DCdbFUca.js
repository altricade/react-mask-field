import{r as c,R as o}from"./index-DmM0KDA7.js";import{M as ne}from"./MaskField-DcSL4R4g.js";import{c as se}from"./dateTime-rWvpcW7I.js";function te(e){return e.startsWith("MM")?"MDY":e.startsWith("DD")?"DMY":"YMD"}function le(e,t){const a=t??(e.includes("/")?"/":"-");return{MDY:["99","99","9999"],DMY:["99","99","9999"],YMD:["9999","99","99"]}[te(e)].join(a)}const ie=({format:e="MM/DD/YYYY",separator:t,enableDateValidation:a=!0,beforeMaskedValueChange:r,...V},b)=>{const n=le(e,t),s=te(e),u=c.useCallback((l,C,E,re)=>{const S=r?r(l,C,E,re):l;if(!a)return S;const oe=S.value.replace(/\D/g,"");return{...S,value:se(oe,s)}},[r,a,s]);return o.createElement(ne,{inputMode:"numeric",autoComplete:"off",...V,mask:n,beforeMaskedValueChange:u,ref:b})},p=c.forwardRef(ie);p.displayName="DateInput";p.__docgenInfo={description:"",methods:[],displayName:"DateInput",props:{format:{defaultValue:{value:"'MM/DD/YYYY'",computed:!1},required:!1},enableDateValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const ue={title:"Components/DateInput",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"],description:"Date format to use"},separator:{control:"select",options:["/","-","."],description:"Character to separate date parts"},enableDateValidation:{control:"boolean",description:"Enable validation of dates (e.g., prevent invalid dates like 02/31/2025)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},Y={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0}},m={args:{format:"DD/MM/YYYY",separator:"/",enableDateValidation:!0}},D={args:{format:"YYYY-MM-DD",separator:"-",enableDateValidation:!0}},M={args:{format:"DD/MM/YYYY",separator:".",enableDateValidation:!0}},f={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!1}},i=()=>{const[e,t]=c.useState("");return o.createElement("div",null,o.createElement(p,{format:"MM/DD/YYYY",separator:"/",value:e,onChange:a=>{t(a.target.value)},enableDateValidation:!0}),o.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))},g={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,error:!0,helperText:"Please enter a valid date"}},h={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,error:!0,helperText:"Please enter a valid date",errorColor:"#ff6b6b"}},v={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,helperText:"Enter date in MM/DD/YYYY format"}},d=()=>{const[e,t]=c.useState(""),[a,r]=c.useState(!1),V=b=>{const n=b.target.value;if(t(n),n.length===10){const[s=NaN,u=NaN,l=NaN]=n.split("/").map(E=>parseInt(E,10)),C=s>=1&&s<=12&&u>=1&&u<=31&&l>=1900&&l<=2100;r(!C)}else r(!1)};return o.createElement("div",null,o.createElement(p,{format:"MM/DD/YYYY",separator:"/",value:e,onChange:V,enableDateValidation:!0,error:a,helperText:a?"Invalid date format":"Enter date in MM/DD/YYYY format"}))};i.__docgenInfo={description:"",methods:[],displayName:"ControlledDateInput"};d.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var I,x,y;Y.parameters={...Y.parameters,docs:{...(I=Y.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(y=(x=Y.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};var N,T,W;m.parameters={...m.parameters,docs:{...(N=m.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(W=(T=m.parameters)==null?void 0:T.docs)==null?void 0:W.source}}};var _,k,F;D.parameters={...D.parameters,docs:{...(_=D.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    format: 'YYYY-MM-DD',
    separator: '-',
    enableDateValidation: true
  }
}`,...(F=(k=D.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var O,P,R;M.parameters={...M.parameters,docs:{...(O=M.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '.',
    enableDateValidation: true
  }
}`,...(R=(P=M.parameters)==null?void 0:P.docs)==null?void 0:R.source}}};var H,q,U;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: false
  }
}`,...(U=(q=f.parameters)==null?void 0:q.docs)==null?void 0:U.source}}};var j,w,B;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [date, setDate] = useState('');
  return <div>
      <DateInput format="MM/DD/YYYY" separator="/" value={date} onChange={e => {
      setDate(e.target.value);
    }} enableDateValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {date}</div>
    </div>;
}`,...(B=(w=i.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};var L,z,A;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date'
  }
}`,...(A=(z=g.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var G,J,K;h.parameters={...h.parameters,docs:{...(G=h.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date',
    errorColor: '#ff6b6b'
  }
}`,...(K=(J=h.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;v.parameters={...v.parameters,docs:{...(Q=v.parameters)==null?void 0:Q.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    helperText: 'Enter date in MM/DD/YYYY format'
  }
}`,...(Z=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var $,ee,ae;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);

    // Simple validation: check if the date is complete and valid
    if (value.length === 10) {
      const [month = NaN, day = NaN, year = NaN] = value.split('/').map(part => parseInt(part, 10));
      const isValid = month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 && year <= 2100;
      setError(!isValid);
    } else {
      setError(false);
    }
  };
  return <div>
      <DateInput format="MM/DD/YYYY" separator="/" value={date} onChange={handleChange} enableDateValidation={true} error={error} helperText={error ? 'Invalid date format' : 'Enter date in MM/DD/YYYY format'} />
    </div>;
}`,...(ae=(ee=d.parameters)==null?void 0:ee.docs)==null?void 0:ae.source}}};const Ye=["USDateFormat","EuropeanDateFormat","ISODateFormat","DotSeparator","WithoutValidation","ControlledDateInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{i as ControlledDateInput,M as DotSeparator,m as EuropeanDateFormat,D as ISODateFormat,Y as USDateFormat,h as WithCustomErrorColor,g as WithError,v as WithHelperText,d as WithValidation,f as WithoutValidation,Ye as __namedExportsOrder,ue as default};
