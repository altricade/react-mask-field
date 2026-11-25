import{r as m,R as o}from"./index-DmM0KDA7.js";import{M as le}from"./MaskField-DcSL4R4g.js";import{a as me}from"./dateTime-rWvpcW7I.js";const ce=Object.freeze({9:"[0-9]",a:"[aApP]",m:"[mM]"});function ue(e,r,a){const t=r?`99${a}99${a}99`:`99${a}99`;return e==="12h"?`${t} am`:t}const de=({format:e="12h",showSeconds:r=!1,separator:a=":",enableTimeValidation:t=!0,beforeMaskedValueChange:s,...b},n)=>{const C=ue(e,r,a),te=m.useCallback((w,oe,se,ne)=>{const V=s?s(w,oe,se,ne):w;if(!t)return V;const ie=V.value.replace(/[^0-9A-Za-z]/g,"");return{...V,value:me(ie,e,r)}},[s,t,e,r]);return o.createElement(le,{inputMode:e==="12h"?"text":"numeric",autoComplete:"off",formatChars:ce,...b,mask:C,beforeMaskedValueChange:te,ref:n})},c=m.forwardRef(de);c.displayName="TimeInput";c.__docgenInfo={description:"",methods:[],displayName:"TimeInput",props:{format:{defaultValue:{value:"'12h'",computed:!1},required:!1},showSeconds:{defaultValue:{value:"false",computed:!1},required:!1},separator:{defaultValue:{value:"':'",computed:!1},required:!1},enableTimeValidation:{defaultValue:{value:"true",computed:!1},required:!1}}};const ge={title:"Components/TimeInput",component:c,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{format:{control:"select",options:["12h","24h"],description:"Time format to use (12-hour or 24-hour)"},showSeconds:{control:"boolean",description:"Whether to show seconds in the time input"},separator:{control:"select",options:[":",".","-"],description:"Character to separate time parts"},enableTimeValidation:{control:"boolean",description:"Enable validation of time values (e.g., prevent invalid times like 25:70)"},value:{control:"text",description:"The current value of the input"},onChange:{action:"changed",description:"Callback when the input value changes"}}},u={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0}},d={args:{format:"24h",showSeconds:!1,separator:":",enableTimeValidation:!0}},p={args:{format:"12h",showSeconds:!0,separator:":",enableTimeValidation:!0}},h={args:{format:"24h",showSeconds:!0,separator:":",enableTimeValidation:!0}},f={args:{format:"24h",showSeconds:!1,separator:".",enableTimeValidation:!0}},g={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!1}},i=()=>{const[e,r]=m.useState("");return o.createElement("div",null,o.createElement(c,{format:"12h",showSeconds:!1,separator:":",value:e,onChange:a=>{r(a.target.value)},enableTimeValidation:!0}),o.createElement("div",{style:{marginTop:"10px"}},"Current value: ",e))},T={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,error:!0,helperText:"Please enter a valid time"}},v={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,error:!0,helperText:"Please enter a valid time",errorColor:"#ff6b6b"}},S={args:{format:"12h",showSeconds:!1,separator:":",enableTimeValidation:!0,helperText:"Enter time in HH:MM format"}},l=()=>{const[e,r]=m.useState(""),[a,t]=m.useState(!1),s=b=>{const n=b.target.value;r(n),n.length>=8?t(!/^(0?[1-9]|1[0-2]):[0-5][0-9]\s?[AaPp][Mm]$/.test(n)):t(!1)};return o.createElement("div",null,o.createElement(c,{format:"12h",showSeconds:!1,separator:":",value:e,onChange:s,enableTimeValidation:!0,error:a,helperText:a?"Invalid time format":"Enter time in HH:MM AM/PM format"}))};i.__docgenInfo={description:"",methods:[],displayName:"ControlledTimeInput"};l.__docgenInfo={description:"",methods:[],displayName:"WithValidation"};var M,E,x;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(x=(E=u.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var H,I,W;d.parameters={...d.parameters,docs:{...(H=d.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(W=(I=d.parameters)==null?void 0:I.docs)==null?void 0:W.source}}};var R,A,P;p.parameters={...p.parameters,docs:{...(R=p.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(P=(A=p.parameters)==null?void 0:A.docs)==null?void 0:P.source}}};var _,y,F;h.parameters={...h.parameters,docs:{...(_=h.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: true,
    separator: ':',
    enableTimeValidation: true
  }
}`,...(F=(y=h.parameters)==null?void 0:y.docs)==null?void 0:F.source}}};var k,$,q;f.parameters={...f.parameters,docs:{...(k=f.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    format: '24h',
    showSeconds: false,
    separator: '.',
    enableTimeValidation: true
  }
}`,...(q=($=f.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var N,O,z;g.parameters={...g.parameters,docs:{...(N=g.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: false
  }
}`,...(z=(O=g.parameters)==null?void 0:O.docs)==null?void 0:z.source}}};var j,B,L;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`() => {
  const [time, setTime] = useState('');
  return <div>
      <TimeInput format="12h" showSeconds={false} separator=":" value={time} onChange={e => {
      setTime(e.target.value);
    }} enableTimeValidation={true} />
      <div style={{
      marginTop: '10px'
    }}>Current value: {time}</div>
    </div>;
}`,...(L=(B=i.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var Z,D,G;T.parameters={...T.parameters,docs:{...(Z=T.parameters)==null?void 0:Z.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time'
  }
}`,...(G=(D=T.parameters)==null?void 0:D.docs)==null?void 0:G.source}}};var J,K,Q;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    error: true,
    helperText: 'Please enter a valid time',
    errorColor: '#ff6b6b'
  }
}`,...(Q=(K=v.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;S.parameters={...S.parameters,docs:{...(U=S.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    format: '12h',
    showSeconds: false,
    separator: ':',
    enableTimeValidation: true,
    helperText: 'Enter time in HH:MM format'
  }
}`,...(Y=(X=S.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};var ee,ae,re;l.parameters={...l.parameters,docs:{...(ee=l.parameters)==null?void 0:ee.docs,source:{originalSource:`() => {
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
}`,...(re=(ae=l.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const Te=["Format12Hour","Format24Hour","WithSeconds","Format24HourWithSeconds","CustomSeparator","WithoutValidation","ControlledTimeInput","WithError","WithCustomErrorColor","WithHelperText","WithValidation"];export{i as ControlledTimeInput,f as CustomSeparator,u as Format12Hour,d as Format24Hour,h as Format24HourWithSeconds,v as WithCustomErrorColor,T as WithError,S as WithHelperText,p as WithSeconds,l as WithValidation,g as WithoutValidation,Te as __namedExportsOrder,ge as default};
