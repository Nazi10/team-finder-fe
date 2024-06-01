import { Footer as AntdFooter } from "antd/es/layout/layout";
export default function Footer() {
  return (
    <AntdFooter className=" bg-yellow-400 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Team Finder. All rights reserved.</p>
      </div>
    </AntdFooter>
  );
}
