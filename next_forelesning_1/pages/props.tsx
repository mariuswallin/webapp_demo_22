import { CardWithProps } from "../components/Card";

const content = [
  { id: "1", title: "Tittel 1", text: "Text 1", label: "Knapp 1", css: "test" },
  { id: "2", title: "Tittel 2", text: "Text 2", label: "Knapp 2", css: "test" },
  { id: "3", title: "Tittel 3", text: "Text 3", label: "Knapp 3", css: "test" },
];

export default function DemoWithProps() {
  return (
    <section>
      {/* {content.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
        </div>
      ))} */}

      {content.map((item) => (
        <CardWithProps
          key={item.id}
          title={item.title}
          text={item.text}
          label={item.label}
          css={item.css}
        />
      ))}
    </section>
  );
}
