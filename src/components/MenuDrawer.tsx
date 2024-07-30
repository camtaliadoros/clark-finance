type MenuDrawerProps = {
  isOpen: boolean;
};

export const MenuDrawer = ({ isOpen }: MenuDrawerProps) => {
  return (
    <div
      className={`bg-mediumblue w-full h-full absolute top-0 left-0 opacity-90 transition ${
        isOpen ? null : 'translate-x-full'
      }`}
    ></div>
  );
};
