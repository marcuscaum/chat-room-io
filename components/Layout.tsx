const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div className="grid justify-items-stretch h-screen items-center bg-gray-100">
      {children}
    </div>
  );
};

export default Layout;
