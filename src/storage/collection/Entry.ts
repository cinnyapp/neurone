export type Indexes = string;

export type PermitiveKeyValue = number | string;
export type KeyValue = PermitiveKeyValue | PermitiveKeyValue[];

export type Entry<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  Struct extends Record<PrimaryKey, KeyValue> &
    Record<IndexKeys, KeyValue> &
    Record<string, unknown> = Record<PrimaryKey, KeyValue> &
    Record<IndexKeys, KeyValue>,
> = Struct;
