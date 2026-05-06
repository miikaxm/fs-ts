interface HeaderProps {
  header: string;
}

export const Header = (props: HeaderProps) => {
  return <h1>{props.header}</h1>
}