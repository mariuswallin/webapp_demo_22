type DescriptionProps = {
  text: string;
};

export default function Description(props: DescriptionProps) {
  const { text } = props;

  return <p>{text}</p>;
}
