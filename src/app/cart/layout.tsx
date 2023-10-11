type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <h1 className="bold text-[48px] my-5">Корзина</h1>
      <div className="bg-white w-full h-[580px] rounded-xl p-5">{children}</div>
    </>
  );
};

export default Layout;
