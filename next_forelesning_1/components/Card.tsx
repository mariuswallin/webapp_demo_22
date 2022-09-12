import Body from "./Body";
import Button from "./Button";
import Heading from "./Heading";

export default function Card() {
  return (
    <>
      <Heading title="Tittel" />
      <Body text="Tekst" />
      <Button label="Knapp" css="test" />
    </>
  );
}

export function CardWithProps(props: any) {
  const { title, text, label, css } = props;
  return (
    <>
      <Heading title={title} />
      <Body text={text} />
      <Button label={label} css={css} />
    </>
  );
}

type CardWithChildren = {
  children: React.ReactNode;
};

export function CardWithChildren(props: CardWithChildren) {
  const { children } = props;
  return <div className="wrapper">{children}</div>;
}
