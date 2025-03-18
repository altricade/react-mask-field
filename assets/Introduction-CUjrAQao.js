import{j as e,M as s}from"./index-eyt1KkR_.js";import{useMDXComponents as r}from"./index-CePRvBtH.js";import"./iframe-D9qXN5eK.js";import"./index-DmM0KDA7.js";import"./index-nLeaPAJ8.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";function t(i){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Introduction"}),`
`,e.jsx(n.h1,{id:"react-mask-field",children:"React Mask Field"}),`
`,e.jsx(n.p,{children:"A lightweight, flexible input masking library for React applications built with TypeScript. This library provides customizable masked input components with type safety and modern React practices."}),`
`,e.jsx(n.h2,{id:"features",children:"Features"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["🚀 ",e.jsx(n.strong,{children:"Modern React API"})," - Based on hooks and functional components"]}),`
`,e.jsxs(n.li,{children:["📦 ",e.jsx(n.strong,{children:"Lightweight"})," - No external dependencies"]}),`
`,e.jsxs(n.li,{children:["🔒 ",e.jsx(n.strong,{children:"Type-safe"})," - Written in TypeScript with full type definitions"]}),`
`,e.jsxs(n.li,{children:["🧰 ",e.jsx(n.strong,{children:"Specialized Components"})," - Components for common use cases like phone numbers, dates, and credit cards"]}),`
`,e.jsxs(n.li,{children:["🎨 ",e.jsx(n.strong,{children:"Customizable"})," - Flexible formatting options"]}),`
`,e.jsxs(n.li,{children:["⚛️ ",e.jsx(n.strong,{children:"Compatible"})," - Works with React 16.8+ including React 18 and React 19"]}),`
`,e.jsxs(n.li,{children:["🛡️ ",e.jsx(n.strong,{children:"Clean DOM"})," - Properly filters out non-standard props from DOM elements"]}),`
`]}),`
`,e.jsx(n.h2,{id:"components",children:"Components"}),`
`,e.jsx(n.p,{children:"This library includes the following components:"}),`
`,e.jsx(n.h3,{id:"maskfield",children:"MaskField"}),`
`,e.jsx(n.p,{children:"The core component that provides input masking functionality. You can define custom mask patterns using:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"9"})," for digits"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"a"})," for letters"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"*"})," for alphanumeric characters"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<MaskField mask="(999) 999-9999" placeholder="(___) ___-____" />
`})}),`
`,e.jsx(n.h3,{id:"phoneinput",children:"PhoneInput"}),`
`,e.jsx(n.p,{children:"A specialized component for phone number input with country code support."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<PhoneInput countryCode="US" />
`})}),`
`,e.jsx(n.h3,{id:"dateinput",children:"DateInput"}),`
`,e.jsx(n.p,{children:"A component for date input with format options and validation."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<DateInput format="MM/DD/YYYY" separator="/" enableDateValidation={true} />
`})}),`
`,e.jsx(n.h3,{id:"timeinput",children:"TimeInput"}),`
`,e.jsx(n.p,{children:"A component for time input with 12-hour or 24-hour format options."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<TimeInput format="12h" showSeconds={false} separator=":" />
`})}),`
`,e.jsx(n.h3,{id:"creditcardinput",children:"CreditCardInput"}),`
`,e.jsx(n.p,{children:"A component for credit card input with automatic card type detection."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`<CreditCardInput detectCardType={true} />
`})}),`
`,e.jsx(n.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @altricade/react-mask-field
# or
yarn add @altricade/react-mask-field
# or
pnpm add @altricade/react-mask-field
`})}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.p,{children:"Import the components you need:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { MaskField, PhoneInput, DateInput, TimeInput, CreditCardInput } from '@altricade/react-mask-field';
`})}),`
`,e.jsx(n.h2,{id:"github-repository",children:"GitHub Repository"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"https://github.com/altricade/react-mask-field",rel:"nofollow",children:"https://github.com/altricade/react-mask-field"})})]})}function m(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{m as default};
