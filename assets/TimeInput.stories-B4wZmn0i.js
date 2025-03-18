import{r as n,R as s}from"./index-DmM0KDA7.js";import{M as Ve}from"./MaskField-C2xlNsk4.js";const we=({format:r="12h",showSeconds:o=!1,separator:e=":",enableTimeValidation:i=!0,beforeMaskedValueChange:l,...m},c)=>{const H=n.useCallback(()=>{const t=r==="12h",u=`99${e}99`;return o?`${u}${e}99${t?" aa":""}`:t?`${u} aa`:u},[r,o,e])(),he=n.useCallback((t,_,u,be)=>{let a=t;if(l&&(a=l(t,_,u,be)),!i)return a;const $=a.value;let f;if(r==="12h"?f=$.match(new RegExp(`^(\\d{1,2})\\${e}(\\d{1,2})(?:\\${e}(\\d{1,2}))?(\\s+([aApP][mM]))?`)):f=$.match(new RegExp(`^(\\d{1,2})\\${e}(\\d{1,2})(?:\\${e}(\\d{1,2}))?`)),!f)return a;const[,I,x,E,,W]=f,P=r==="24h"?23:12,R=parseInt(I,10);return R>P?a.value=a.value.replace(new RegExp(`^${I.padStart(2,"0")}`),P.toString().padStart(2,"0")):r==="12h"&&R===0&&(a.value=a.value.replace(/^00/,"12")),x&&parseInt(x,10)>59&&(a.value=a.value.replace(new RegExp(`\\${e}${x.padStart(2,"0")}`),`${e}59`)),E&&parseInt(E,10)>59&&(a.value=a.value.replace(new RegExp(`\\${e}${E.padStart(2,"0")}\\s`),`${e}59 `)),r==="12h"&&W&&(["am","pm","AM","PM"].includes(W)||(a.value=a.value.replace(/\s+[a-zA-Z]+$/," AM"))),a},[r,e,i,l]),fe=t=>{m.onChange&&m.onChange(t)},{format:Me,showSeconds:xe,separator:Ee,enableTimeValidation:He,error:ge,helperText:Te,errorColor:ve,helperTextStyle:Se,...Ce}=m;return s.createElement(Ve,{mask:H,placeholder:H.replace(/9/g,"_").replace(/a/g,"_"),inputMode:"numeric",autoComplete:"off",beforeMaskedValueChange:he,formatChars:{9:"[0-9]",a:"[aApP]"},onChange:fe,error:ge,helperText:Te,errorColor:ve,helperTextStyle:Se,...Ce,ref:c})},h=n.forwardRef(we);h.displayName="TimeInput";h.__docgenInfo={description:"",methods:[],displayName:"TimeInput",props:{format:{defaultValue:{value:"'12h'",computed:!1},required:!1},showSeconds:{defaultValue:{value:"false",computed:!1},required:!1},separator:{defaultValue:{value:"':'",computed:!1},required:!1},enableTimeValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const Ie={title:"Components/TimeInput",component:h,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["12h","24h"],description:"Time format to use (12-hour or 24-hour)"},showSeconds:{control:"boolean",description:"Whether to show seconds in the time input"},separator:{control:"select",options:[":",".","-"],description:"Character to separate time parts"},enableTimeValidation:{control:"boolean",description:"Enable validation of time values (e.g., prevent invalid times like 25:70)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},g={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0}},T={args:{format:"24h",showSeconds:!1,separator:":",enableTimeValidation:!0}},v={args:{format:"12h",showSeconds:!0,separator:":",enableTimeValidation:!0}},S={args:{format:"24h",showSeconds:!0,separator:":",enableTimeValidation:!0}},C={args:{format:"24h",showSeconds:!1,separator:".",enableTimeValidation:!0}},b={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!1}},d=()=>{const[r,o]=n.useState("");return s.createElement("div",null,s.createElement(h,{format:"12h",showSeconds:!1,separator:":",value:r,onChange:e=>o(e.target.value),enableTimeValidation:!0}),s.createElement("div",{style:{marginTop:"10px"}},"Current value: ",r))},V={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,error:!0,helperText:"Please enter a valid time"}},w={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,error:!0,helperText:"Please enter a valid time",errorColor:"#ff6b6b"}},M={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,helperText:"Enter time in HH:MM format"}},p=()=>{const[r,o]=n.useState(""),[e,i]=n.useState(!1),l=m=>{const c=m.target.value;o(c),c.length>=8?i(!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?[AaPp][Mm]$/.test(c)):i(!1)};return s.createElement("div",null,s.createElement(h,{format:"12h",showSeconds:!1,separator:":",value:r,onChange:l,enableTimeValidation:!0,error:e,helperText:e?"Invalid time format":"Enter time in HH:MM AM/PM format"}))};d.__docgenInfo={description:"",methods:[],displayName:"ControlledTimeInput"};p.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var k,A,y;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(y=(A=g.parameters)==null?void 0:A.docs)==null?void 0:y.source}}};var F,q,N;T.parameters={...T.parameters,docs:{...(F=T.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(N=(q=T.parameters)==null?void 0:q.docs)==null?void 0:N.source}}};var z,B,L;v.parameters={...v.parameters,docs:{...(z=v.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(L=(B=v.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var O,Z,j;S.parameters={...S.parameters,docs:{...(O=S.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(j=(Z=S.parameters)==null?void 0:Z.docs)==null?void 0:j.source}}};var D,G,J;C.parameters={...C.parameters,docs:{...(D=C.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: '.',
    enableTimeValidation: true
  }
}`,...(J=(G=C.parameters)==null?void 0:G.docs)==null?void 0:J.source}}};var K,Q,U;b.parameters={...b.parameters,docs:{...(K=b.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: false
  }
}`,...(U=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,ee;d.parameters={...d.parameters,docs:{...(X=d.parameters)==null?void 0:X.docs,source:{originalSource:`() => {
  const [time, setTime] = useState('');
  return <div>
      <TimeInput format="12h" showSeconds={false} separator=":" value={time} onChange={e => setTime(e.target.value)} enableTimeValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {time}</div>
    </div>;
}`,...(ee=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:ee.source}}};var ae,re,te;V.parameters={...V.parameters,docs:{...(ae=V.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time'
  }
}`,...(te=(re=V.parameters)==null?void 0:re.docs)==null?void 0:te.source}}};var oe,se,ne;w.parameters={...w.parameters,docs:{...(oe=w.parameters)==null?void 0:oe.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time',
    errorColor: '#ff6b6b'
  }
}`,...(ne=(se=w.parameters)==null?void 0:se.docs)==null?void 0:ne.source}}};var ie,le,me;M.parameters={...M.parameters,docs:{...(ie=M.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    helperText: 'Enter time in HH:MM format'
  }
}`,...(me=(le=M.parameters)==null?void 0:le.docs)==null?void 0:me.source}}};var ce,ue,de;p.parameters={...p.parameters,docs:{...(ce=p.parameters)==null?void 0:ce.docs,source:{originalSource:`() => {
  const [time, setTime] = useState('');
  const [error, setError] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTime(value);

    // Simple validation: check if the time format is valid
    if (value.length >= 8) {
      // At least HH:MM AM/PM
      const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\\s?[AaPp][Mm]$/;
      setError(!timeRegex.test(value));
    } else {
      setError(false);
    }
  };
  return <div>
      <TimeInput format="12h" showSeconds={false} separator=":" value={time} onChange={handleChange} enableTimeValidation={true} error={error} helperText={error ? 'Invalid time format' : 'Enter time in HH:MM AM/PM format'} />
    </div>;
}`,...(de=(ue=p.parameters)==null?void 0:ue.docs)==null?void 0:de.source}}};const We=["Format12Hour","Format24Hour","WithSeconds","Format24HourWithSeconds","CustomSeparator","WithoutValidation","ControlledTimeInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{d as ControlledTimeInput,C as CustomSeparator,g as Format12Hour,T as Format24Hour,S as Format24HourWithSeconds,w as WithCustomErrorColor,V as WithError,M as WithHelperText,v as WithSeconds,p as WithValidation,b as WithoutValidation,We as __namedExportsOrder,Ie as default};
