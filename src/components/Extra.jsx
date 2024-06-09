import React, { useState } from 'react';

const TransactionTable = ({ transactions }) => {
    const [sortedField, setSortedField] = useState(null);
    const [isAscending, setIsAscending] = useState(true);

    const handleSort = (field) => {
        if (sortedField === field) {
            // If the same field is clicked again, toggle the sort direction
            setIsAscending(!isAscending);
        } else {
            // If a different field is clicked, set the new field and set the direction to ascending
            setSortedField(field);
            setIsAscending(true);
        }
    };

    // console.log(transactions)

    const sortedTransactions = [...transactions].sort((a, b) => {
        const aValue = a[sortedField];
        const bValue = b[sortedField];
        // console.log(aValue, bValue)

        if (aValue === undefined || bValue === undefined) {
            // Handle undefined values by placing them at the end (you can adjust this logic as needed)
            return aValue === undefined ? 1 : -1;
        }

        if (isAscending) {
            return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
            return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }
    });

    return (
        <div style={{ height: '90vmin', width: '100vmax', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <table style={{ backgroundColor: '#dadada' }}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('type')}>Type</th>
                        <th onClick={() => handleSort('amount')}>Amount</th>
                        <th onClick={() => handleSort('category')}>Category</th>
                        <th onClick={() => handleSort('date')}>Date</th>
                        {/* Add more columns as needed */}
                    </tr>
                </thead>
                <tbody>
                    {sortedTransactions.map((transaction, i) => (
                        <tr key={i}>
                            <td>{transaction.type}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.dateString.getDate()}</td>
                            {/* Render other transaction data */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
