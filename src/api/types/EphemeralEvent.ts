export type EphemeralEvent<Content extends object = object> = {
  content: Content;
  type: string;
};

export type TypingContent = {
  user_ids: string[];
};

export type TypingEphemeralEvent = EphemeralEvent<TypingContent> & {
  type: "m.typing";
};

export type Receipt = {
  thread_id?: string;
  ts?: number;
};

export type ReceiptContent = Record<
  string,
  {
    "m.read"?: Record<string, Receipt>;
    "m.read.private"?: Record<string, Receipt>;
  }
>;

export type ReceiptEphemeralEvent = EphemeralEvent<ReceiptContent> & {
  type: "m.receipt";
};
