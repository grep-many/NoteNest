import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Search, X } from 'lucide-react';
import { useTask } from '@/context/TaskProvider';
import { useNote } from '@/context/NoteProvider';
import { usePage } from '@/context/PageProvider';

const SearchBar = ({ setActiveTab, activeTab }) => {

    const {searchText,setSearchText} = usePage();
    const [prevTab, setPrevTab] = useState(activeTab);
    const { getNotes } = useNote();
    const { getTasks } = useTask();

    const handleKeyDown = (e) => {
        if (e.key === 'enter') {
            addTags();
        }
    }

    useEffect(() => {
        if (activeTab !== 'search') {
            setPrevTab(activeTab)
            setActiveTab('search');
        }
        if (searchText === '') {
            setActiveTab(prevTab)
        }
        const fetchResults = async () => {
            getNotes(searchText)
            getTasks(searchText)
        };

        // Debounce API call (500ms delay before making the API request)
        const timer = setTimeout(fetchResults, 500);

        // Cleanup the timer if the query changes
        return () => clearTimeout(timer);
    }, [searchText]);

    return (
        <div className='w-full flex px-4 items-center border rounded-md'>
            <Input
                type="text"
                placeholder="Search"
                value={searchText}
                className="px-1 shadow-none border-none outline-none focus:none focus-visible:ring-none focus-visible:ring-0"
                onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && <X size={20} className='cursor-pointer text-gray-400 mx-1 mr-2' onClick={() => setSearchText('')} />}
            <Search
                className='cursor-pointer'
                onClick={() => getNotes(searchText)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default SearchBar;
