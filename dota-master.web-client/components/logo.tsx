import { SiDota2 } from "react-icons/si";

const Logo = () => {

    return (
        <a href="/" className="absolute left-7 top-7 z-10">
            <div className="flex flex-row">
                <SiDota2 size={42} className="mr-3"/>
                <h1 className="text-5xl font-bold">
                    DotaMaster
                </h1>
            </div>
        </a>
    )
}

export default Logo