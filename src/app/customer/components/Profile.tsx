import Image from "next/image";

export default function Profile( { 
    onClickPfp 
} : { 
    onClickPfp : () => void; 
} ) {
    return (
        <div>
            <Image 
                src="/profile-default.svg"
                alt="Pfp"
                width={40}
                height={40}
                className="mx-auto"
                onClick={onClickPfp}
            />
        </div>
    );
}