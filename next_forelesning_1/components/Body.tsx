type BodyProps = {
  text: string;
};

export default function Body(props: BodyProps) {
  const { text } = props;
  return <p>{text}</p>;
}
