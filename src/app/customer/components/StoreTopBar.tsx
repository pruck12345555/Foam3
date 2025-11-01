import Profile from "./Profile";
import SearchBar from "./SearchBar";

export default function StoreTopBar( { 
    onSearch,
    onClickPfp
} : { 
    onSearch : (query : string) => void;
    onClickPfp : () => void;
} ) {
    return (
        <div className="flex items-center justify-between h-14 bg-blue-400 px-4">
            {/* Left spacer */}
            <div className="flex-1" />

            {/* Center - Search Bar */}
            <div className="flex flex-2 justify-center items-center">
                <SearchBar onSearch={onSearch} />
            </div>

            {/* Right - Profile */}
            <div className="flex flex-1 justify-end items-center">
                <Profile onClickPfp={onClickPfp} />
            </div>
        </div>
    );
}