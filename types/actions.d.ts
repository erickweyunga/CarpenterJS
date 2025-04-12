// Auto-generated from action_map.json
// Generated on 1744452841.0203502

import { ActionTypeMap } from "@carpenter/actions";

// Type definitions
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}


// Action type mapping
declare module '@carpenter/actions' {
  interface ActionTypeMap {
    "blog/send": { input: {}; output: void; };
    "contact/submit": { input: ContactForm; output: void; };
    "contact/send": { input: {}; output: void; };
  }
}