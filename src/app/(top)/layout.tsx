type Props = {
  children: React.ReactElement;
  modal: React.ReactElement;
};

const Layout = ({ children, modal }: Props): React.ReactNode => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
