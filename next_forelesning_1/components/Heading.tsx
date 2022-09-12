type HeadingProps = {
  title: string;
};

export default function Heading(props: HeadingProps) {
  const { title } = props;
  return <h1>{title}</h1>;
}
