"use client"
import { usePathname } from 'next/navigation';

export default function Page() {
    const pathname = usePathname();

    return (
        <div className="h-[91.5vh]">
            <div className="flex justify-between px-5 py-3">
                Your url is: {pathname}
            </div>
            <p className="text-center">Terms And Condition</p>
        </div>
    );
}
