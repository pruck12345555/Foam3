import Profile from "./Profile";
import SearchBar from "./SearchBar";

export default function OrderHistoryTopBar( { 
    onClickPfp
} : { 
    onClickPfp : () => void;
} ) {
    return (
        <div className="flex items-center justify-between h-14 bg-blue-400 px-4">
            {/* Left spacer */}
            <div className="flex-1" />

            {/* Right - Profile */}
            <div className="flex flex-1 justify-end items-center">
                <Profile onClickPfp={onClickPfp} />
            </div>
        </div>
    );
}