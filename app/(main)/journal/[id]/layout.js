import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

function Layout({ children }) {
  return (
    <div className="py-8 px-4">
      <div className="pb-2">
        <Link
          href={"/dashboard"}
          className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer flex gap-1 items-center"
        >
          <ArrowLeft /> Back to Dashboard
        </Link>
      </div>

      <Suspense fallback={<BarLoader color="orange" width={"100%"} />}>
        {children}
      </Suspense>
    </div>
  );
}

export default Layout;
