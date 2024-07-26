const Transactions = () => {
    return (
        <ul className="container mx-auto px-4">
            <li className="w-5/6 flex- mx-auto mb-12">
                <article className="bg-white p-6 border-purple-800 shadow-md w-98">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <div>
                            <h2 className="">Argent Bank Checking (x8349)</h2>
                            <p className="text-gray-700 text-3xl font-bold space-y-6">$2,082.79</p>
                            <p className="text-gray-500">Available Balance</p>
                        </div>
                        <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                            View transactions
                        </button>
                    </div>
                </article>
            </li>
            <li className="w-5/6 flex- mx-auto mb-12">
                <article className="border-purple-800 bg-white p-6 shadow-md w-98">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <div>
                            <h2 className="">Argent Bank Checking (x67124)</h2>
                            <p className="text-gray-700 text-3xl font-bold space-y-6">$10,928.42</p>
                            <p className="text-gray-500">Available Balance</p>
                        </div>
                        <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                            View transactions
                        </button>
                    </div>
                </article>
            </li>
            <li className="w-5/6 flex- mx-auto mb-12">
                <article className="border-purple-800 bg-white p-6 shadow-md w-98">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                        <div>
                            <h2 className="">Argent Bank Checking (x5201)</h2>
                            <p className="text-gray-700 text-3xl font-bold space-y-6">$184.30</p>
                            <p className="text-gray-500">Available Balance</p>
                        </div>
                        <button className="bg-[#00BC77] sm:w-auto w-full text-white sm:mt-0 mt-2 px-4 py-2 focus:outline-none focus:shadow-outline">
                            View transactions
                        </button>
                    </div>
                </article>
            </li>
        </ul>
    );
};

export default Transactions;
