import { SiDota2 } from "react-icons/si";

const Logo = () => {

    return (
        <a href="/">
            <div className="flex flex-row">
                <SiDota2 size={36} className="mr-3"/>
                <h1 className="text-4xl font-bold">
                    DotaMaster
                </h1>
            </div>
        </a>
    )
}

export default Logo