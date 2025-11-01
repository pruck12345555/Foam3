import AddNewItemButton from "./AddNewItemButton";
import SearchBar from "./SearchBar";

export default function ItemManagementTopBar({ onSearch, onOpenNewItemPopup }: { onSearch: (query: string) => void; onOpenNewItemPopup: () => void }) {
    return (
        <div className="flex items-center h-14 bg-blue-400 px-4">
            <div className="flex-1"/>

            <div className="flex-2 flex justify-center items-center">
                <SearchBar onSearch={onSearch} />
            </div>
            <div className="flex-1 flex justify-end items-center">
            <AddNewItemButton onClickAddNewItem={onOpenNewItemPopup} />
            </div>
        </div>
    );
}