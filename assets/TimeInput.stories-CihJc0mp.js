import{r as f,R as h}from"./index-DmM0KDA7.js";import{M as ae}from"./MaskField-By_mZeOG.js";const te=({format:t="12h",showSeconds:n=!1,separator:a=":",enableTimeValidation:V=!0,beforeMaskedValueChange:v,...S},Q)=>{const b=f.useCallback(()=>{const r=t==="12h",o=`99${a}99`;return n?`${o}${a}99${r?" aa":""}`:r?`${o} aa`:o},[t,n,a])(),U=f.useCallback((r,C,o,ee)=>{let e=r;if(v&&(e=v(r,C,o,ee)),!V)return e;const _=e.value;let i;if(t==="12h"?i=_.match(new RegExp(`^(\\d{1,2})\\${a}(\\d{1,2})(?:\\${a}(\\d{1,2}))?(\\s+([aApP][mM]))?`)):i=_.match(new RegExp(`^(\\d{1,2})\\${a}(\\d{1,2})(?:\\${a}(\\d{1,2}))?`)),!i)return e;const[,$,T,w,,I]=i,x=t==="24h"?23:12,E=parseInt($,10);return E>x?e.value=e.value.replace(new RegExp(`^${$.padStart(2,"0")}`),x.toString().padStart(2,"0")):t==="12h"&&E===0&&(e.value=e.value.replace(/^00/,"12")),T&&parseInt(T,10)>59&&(e.value=e.value.replace(new RegExp(`\\${a}${T.padStart(2,"0")}`),`${a}59`)),w&&parseInt(w,10)>59&&(e.value=e.value.replace(new RegExp(`\\${a}${w.padStart(2,"0")}\\s`),`${a}59 `)),t==="12h"&&I&&(["am","pm","AM","PM"].includes(I)||(e.value=e.value.replace(/\s+[a-zA-Z]+$/," AM"))),e},[t,a,V,v]),X=r=>{S.onChange&&S.onChange(r)},{format:oe,showSeconds:se,separator:ne,enableTimeValidation:ie,...Y}=S;return h.createElement(ae,{mask:b,placeholder:b.replace(/9/g,"_").replace(/a/g,"_"),inputMode:"numeric",autoComplete:"off",beforeMaskedValueChange:U,formatChars:{9:"[0-9]",a:"[aApP]"},onChange:X,...Y,ref:Q})},g=f.forwardRef(te);g.displayName="TimeInput";g.__docgenInfo={description:"",methods:[],displayName:"TimeInput",props:{format:{defaultValue:{value:"'12h'",computed:!1},required:!1},showSeconds:{defaultValue:{value:"false",computed:!1},required:!1},separator:{defaultValue:{value:"':'",computed:!1},required:!1},enableTimeValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const ue={title:"Components/TimeInput",component:g,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["12h","24h"],description:"Time format to use (12-hour or 24-hour)"},showSeconds:{control:"boolean",description:"Whether to show seconds in the time input"},separator:{control:"select",options:[":",".","-"],description:"Character to separate time parts"},enableTimeValidation:{control:"boolean",description:"Enable validation of time values (e.g., prevent invalid times like 25:70)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},l={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0}},c={args:{format:"24h",showSeconds:!1,separator:":",enableTimeValidation:!0}},u={args:{format:"12h",showSeconds:!0,separator:":",enableTimeValidation:!0}},m={args:{format:"24h",showSeconds:!0,separator:":",enableTimeValidation:!0}},d={args:{format:"24h",showSeconds:!1,separator:".",enableTimeValidation:!0}},p={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!1}},s=()=>{const[t,n]=f.useState("");return h.createElement("div",null,h.createElement(g,{format:"12h",showSeconds:!1,separator:":",value:t,onChange:a=>n(a.target.value),enableTimeValidation:!0}),h.createElement("div",{style:{marginTop:"10px"}},"Current value: ",t))};s.__docgenInfo={description:"",methods:[],displayName:"ControlledTimeInput"};var M,k,F;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(F=(k=l.parameters)==null?void 0:k.docs)==null?void 0:F.source}}};var H,R,y;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(y=(R=c.parameters)==null?void 0:R.docs)==null?void 0:y.source}}};var W,A,q;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(q=(A=u.parameters)==null?void 0:A.docs)==null?void 0:q.source}}};var P,N,z;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(z=(N=m.parameters)==null?void 0:N.docs)==null?void 0:z.source}}};var B,O,Z;d.parameters={...d.parameters,docs:{...(B=d.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: '.',
    enableTimeValidation: true
  }
}`,...(Z=(O=d.parameters)==null?void 0:O.docs)==null?void 0:Z.source}}};var j,D,G;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: false
  }
}`,...(G=(D=p.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var J,K,L;s.parameters={...s.parameters,docs:{...(J=s.parameters)==null?void 0:J.docs,source:{originalSource:`() => {
  const [time, setTime] = useState('');
  return <div>
      <TimeInput format="12h" showSeconds={false} separator=":" value={time} onChange={e => setTime(e.target.value)} enableTimeValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {time}</div>
    </div>;
}`,...(L=(K=s.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};const me=["Format12Hour","Format24Hour","WithSeconds","Format24HourWithSeconds","CustomSeparator","WithoutValidation","ControlledTimeInput"];export{s as ControlledTimeInput,d as CustomSeparator,l as Format12Hour,c as Format24Hour,m as Format24HourWithSeconds,u as WithSeconds,p as WithoutValidation,me as __namedExportsOrder,ue as default};
