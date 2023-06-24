function Header({ title }) {
  return (
    <header>
      <h2>{title ? title : "홈"}</h2>
    </header>
  );
}

export default Header;
