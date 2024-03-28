import SideNav from "./component/SideNav";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className={`flex`}>
        <SideNav />
        <div className={`w-full`}>
        {children}
        </div>
      </div>
    </>
  );
}
