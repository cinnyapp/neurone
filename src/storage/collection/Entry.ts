export type Indexes = string;

export type PrimitiveKeyValue = number | string;
export type KeyValue = PrimitiveKeyValue | PrimitiveKeyValue[];

export type Entry<
  PrimaryKey extends string,
  IndexKeys extends Indexes = never,
  Struct extends Record<PrimaryKey, KeyValue> &
    Record<IndexKeys, KeyValue> &
    Record<string, unknown> = Record<PrimaryKey, KeyValue> &
    Record<IndexKeys, KeyValue>,
> = Struct;
