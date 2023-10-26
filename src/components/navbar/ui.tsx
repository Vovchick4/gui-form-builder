import Link from 'next/link'

export default function Navbar() {
    return (
        <div className="px-4 py-3 w-full text-white bg-slate-900">
            <div className="mx-auto flex items-center justify-between max-w-7xl w-full">
                <div>
                    BuilderFormUI
                </div>
                <ul className="flex gap-4">
                    <li><Link href={"/"}>Home</Link></li>
                    <li><Link href={"/form-builder"}>Form builder</Link></li>
                    <li><Link href={"/settings"}>Settings</Link></li>
                </ul>
            </div>
        </div>
    )
}
