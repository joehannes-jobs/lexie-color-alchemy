// Range number type via tail recursion elimination
// eslint-disable-next-line max-len
// https://stackoverflow.com/questions/39494689/is-it-possible-to-restrict-number-to-a-certain-range/70307091#70307091
type TEnumerate<
  N extends number,
  Acc extends number[] = []
> = Acc["length"] extends N
  ? Acc[number]
  : TEnumerate<N, [...Acc, Acc["length"]]>;
export type TRange<FROM extends number, TO extends number> = Exclude<
  TEnumerate<TO>,
  TEnumerate<FROM>
>;

export type TColorComponent = TRange<0, 256>;
export type TColor = {
  r: TColorComponent;
  g: TColorComponent;
  b: TColorComponent;
};
