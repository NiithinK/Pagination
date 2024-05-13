import React, { useState, useEffect } from 'react';
import'./Members.css'
const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        const data = await response.json();
        setMembers(data);
        setTotalPages(Math.ceil(data.length / 10));
      } catch (error) {
        alert('failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getVisibleMembers = () => {
    const startIndex = (currentPage - 1) * 10;
    const endIndex = Math.min(startIndex + 10, members.length);
    return members.slice(startIndex, endIndex);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {getVisibleMembers().map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={handlePrevious} style={{backgroundColor:'lightgreen'}}>
          Previous
        </button>
        <span style={{backgroundColor:'lightgreen',fontSize:'x-large',borderRadius:'3px'}}>  {currentPage}  </span>
        <button disabled={currentPage === totalPages} onClick={handleNext} style={{backgroundColor:'lightgreen'}}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MembersTable;
