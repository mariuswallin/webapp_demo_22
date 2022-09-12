type ButtonProps = {
  label: string;
  css: string;
};

export default function Button(props: ButtonProps) {
  const { label, css } = props;
  return (
    <button type="button" className={css}>
      {label}
    </button>
  );
}
