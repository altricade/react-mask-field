import{r as u,R as d}from"./index-DmM0KDA7.js";import{M as Ce}from"./MaskField-C2xlNsk4.js";const Ve=({format:e="MM/DD/YYYY",separator:r,enableDateValidation:n=!0,beforeMaskedValueChange:i,...Y},N)=>{const s=u.useCallback(()=>{const p=r||(new RegExp("/").test(e)?"/":/-/.test(e)?"-":".");return e.replace(/[/\-.]/g,p).replace("MM","99").replace("DD","99").replace("YYYY","9999")},[e,r])(),h=u.useCallback((p,F,Me,fe)=>{let a=p;if(i&&(a=i(p,F,Me,fe)),!n)return a;const he=a.value,o=r||(new RegExp("/").test(e)?"/":/-/.test(e)?"-":"."),C=he.split(o);if(C.length<2)return a;let D,l,t;e.startsWith("MM")?[l,t,D]=C:e.startsWith("DD")?[t,l,D]=C:e.startsWith("YYYY")&&([D,l,t]=C);const c=l?parseInt(l,10):NaN,k=t?parseInt(t,10):NaN,ve=D?parseInt(D,10):NaN;if(!isNaN(c)&&c>12&&l&&(a.value=a.value.replace(new RegExp(`${l.padStart(2,"0")}${o}`),`12${o}`)),!isNaN(c)&&!isNaN(k)&&c>0&&c<=12){const W=new Date(ve||new Date().getFullYear(),c,0).getDate();k>W&&(e.indexOf("DD")<e.indexOf("MM")?t&&(a.value=a.value.replace(new RegExp(`^${t.padStart(2,"0")}${o}`),`${W.toString().padStart(2,"0")}${o}`)):t&&(a.value=a.value.replace(new RegExp(`${o}${t.padStart(2,"0")}($|${o})`),`${o}${W.toString().padStart(2,"0")}$1`)))}return a},[e,r,n,i]),v=p=>{Y.onChange&&Y.onChange(p)},{format:_,separator:$,enableDateValidation:be,error:ue,helperText:Ye,errorColor:De,helperTextStyle:me,...ge}=Y;return d.createElement(Ce,{mask:s,placeholder:s.replace(/9/g,"_"),inputMode:"numeric",autoComplete:"off",beforeMaskedValueChange:h,onChange:v,error:ue,helperText:Ye,errorColor:De,helperTextStyle:me,...ge,ref:N})},M=u.forwardRef(Ve);M.displayName="DateInput";M.__docgenInfo={description:"",methods:[],displayName:"DateInput",props:{format:{defaultValue:{value:"'MM/DD/YYYY'",computed:!1},required:!1},enableDateValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const Ie={title:"Components/DateInput",component:M,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"],description:"Date format to use"},separator:{control:"select",options:["/","-","."],description:"Character to separate date parts"},enableDateValidation:{control:"boolean",description:"Enable validation of dates (e.g., prevent invalid dates like 02/31/2025)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},V={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0}},b={args:{format:"DD/MM/YYYY",separator:"/",enableDateValidation:!0}},E={args:{format:"YYYY-MM-DD",separator:"-",enableDateValidation:!0}},S={args:{format:"DD/MM/YYYY",separator:".",enableDateValidation:!0}},I={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!1}},m=()=>{const[e,r]=u.useState("");return d.createElement("div",null,d.createElement(M,{format:"MM/DD/YYYY",separator:"/",value:e,onChange:n=>r(n.target.value),enableDateValidation:!0}),d.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))},x={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,error:!0,helperText:"Please enter a valid date"}},y={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,error:!0,helperText:"Please enter a valid date",errorColor:"#ff6b6b"}},T={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0,helperText:"Enter date in MM/DD/YYYY format"}},g=()=>{const[e,r]=u.useState(""),[n,i]=u.useState(!1),Y=N=>{const f=N.target.value;if(r(f),f.length===10){const s=f.split("/");if(s.length===3){const h=parseInt(s[0],10),v=parseInt(s[1],10),_=parseInt(s[2],10),$=h>=1&&h<=12&&v>=1&&v<=31&&_>=1900&&_<=2100;i(!$)}}else i(!1)};return d.createElement("div",null,d.createElement(M,{format:"MM/DD/YYYY",separator:"/",value:e,onChange:Y,enableDateValidation:!0,error:n,helperText:n?"Invalid date format":"Enter date in MM/DD/YYYY format"}))};m.__docgenInfo={description:"",methods:[],displayName:"ControlledDateInput"};g.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var R,w,O;V.parameters={...V.parameters,docs:{...(R=V.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(O=(w=V.parameters)==null?void 0:w.docs)==null?void 0:O.source}}};var P,H,q;b.parameters={...b.parameters,docs:{...(P=b.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(q=(H=b.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var z,U,B;E.parameters={...E.parameters,docs:{...(z=E.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    format: 'YYYY-MM-DD',
    separator: '-',
    enableDateValidation: true
  }
}`,...(B=(U=E.parameters)==null?void 0:U.docs)==null?void 0:B.source}}};var L,j,A;S.parameters={...S.parameters,docs:{...(L=S.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '.',
    enableDateValidation: true
  }
}`,...(A=(j=S.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var G,J,K;I.parameters={...I.parameters,docs:{...(G=I.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: false
  }
}`,...(K=(J=I.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var Q,X,Z;m.parameters={...m.parameters,docs:{...(Q=m.parameters)==null?void 0:Q.docs,source:{originalSource:`() => {
  const [date, setDate] = useState('');
  return <div>
      <DateInput format="MM/DD/YYYY" separator="/" value={date} onChange={e => setDate(e.target.value)} enableDateValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {date}</div>
    </div>;
}`,...(Z=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,ae,te;x.parameters={...x.parameters,docs:{...(ee=x.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date'
  }
}`,...(te=(ae=x.parameters)==null?void 0:ae.docs)==null?void 0:te.source}}};var re,oe,ne;y.parameters={...y.parameters,docs:{...(re=y.parameters)==null?void 0:re.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    error: true,
    helperText: 'Please enter a valid date',
    errorColor: '#ff6b6b'
  }
}`,...(ne=(oe=y.parameters)==null?void 0:oe.docs)==null?void 0:ne.source}}};var se,le,ie;T.parameters={...T.parameters,docs:{...(se=T.parameters)==null?void 0:se.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true,
    helperText: 'Enter date in MM/DD/YYYY format'
  }
}`,...(ie=(le=T.parameters)==null?void 0:le.docs)==null?void 0:ie.source}}};var pe,ce,de;g.parameters={...g.parameters,docs:{...(pe=g.parameters)==null?void 0:pe.docs,source:{originalSource:`() => {
  const [date, setDate] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);

    // Simple validation: check if the date is complete and valid
    if (value.length === 10) {
      const parts = value.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        const isValid = month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1900 && year <= 2100;
        setError(!isValid);
      }
    } else {
      setError(false);
    }
  };
  return <div>
      <DateInput format="MM/DD/YYYY" separator="/" value={date} onChange={handleChange} enableDateValidation={true} error={error} helperText={error ? 'Invalid date format' : 'Enter date in MM/DD/YYYY format'} />
    </div>;
}`,...(de=(ce=g.parameters)==null?void 0:ce.docs)==null?void 0:de.source}}};const xe=["USDateFormat","EuropeanDateFormat","ISODateFormat","DotSeparator","WithoutValidation","ControlledDateInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{m as ControlledDateInput,S as DotSeparator,b as EuropeanDateFormat,E as ISODateFormat,V as USDateFormat,y as WithCustomErrorColor,x as WithError,T as WithHelperText,g as WithValidation,I as WithoutValidation,xe as __namedExportsOrder,Ie as default};
