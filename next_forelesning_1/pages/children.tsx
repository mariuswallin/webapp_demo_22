import Body from "../components/Body";
import Button from "../components/Button";
import { CardWithChildren } from "../components/Card";
import Heading from "../components/Heading";

export default function DemoWithChildren() {
  return (
    <CardWithChildren>
      <section>
        <Heading title="Tittel 1" />
        <Body text="Tekst 1" />
        <Button label="Knapp 1" css="test" />
      </section>
      <section>
        <Heading title="Tittel 2" />
        <Body text="Tekst 2" />
        <Button label="Knapp 2" css="test" />
      </section>
      <section>
        <Heading title="Tittel 3" />
        <Body text="Tekst 3" />
        <Button label="Knapp 3" css="test" />
      </section>
    </CardWithChildren>
  );
}
