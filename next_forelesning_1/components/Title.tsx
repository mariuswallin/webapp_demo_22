// const props = {
//   title: "Forsiden",
//   author: "Marius",
//   today: "Monday",
//   ...
// };

type TitleProps = {
  title: string;
  author: "Marius" | "Kåre";
  today?: "Monday";
};

export default function Title(props: TitleProps) {
  const { title, author } = props;
  return <h1 className="title">{title}</h1>;
}
