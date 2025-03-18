import{r as f,R as M}from"./index-DmM0KDA7.js";import{M as X}from"./MaskField-By_mZeOG.js";const Z=({format:e="MM/DD/YYYY",separator:o,enableDateValidation:c=!0,beforeMaskedValueChange:h,...S},j)=>{const b=f.useCallback(()=>{const s=o||(new RegExp("/").test(e)?"/":/-/.test(e)?"-":".");return e.replace(/[/\-.]/g,s).replace("MM","99").replace("DD","99").replace("YYYY","9999")},[e,o])(),A=f.useCallback((s,V,J,K)=>{let a=s;if(h&&(a=h(s,V,J,K)),!c)return a;const L=a.value,r=o||(new RegExp("/").test(e)?"/":/-/.test(e)?"-":"."),u=L.split(r);if(u.length<2)return a;let i,n,t;e.startsWith("MM")?[n,t,i]=u:e.startsWith("DD")?[t,n,i]=u:e.startsWith("YYYY")&&([i,n,t]=u);const l=n?parseInt(n,10):NaN,I=t?parseInt(t,10):NaN,Q=i?parseInt(i,10):NaN;if(!isNaN(l)&&l>12&&n&&(a.value=a.value.replace(new RegExp(`${n.padStart(2,"0")}${r}`),`12${r}`)),!isNaN(l)&&!isNaN(I)&&l>0&&l<=12){const C=new Date(Q||new Date().getFullYear(),l,0).getDate();I>C&&(e.indexOf("DD")<e.indexOf("MM")?t&&(a.value=a.value.replace(new RegExp(`^${t.padStart(2,"0")}${r}`),`${C.toString().padStart(2,"0")}${r}`)):t&&(a.value=a.value.replace(new RegExp(`${r}${t.padStart(2,"0")}($|${r})`),`${r}${C.toString().padStart(2,"0")}$1`)))}return a},[e,o,c,h]),G=s=>{S.onChange&&S.onChange(s)},{format:ae,separator:te,enableDateValidation:re,...H}=S;return M.createElement(X,{mask:b,placeholder:b.replace(/9/g,"_"),inputMode:"numeric",autoComplete:"off",beforeMaskedValueChange:A,onChange:G,...H,ref:j})},v=f.forwardRef(Z);v.displayName="DateInput";v.__docgenInfo={description:"",methods:[],displayName:"DateInput",props:{format:{defaultValue:{value:"'MM/DD/YYYY'",computed:!1},required:!1},enableDateValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const se={title:"Components/DateInput",component:v,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["MM/DD/YYYY","DD/MM/YYYY","YYYY-MM-DD"],description:"Date format to use"},separator:{control:"select",options:["/","-","."],description:"Character to separate date parts"},enableDateValidation:{control:"boolean",description:"Enable validation of dates (e.g., prevent invalid dates like 02/31/2025)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},d={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!0}},D={args:{format:"DD/MM/YYYY",separator:"/",enableDateValidation:!0}},Y={args:{format:"YYYY-MM-DD",separator:"-",enableDateValidation:!0}},m={args:{format:"DD/MM/YYYY",separator:".",enableDateValidation:!0}},g={args:{format:"MM/DD/YYYY",separator:"/",enableDateValidation:!1}},p=()=>{const[e,o]=f.useState("");return M.createElement("div",null,M.createElement(v,{format:"MM/DD/YYYY",separator:"/",value:e,onChange:c=>o(c.target.value),enableDateValidation:!0}),M.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))};p.__docgenInfo={description:"",methods:[],displayName:"ControlledDateInput"};var N,x,E;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(E=(x=d.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var $,_,y;D.parameters={...D.parameters,docs:{...($=D.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '/',
    enableDateValidation: true
  }
}`,...(y=(_=D.parameters)==null?void 0:_.docs)==null?void 0:y.source}}};var F,k,w;Y.parameters={...Y.parameters,docs:{...(F=Y.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    format: 'YYYY-MM-DD',
    separator: '-',
    enableDateValidation: true
  }
}`,...(w=(k=Y.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};var R,O,W;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    format: 'DD/MM/YYYY',
    separator: '.',
    enableDateValidation: true
  }
}`,...(W=(O=m.parameters)==null?void 0:O.docs)==null?void 0:W.source}}};var T,q,z;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    format: 'MM/DD/YYYY',
    separator: '/',
    enableDateValidation: false
  }
}`,...(z=(q=g.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var U,B,P;p.parameters={...p.parameters,docs:{...(U=p.parameters)==null?void 0:U.docs,source:{originalSource:`() => {
  const [date, setDate] = useState('');
  return <div>
      <DateInput format="MM/DD/YYYY" separator="/" value={date} onChange={e => setDate(e.target.value)} enableDateValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {date}</div>
    </div>;
}`,...(P=(B=p.parameters)==null?void 0:B.docs)==null?void 0:P.source}}};const le=["USDateFormat","EuropeanDateFormat","ISODateFormat","DotSeparator","WithoutValidation","ControlledDateInput"];export{p as ControlledDateInput,m as DotSeparator,D as EuropeanDateFormat,Y as ISODateFormat,d as USDateFormat,g as WithoutValidation,le as __namedExportsOrder,se as default};
