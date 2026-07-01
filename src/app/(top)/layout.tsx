type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
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
