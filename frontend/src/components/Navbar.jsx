import { FiBookOpen } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-2">
                        <FiBookOpen className="text-2xl text-indigo-600" />
                        <span className="font-bold text-xl text-gray-900 tracking-tight">MiniNotes</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
