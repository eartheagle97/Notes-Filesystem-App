import React from 'react'

interface DirectoryViewProps {
    title: string;
  }

const DirectoryView: React.FC<DirectoryViewProps> = ({ title }) => {
    return (
    <div>
        <table>
            <thead>
                <th>Select</th>
                <th>Name</th>
                <th>Type</th>
                <th>Date Modified</th>
            </thead>
            <tbody>
                <tr>
                    <td>CB</td>
                    <td>{title}</td>
                    <td>File Folder</td>
                    <td>Date Modifited</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default DirectoryView