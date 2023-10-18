import OrderButton from '@/components/OrderButton';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <h1 className="bold text-[48px] my-5">Корзина</h1>
      <div className="bg-white w-full rounded-xl p-5 mb-5">{children}</div>
      <OrderButton />
    </>
  );
};

export default Layout;
